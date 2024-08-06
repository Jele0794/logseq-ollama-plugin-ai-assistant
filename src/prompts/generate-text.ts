import { IPrompt, PromptOutputType } from "./type";

export const GenerateText: IPrompt = {
  name: 'Generate Text',
  prompt: `
    Please generate a response based on the inputs below:
    """
    {content}
    """
  `,
  output: PromptOutputType.insert,
};
