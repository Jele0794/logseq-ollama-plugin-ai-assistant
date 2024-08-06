import { IPrompt, PromptOutputType } from './type';

export const Summarize: IPrompt = {
  name: 'Summarize',
  prompt: `
    Please provide a concise summary of the following text:
    """
    {content}
    """
    Avoid giving any introduction sentence like: "Here is a concise summary of the text".
  `,
  output: PromptOutputType.property,
};
