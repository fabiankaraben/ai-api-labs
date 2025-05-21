import inquirer from 'inquirer';
import OpenAI from 'openai'; // Grok uses an OpenAI-compatible API

// Re-define or import main if it's needed for goBack
// For now, we'll expect goBack as a parameter

// Placeholder for Grok-specific model listing, adapt as needed

async function callGrokChat(apiKey: string) {
  try {
    const grok = new OpenAI({
      apiKey: apiKey,
      baseURL: 'https://api.x.ai/v1', // Grok API endpoint
    });

    const { modelName, systemMessage, userMessage } = await inquirer.prompt([
      {
        type: 'input',
        name: 'modelName',
        message: 'Enter the Grok model to use (e.g., grok-1, grok-3-latest):',
        default: 'grok-3-latest',
      },
      {
        type: 'input',
        name: 'systemMessage',
        message: 'Enter an optional system message (persona for the AI):',
        default: 'You are Grok, a chatbot inspired by the Hitchhiker\'s Guide to the Galaxy.',
      },
      {
        type: 'input',
        name: 'userMessage',
        message: 'Enter your message to Grok:',
        validate: (input) => input ? true : 'Message cannot be empty.',
      },
    ]);

    console.log(`\nSending chat completion request to Grok model: ${modelName}...`);

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [];
    if (systemMessage) {
      messages.push({ role: 'system', content: systemMessage });
    }
    messages.push({ role: 'user', content: userMessage });

    const completion = await grok.chat.completions.create({
      model: modelName,
      messages: messages,
    });

    if (completion.choices && completion.choices.length > 0) {
      const choice = completion.choices[0];
      if (choice.message) {
        if (choice.message.content) {
          console.log('\nGrok Response:');
          console.log(choice.message.content);
        } else if ((choice.message as any).refusal) {
          console.log('\nGrok Refused:');
          console.log((choice.message as any).refusal);
        }
         else {
          console.log('\nReceived an empty message from Grok.');
        }
      } else {
        console.log('\nNo message in Grok\'s response choice.');
      }
    } else {
      console.log('\nNo choices returned from Grok.');
    }

  } catch (error) {
    const err = error as Error;
    console.error('\nError calling Grok chat completions:', err.message || err);
  }
}

async function callGrokListModels(apiKey: string) {
  try {
    const grok = new OpenAI({
      apiKey: apiKey,
      baseURL: 'https://api.x.ai/v1', // Grok API endpoint
    });
    console.log('\nFetching available Grok models...');
    const response = await grok.models.list();
    console.log('Available Grok Models (via OpenAI SDK):');
    if (response.data && response.data.length > 0) {
      response.data.forEach(model => {
        console.log(`- ${model.id}`);
      });
    } else {
      console.log('No models found or an issue with the response.');
    }
  } catch (error) {
    const err = error as Error;
    console.error('Error fetching Grok models:', err.message || err);
  }
}

export async function handleGrokChoice(apiKey: string, goBack: () => Promise<void>) {
  let inGrokMenu = true;
  while (inGrokMenu) {
    console.clear();
    console.log('\nNote: The Grok API is designed for compatibility with the OpenAI API.');
    console.log('We will use the OpenAI SDK with a different base URL (https://api.x.ai/v1).\n');

    const { operation } = await inquirer.prompt([
      {
        type: 'list',
        name: 'operation',
        message: 'Which Grok operation would you like to perform (using OpenAI SDK structure)?',
        choices: [
          { name: 'Chat Completions (e.g., grok-1)', value: 'chatCompletions' },
          { name: 'List Models', value: 'listModels' },
          // Add other Grok-specific operations here if they differ or new ones emerge
          new inquirer.Separator(),
          { name: 'Back to provider selection', value: 'back' },
        ],
      },
    ]);

    if (operation === 'back') {
      inGrokMenu = false; // Signal to exit the Grok menu loop
    } else {
      // console.log(`Selected Grok operation: ${operation}`); // Logging handled by individual functions or less verbose here
      switch (operation) {
        case 'chatCompletions':
          await callGrokChat(apiKey);
          break;
        case 'listModels':
          await callGrokListModels(apiKey);
          break;
        default:
          console.log('This operation is not yet implemented for Grok.');
          // Even for unimplemented, pause so user sees the message.
          break;
      }
      // Pause to allow user to see the output from the operation
      await inquirer.prompt([
        {
          type: 'input',
          name: 'continue',
          message: '\nPress Enter to return to the Grok operations menu...',
        },
      ]);
    }
  }
  // After exiting the loop (because operation === 'back' was selected from Grok menu)
  return goBack(); // This calls the original goBack to return to the API provider selection menu
}
