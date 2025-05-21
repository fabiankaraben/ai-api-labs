import { OpenAI } from 'openai'; // Grok uses an OpenAI-compatible API

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
