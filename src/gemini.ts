import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

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
