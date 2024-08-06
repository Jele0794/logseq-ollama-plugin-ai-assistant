import '@logseq/libs';
import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { PromptTemplate } from '@langchain/core/prompts';
import {
  CustomListOutputParser,
  StructuredOutputParser,
} from 'langchain/output_parsers';
import * as presetPrompts from './prompts';
import { IPrompt, PromptOutputType } from './prompts/type';
import settings, { ISettings } from './settings';
import { getBlockContent, wrapInQuote } from './utils';

function getPrompts() {
  const { customPrompts } = logseq.settings as unknown as ISettings;
  const prompts = [...Object.values(presetPrompts)];
  if (customPrompts.enable) {
    prompts.push(...customPrompts.prompts);
  }
  return prompts;
}

function main() {
  const {
    basePath,
    model: modelName,
    tag: tagName,
  } = logseq.settings as unknown as ISettings;
  const tag = tagName ? ` #${tagName}` : '';

  const prompts = getPrompts();
  const model = new ChatOllama({
    baseUrl: basePath, // Default value
    model: modelName, // Default value
  });

  prompts.map(({ name, prompt: t, output, format }: IPrompt) => {
    logseq.Editor.registerSlashCommand(
      name,
      async ({ uuid }: { uuid: string }) => {
        const block = await logseq.Editor.getBlock(uuid, {
          includeChildren: true,
        });
        if (!block) {
          return;
        }

        const content = await getBlockContent(block);
        const listed = Array.isArray(format);
        const structured = typeof format === 'object' && !listed;

        let parser;
        if (structured) {
          parser = StructuredOutputParser.fromNamesAndDescriptions(
            format as { [key: string]: string },
          );
        } else if (listed) {
          parser = new CustomListOutputParser({ separator: '\n' });
        }

        const template = t.replace('{{text}}', '{content}');
        const prompt = parser
          ? new PromptTemplate({
            template: template + '\n{format_instructions}',
            inputVariables: ['content'],
            partialVariables: {
              format_instructions: parser.getFormatInstructions(),
            },
          })
          : new PromptTemplate({
            template,
            inputVariables: ['content'],
          });


        const newBlock = await logseq.Editor.insertBlock(uuid, '🤖 Generating...');
        if (newBlock == null) {
          return;
        }

        const input = await prompt.format({ content });

        let message;
        try {
          message = await model.invoke(input);
        }
        catch (e) {
          logseq.Editor.updateBlock(newBlock.uuid, `🤖 Error: \`${e}\``);
          return;
        }
        // only accept text response for now
        const response = message.content.toString()

        switch (output) {
          case PromptOutputType.property: {
            let content = `${tag} | ${block?.content}\n`;

            const propertyName = `ai-${name.toLowerCase().replace(/[\s\W]/g, '-')}`;
            if (!parser) {
              let cleanPropertyResponse = response.replaceAll('\n', ' ');
              cleanPropertyResponse = cleanPropertyResponse.replaceAll('**', '*');
              content += `${propertyName}:: ${cleanPropertyResponse}`;
            } else if (structured) {
              content += `${propertyName}:: `;
              const record = await parser.parse(response);
              content += Object.entries(record)
                .map(([key, value]) => `${key}: ${value}`)
                .join(' ');
            } else if (listed) {
              content += `${propertyName}:: `;
              const list = (await parser.parse(response)) as string[];
              content += list.join(', ');
            }

            await logseq.Editor.updateBlock(uuid, content);
            await logseq.Editor.removeBlock(newBlock.uuid)
            break;
          }
          case PromptOutputType.insert: {
            if (!parser) {
              await logseq.Editor.updateBlock(newBlock.uuid, `${tag}\n${wrapInQuote(response)}`);
            } else if (structured) {
              const record = await parser.parse(response);
              await logseq.Editor.updateBlock(
                newBlock.uuid,
                `${tag} | ${block?.content}\n`,
              );
              for await (const [key, value] of Object.entries(record)) {
                await logseq.Editor.insertBlock(newBlock.uuid, `${key}: ${value}`);
              }
            } else if (listed) {
              await logseq.Editor.updateBlock(
                newBlock.uuid,
                `${tag} | ${block?.content}\n`,
              );
              const record = (await parser.parse(response)) as string[];
              for await (const item of record) {
                await logseq.Editor.insertBlock(newBlock.uuid, item);
              }
            }
            break;
          }
          case PromptOutputType.replace:
            await logseq.Editor.updateBlock(uuid, `${tag}\n${response}`);
            await logseq.Editor.removeBlock(newBlock.uuid)
            break;
        }
      },
    );
    logseq.onSettingsChanged(() => main());
  });
}

logseq.useSettingsSchema(settings).ready(main).catch(console.error);
