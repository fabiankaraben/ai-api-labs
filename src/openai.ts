import { OpenAI } from 'openai';

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
