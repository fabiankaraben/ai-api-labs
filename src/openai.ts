import { OpenAI } from 'openai';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

// Function to list available models for OpenAI
export async function listOpenAIModels(): Promise<void> {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
    const models = await openai.models.list();
    console.log('Available OpenAI Models:');
    models.data.forEach((model: any) => {
      console.log(`- ${model.id}`);
    });
  } catch (error) {
    console.error('Error listing OpenAI models:', (error as Error).message);
  }
}

// Function for basic chat with OpenAI
export async function chatWithOpenAI(initialMessage: string, modelId: string = 'gpt-3.5-turbo'): Promise<void> {
  if (!process.env.OPENAI_API_KEY) {
    console.error('Error: OPENAI_API_KEY is not set in your environment.');
    return;
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const rl = readline.createInterface({ input, output });
  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: 'user', content: initialMessage }
  ];

  console.log(`\nChatting with OpenAI (${modelId}). Type 'exit' to end.`);
  console.log(`You: ${initialMessage}`);

  try {
    while (true) {
      const completion = await openai.chat.completions.create({
        model: modelId,
        messages: messages,
      });

      const assistantResponse = completion.choices[0]?.message?.content;
      if (assistantResponse) {
        console.log(`OpenAI: ${assistantResponse}`);
        messages.push({ role: 'assistant', content: assistantResponse });
      } else {
        console.log('OpenAI: (No response)');
      }

      const userInput = await rl.question('You: ');
      if (userInput.toLowerCase() === 'exit') {
        break;
      }
      messages.push({ role: 'user', content: userInput });
    }
  } catch (error) {
    console.error('Error during chat with OpenAI:', (error as Error).message);
  } finally {
    rl.close();
    console.log('Exited OpenAI chat.');
  }
}

