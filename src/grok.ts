import { OpenAI } from 'openai'; // Grok uses an OpenAI-compatible API
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

// Function to list available models for Grok
export async function listGrokModels(): Promise<void> {
  try {
    const grok = new OpenAI({
      apiKey: process.env.GROK_API_KEY,
      baseURL: 'https://api.x.ai/v1'
    });
    const models = await grok.models.list();
    console.log('Available Grok Models:');
    models.data.forEach((model: any) => {
      console.log(`- ${model.id}`);
    });
  } catch (error) {
    console.error('Error listing Grok models:', (error as Error).message);
  }
}

// Function for basic chat with Grok
export async function chatWithGrok(initialMessage: string, modelId: string = 'grok-3-mini'): Promise<void> {
  if (!process.env.GROK_API_KEY) {
    console.error('Error: GROK_API_KEY is not set in your environment.');
    return;
  }

  const grok = new OpenAI({
    apiKey: process.env.GROK_API_KEY,
    baseURL: 'https://api.x.ai/v1'
  });

  const rl = readline.createInterface({ input, output });
  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: 'user', content: initialMessage }
  ];

  console.log(`\nChatting with Grok (${modelId}). Type 'exit' to end.`);
  console.log(`You: ${initialMessage}`);

  try {
    while (true) {
      const completion = await grok.chat.completions.create({
        model: modelId,
        messages: messages,
      });

      const assistantResponse = completion.choices[0]?.message?.content;
      if (assistantResponse) {
        console.log(`Grok: ${assistantResponse}`);
        messages.push({ role: 'assistant', content: assistantResponse });
      } else {
        console.log('Grok: (No response)');
      }

      const userInput = await rl.question('You: ');
      if (userInput.toLowerCase() === 'exit') {
        break;
      }
      messages.push({ role: 'user', content: userInput });
    }
  } catch (error) {
    console.error('Error during chat with Grok:', (error as Error).message);
  } finally {
    rl.close();
    console.log('Exited Grok chat.');
  }
}

