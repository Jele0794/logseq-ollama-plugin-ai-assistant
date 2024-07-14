# Logseq AI Assistant

A powerful tool that enhances your Logseq experience by allowing you to interact with local AI models like Meta's `llama3` thanks to [Ollama](https://ollama.com/).

With this plugin, you can effortlessly generate or transform text using custom prompts,
enabling you to achieve more efficient and creative workflows within Logseq.

![](https://user-images.githubusercontent.com/9718515/226260897-d5e39c09-4714-4d23-b004-28a2391512c4.gif)

> Inspired by [Notion AI](https://www.notion.so/product/ai) and [Raycast AI](https://www.raycast.com/ai)

## Features
- Seamless integration with Logseq
- Customizable prompt support
- Easy-to-use built-in prompts 
- Using a custom AI models running locally (and privately) with Ollama.

## Install

### Manually load

- [Download and Install Ollama from here](https://ollama.com/download).
- Turn on Logseq developer mode.
- [Download the prebuilt package here](https://github.com/ahonn/logseq-plugin-ai-assistant/releases).
- Unzip the zip file and load from Logseq plugins page

## Configuration
Before using the plugin, you need to configure it according to your preferences.

- **Model**: Choose the model you want to use, such as "llama3", "mistral", etc. Different models may offer varying levels of performance and text generation capabilities. You can see Ollama's library of available models [here](https://ollama.com/library).
- **Custom Prompts**: Enable this option if you want to use custom prompts for generating or transforming text. You can add, edit, or remove prompts in the prompts array.

## Built-in Prompts

The plugin comes with several built-in prompts to enhance your text editing experience

- **Ask AI**: Ask a question, and the AI will provide a helpful answer.
- **Summarize**: Provide a concise summary of the text.
- **Make Shorter**: Shorten the text while maintaining its key points.
- **Make Longer**: Expand the text, providing more details and depth.
- **Change Tone to Friendly**: Rewrite the text with a friendly tone.
- **Change Tone to Confident**: Rewrite the text with a confident tone.
- **Change Tone to Casual**: Rewrite the text with a casual tone.
- **Change Tone to Professional**: Rewrite the text with a more professional tone.
- **Explain This**: Provide a clear explanation for the text or code snippet.
- **Generate Ideas**: Generate creative ideas related to the selected topic.
- **eli5**: Explain me like I'm 5, will simplify and explain complex ideas or concepts.

See all built-in prompts [here](https://github.com/Jele0794/logseq-plugin-ai-assistant/tree/master/src/prompts)

## How to Use a Custom Prompt

- Open the plugin settings and locate "customPrompts" field.

- Add the following JSON object to the "prompts" array:

```json
{
  "model": "llama3",
  "customPrompts": {
    "enable": true, // <- Make sure to enable this.
    "prompts": [
      {
        "name": "Markdown Table",
        "prompt": "Please generate a {{text}} Markdown table",
        "output": "replace" // "property", "replace" or "insert"
      }
    ]
  },
  "disabled": false
}
```

- In the Logseq editor, focus the cursor on the place where you want to generate the table and do the following.
![](https://user-images.githubusercontent.com/9718515/226259576-a1193b51-8a57-4cad-9270-f5bc30a5ba29.gif)

## Contribution
Issues and PRs are welcome!

## Licence
MIT
