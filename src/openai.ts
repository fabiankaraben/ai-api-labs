import { OpenAI } from 'openai';

// Re-define or import main if it's needed for goBack
// For now, we'll expect goBack as a parameter

async function callOpenAIChatCompletions(apiKey: string, userMessage: string) {
  try {
    const openai = new OpenAI({ apiKey });
    console.log('\nSending message to OpenAI Chat API...');
    
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: userMessage }
      ],
      model: 'gpt-3.5-turbo',
    });

    if (completion.choices && completion.choices.length > 0 && completion.choices[0].message) {
      console.log('OpenAI Response:');
      console.log(completion.choices[0].message.content);
    } else {
      console.log('No response or an issue with the completion data.');
    }
  } catch (error) {
    const err = error as Error;
    console.error('Error calling OpenAI Chat API:', err.message || err);
  }
}

async function callOpenAIListModels(apiKey: string) {
  try {
    const openai = new OpenAI({ apiKey });
    console.log('\nFetching available OpenAI models...');
    const response = await openai.models.list();
    console.log('Available OpenAI Models:');
    if (response.data && response.data.length > 0) {
      response.data.forEach(model => {
        console.log(`- ${model.id}`);
      });
    } else {
      console.log('No models found or an issue with the response.');
    }
  } catch (error) {
    const err = error as Error;
    console.error('Error fetching OpenAI models:', err.message || err);
  }
}

/**
 * Handles OpenAI choice based on the provided operation and options.
 * 
 * @param operation The operation to perform (e.g., generateText, generateImage, chat).
 * @param options Additional options for the operation (e.g., model, inputText, imageFile).
 */
export async function handleOpenAIChoice(operation: string, options: { model?: string, inputText?: string, imageFile?: string }) {
  console.log('Testing OpenAI API...');
  // Implementation for OpenAI API testing
  console.log(`Operation: ${operation}`);
  console.log(`Model: ${options.model || 'default'}`);
  console.log(`Input: ${options.inputText || 'none'}`);
  if (options.imageFile) console.log(`Image File: ${options.imageFile}`);
  console.log('\nReturning to main menu...\n');
}
