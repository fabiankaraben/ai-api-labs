import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

/**
 * Lists available Gemini models.
 */
export async function listGeminiModels(): Promise<string[]> {
  try {
    const modelsPager = await genAI.models.list();
    const models = [];
    for await (const model of modelsPager) {
      if (model.name) {
        models.push(model.name);
      }
    }
    return models;
  } catch (error) {
    console.error('Error listing Gemini models:', error);
    return [];
  }
}

/**
 * Initiates a chat with a specified Gemini model.
 * @param modelName - The name of the Gemini model to use for chat.
 * @param callback - Callback function to return to the main menu.
 */
export async function chatWithGemini(modelName: string, callback: () => Promise<void>): Promise<void> {
  try {
    console.log(`Started chat with ${modelName}`);
    const chatSession = await genAI.chats.create({ model: modelName });

    while (true) {
      const userInput = await new Promise<string>((resolve) => {
        const readline = require('readline').createInterface({
          input: process.stdin,
          output: process.stdout
        });
        readline.question('You: ', (input: string) => {
          readline.close();
          resolve(input);
        });
      });

      if (userInput.toLowerCase() === 'exit') {
        console.log('Exiting chat...');
        await callback();
        break;
      }

      const response = await chatSession.sendMessage(userInput as any);
      if (response.candidates && response.candidates.length > 0 && response.candidates[0].content && response.candidates[0].content.parts && response.candidates[0].content.parts.length > 0) {
        console.log(`Gemini (${modelName}):`, response.candidates[0].content.parts[0].text);
      } else {
        console.log(`Gemini (${modelName}): No response content available.`);
      }
    }
  } catch (error) {
    console.error(`Error chatting with ${modelName}:`, error);
    await callback();
  }
}
