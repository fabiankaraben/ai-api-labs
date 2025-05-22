import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

dotenv.config();

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

/**
 * Lists available Gemini models.
 */
export async function listGeminiModels(): Promise<void> {
  try {
    const modelsPager = await genAI.models.list();
    const models = [];
    for await (const model of modelsPager) {
      if (model.name) {
        models.push(model.name);
      }
    }
    console.log('Available Gemini Models:', models);
  } catch (error) {
    console.error('Error listing Gemini models:', error);
  }
}

// Function for basic chat with Gemini
export async function chatWithGemini(initialMessage: string, modelId: string = 'gemini-2.5-flash-preview-05-20'): Promise<void> {
  if (!process.env.GEMINI_API_KEY) {
    console.error('Error: GEMINI_API_KEY is not set in your .env file.');
    return;
  }
  // The global genAI instance is now initialized with (process.env.GEMINI_API_KEY || ''),
  // so we assume it's created. Actual API calls will fail if the key is invalid/missing.

  const rl = readline.createInterface({ input, output });

  try {
    // Create a chat session with the selected model
    const chat = genAI.chats.create({
      model: modelId,
      config: {
        temperature: 0.5,
        maxOutputTokens: 1024,
      },
    });

    let userInput = initialMessage;
    console.log(`\nChatting with Gemini (${modelId}). Type 'exit' to end.`);
    while (true) {
      if (userInput.toLowerCase() === 'exit') {
        break;
      }
      // Send user message to Gemini
      const response = await chat.sendMessage({ message: userInput });
      const assistantResponse = response.text;
      if (assistantResponse) {
        console.log(`Gemini: ${assistantResponse}`);
      } else {
        console.log('Gemini: (No response)');
      }
      userInput = await rl.question('You: ');
    }
  } catch (error) {
    console.error('Error during chat with Gemini:', (error as Error).message);
  } finally {
    rl.close();
    console.log('Exited Gemini chat.');
  }
}

