import inquirer from 'inquirer';
import OpenAI from 'openai';

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

export async function handleOpenAIChoice(apiKey: string, goBack: () => Promise<void>) {
  console.clear();
  const { operation } = await inquirer.prompt([
    {
      type: 'list',
      name: 'operation',
      message: 'Which OpenAI operation would you like to perform?',
      choices: [
        { name: 'Chat Completions (e.g., GPT-4, GPT-3.5-turbo)', value: 'chatCompletions' },
        { name: 'Image Generation (DALL·E)', value: 'imageGeneration' },
        { name: 'Embeddings', value: 'embeddings' },
        { name: 'Speech to Text (Whisper)', value: 'speechToText' },
        { name: 'Text to Speech (TTS)', value: 'textToSpeech' },
        { name: 'List Models', value: 'listModels' },
        new inquirer.Separator(),
        { name: 'Back to provider selection', value: 'back' },
      ],
    },
  ]);

  if (operation === 'back') {
    return goBack(); // Go back using the callback
  }

  console.log(`Selected OpenAI operation: ${operation}`);
  // TODO: Implement actual API calls for each OpenAI operation
  switch (operation) {
    case 'chatCompletions':
      const { userMessage } = await inquirer.prompt([
        {
          type: 'input',
          name: 'userMessage',
          message: 'Enter your message for the chat:',
        },
      ]);
      if (userMessage) {
        await callOpenAIChatCompletions(apiKey, userMessage);
      } else {
        console.log('No message provided.');
      }
      break;
    case 'imageGeneration':
      console.log('Image Generation logic coming soon...');
      break;
    case 'listModels':
      await callOpenAIListModels(apiKey);
      break;
    // Add other cases here
    default:
      console.log('This operation is not yet implemented.');
  }
  // Pause here to allow the user to see the output of the operation
  // before returning to the main menu.
  await inquirer.prompt([
    {
      type: 'input',
      name: 'acknowledgeOperationOutput',
      message: 'Press Enter to continue...',
    }
  ]);
  // After operation, maybe go back to main or exit
  console.log('\nReturning to main menu...\n');
  return goBack(); 
}
