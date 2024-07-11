import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user';
import { IPrompt } from './prompts/type';

export interface ISettings {
  apiKey: string;
  basePath: string;
  model: string;
  tag: string;
  customPrompts: {
    enable: boolean;
    prompts: IPrompt[];
  };
}

const settings: SettingSchemaDesc[] = [
  {
    key: 'basePath',
    type: 'string',
    title: 'openApi basePath',
    description: 'Enter your openApi proxy basePath',
    default: 'http://localhost:11434',
  },
  {
    key: 'model',
    type: 'string',
    title: 'Model',
    description: 'Choose the model (e.g., "llama3").',
    default: 'llama3',
  },
  {
    key: 'tag',
    type: 'string',
    title: 'Tag',
    description: 'Add specific tags to AI-generated content',
    default: '[[🤖]]'
  },
  {
    key: 'customPrompts',
    type: 'object',
    title: 'Custom Prompts',
    description: 'Enable and manage custom prompts.',
    default: {
      enable: false,
      prompts: [],
    },
  },
];

export default settings;
