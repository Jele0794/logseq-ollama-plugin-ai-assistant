import { IPrompt, PromptOutputType } from './type';

export const ELI5: IPrompt = {
  name: 'ELI5',
  prompt: `
    Please explain me the following text as if I was a 5 year old kid:
    """
    {content}
    """
  `,
  output: PromptOutputType.insert,
};
