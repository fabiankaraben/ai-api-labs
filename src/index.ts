import dotenv from 'dotenv';
import inquirer from 'inquirer';
import { handleOpenAIChoice } from './openai.js';
import { handleGeminiChoice } from './gemini.js';
import { handleGrokChoice } from './grok.js';

dotenv.config();

interface ApiProviderChoice {
  provider: 'OpenAI' | 'Gemini' | 'Grok' | 'Exit';
}

async function main() {
  console.clear();
  if (!process.env.OPENAI_API_KEY && !process.env.GEMINI_API_KEY && !process.env.GROK_API_KEY) {
    console.log('No API keys found in .env file. Please add at least one API key to proceed.');
    return;
  }

  console.log('Interactive AI API Tester');
  console.log('===========================');

  const openaiApiKey = process.env.OPENAI_API_KEY;
  const geminiApiKey = process.env.GEMINI_API_KEY;
  const grokApiKey = process.env.GROK_API_KEY;

  if (!openaiApiKey) {
    console.warn('OpenAI API Key not found in .env file. OpenAI functionality will be unavailable.');
  }
  if (!geminiApiKey) {
    console.warn('Gemini API Key not found in .env file. Gemini functionality will be unavailable.');
  }
  if (!grokApiKey) {
    console.warn('Grok API Key not found in .env file. Grok functionality will be unavailable.');
  }
  console.log('');

  const { provider } = await inquirer.prompt<ApiProviderChoice>([
    {
      type: 'list',
      name: 'provider',
      message: 'Which AI API provider would you like to test?',
      choices: [
        { name: 'OpenAI', value: 'OpenAI' },
        { name: 'Gemini (Google AI)', value: 'Gemini' },
        { name: 'Grok (xAI)', value: 'Grok' },
        new inquirer.Separator(),
        { name: 'Exit', value: 'Exit' },
      ],
    },
  ]);

  if (provider === 'Exit') {
    console.log('Exiting AI API Tester. Goodbye!');
    return;
  }

  console.log(`You selected: ${provider}`);

  switch (provider) {
    case 'OpenAI':
      if (!openaiApiKey) {
        console.error('OpenAI API Key is missing. Please add it to your .env file.');
        return main(); // Return to main menu if key is missing
      }
      await handleOpenAIChoice(openaiApiKey, main); // Pass main as callback
      break;
    case 'Gemini':
      if (!geminiApiKey) {
        console.error('Gemini API Key is missing. Please add it to your .env file.');
        return main(); // Return to main menu if key is missing
      }
      await handleGeminiChoice(geminiApiKey, main); // Pass main as callback
      break;
    case 'Grok':
      if (!grokApiKey) {
        console.error('Grok API Key is missing. Please add it to your .env file.');
        return main(); // Return to main menu if key is missing
      }
      await handleGrokChoice(grokApiKey, main); // Pass main as callback
      break;
  }
}

main().catch(error => {
  console.error('An error occurred:', error);
  process.exit(1);
});
