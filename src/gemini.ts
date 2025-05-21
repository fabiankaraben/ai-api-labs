import inquirer from 'inquirer';
import { GoogleGenAI } from '@google/genai'; // Assuming Model is the correct type from Pager

// Re-define or import main if it's needed for goBack
// For now, we'll expect goBack as a parameter

async function listGeminiModels(apiKey: string): Promise<void> {
  try {
    const genAI = new GoogleGenAI({ apiKey });
    const modelPager = await genAI.models.list(); // Returns a Pager<Model>
    let modelsListed = false;

    console.log('\nAvailable Gemini Models:');
    console.log('--------------------------');

    for await (const model of modelPager) {
      modelsListed = true;
      // Now 'model' should be an individual Model object
      console.log(`Model Name: ${model.name}`);
      if (model.displayName) {
        console.log(`Display Name: ${model.displayName}`);
      }
      // console.log(`Version: ${model.version}`); // Version might also not be on the base Model object from list
      console.log('--------------------------');
    } // End for await...of loop

    if (!modelsListed) {
      console.log('No models found.');
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error listing Gemini models:', error.message);
    } else {
      console.error('Error listing Gemini models:', error);
    }
  }
}


export async function handleGeminiChoice(apiKey: string, goBack: () => Promise<void>) {
  console.clear();
  const { operation } = await inquirer.prompt([
    {
      type: 'list',
      name: 'operation',
      message: 'Which Gemini operation would you like to perform?',
      choices: [
        { name: 'Generate Content (Text-only, single turn)', value: 'generateText' },
        { name: 'Generate Content (Multimodal, single turn)', value: 'generateMultimodal' },
        { name: 'Chat (Multi-turn conversation)', value: 'chat' },
        { name: 'List Models', value: 'listModels' },
        new inquirer.Separator(),
        { name: 'Back to provider selection', value: 'back' },
      ],
    },
  ]);

  if (operation === 'back') {
    return goBack(); // Go back using the callback
  }

  console.log(`Selected Gemini operation: ${operation}`);
  // TODO: Implement actual API calls for each Gemini operation
  switch (operation) {
    case 'generateText':
      console.log('Gemini Text Generation logic coming soon...');
      // Example: await callGeminiText(apiKey);
      break;
    case 'generateMultimodal':
      console.log('Gemini Multimodal Generation logic coming soon...');
      break;
    case 'chat':
      console.log('Gemini Chat logic coming soon...');
      break;
    case 'listModels':
      await listGeminiModels(apiKey);
      break;
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
  console.log('\nReturning to main menu...\n');
  return goBack();
}
