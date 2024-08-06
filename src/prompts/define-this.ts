import { IPrompt, PromptOutputType } from './type';

export const Define: IPrompt = {
  name: 'Define This',
  prompt: `
    Please, provide a concise definition of the following text. You should return three attributes: definition, meaning, examples.
    """
    {content}
    """
    Do not include any opinion, or comment (i.e. What an interesting word). Just provide what was asked.
    Avoid giving any introduction sentence like: "Here are the requested attributes:".
  `,
  output: PromptOutputType.property
};
