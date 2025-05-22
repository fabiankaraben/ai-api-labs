import dotenv from 'dotenv';
import { listOpenAIModels, chatWithOpenAI } from './openai.js';
import { listGeminiModels, chatWithGemini } from './gemini.js';
import { listGrokModels, chatWithGrok } from './grok.js';

dotenv.config();

// Parse command-line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options: { [key: string]: string | boolean } = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('-')) {
      const key = arg.replace(/^-+/, '');
      const nextArg = i + 1 < args.length ? args[i + 1] : '';
      options[key] = nextArg && !nextArg.startsWith('-') ? nextArg : true;
    }
  }

  return options;
}

// Display help information
function showHelp() {
  console.log(`
Usage: npm start -- [options]  OR  node dist/index.js [options]

Options:
  -h, --help          Show this help message
  -p, --provider      API provider (openai, gemini, grok)
  -o, --operation     Operation (list-models, chat, image-gen)
                      For OpenAI: list-models, chat
                      For Gemini: list-models, chat
                      For Grok: list-models, chat
  -m, --model         Model name (if applicable)
  -i, --input         Input text or image description
  -f, --file          Path to image file (for image input with chat)

Examples:
  node dist/index.js -p openai -o chat -m gpt-4o -i "Hello, how are you?"
  node dist/index.js -p gemini -o image-gen -i "A futuristic cityscape"
  npm start -- -p grok -o chat -i "Tell me a joke about AI."
  npm start -- -p grok -o chat -m Llama-2-70b-chat-hf -i "What is the capital of France?"
  npm start -- -p openai -o chat -i "What is the weather like in SF?"
  npm start -- -p openai -o chat -m gpt-4o -i "Write a poem about coding."
  npm start -- -p gemini -o chat -i "What are some fun facts about the ocean?"
  npm start -- -p gemini -o chat -m gemini-1.5-pro-latest -i "Plan a 3-day trip to Tokyo."
  `);
  process.exit(0);
}

async function main() {
  if (process.argv.length === 2) {
    showHelp();
    return;
  }

  const options = parseArgs();
  if (options['h'] || options['help']) {
    showHelp();
  }

  const provider = typeof options['p'] === 'string' ? options['p'] : (typeof options['provider'] === 'string' ? options['provider'] : '');
  const operation = typeof options['o'] === 'string' ? options['o'] : (typeof options['operation'] === 'string' ? options['operation'] : '');
  const model = typeof options['m'] === 'string' ? options['m'] : (typeof options['model'] === 'string' ? options['model'] : '');
  const inputText = typeof options['i'] === 'string' ? options['i'] : (typeof options['input'] === 'string' ? options['input'] : '');
  const imageFile = typeof options['f'] === 'string' ? options['f'] : (typeof options['file'] === 'string' ? options['file'] : '');

  if (!provider) {
    console.error('Error: API provider not specified. Use -p or --provider option.');
    showHelp();
    return;
  }

  if (!operation) {
    console.error(`Error: Operation not specified for ${provider}. Use -o or --operation option.`);
    showHelp();
    return;
  }

  switch (provider.toLowerCase()) {
    case 'openai':
      if (operation.toLowerCase() === 'list-models') {
        await listOpenAIModels();
      } else if (operation.toLowerCase() === 'chat') {
        if (!inputText) {
          console.error('Error: Input text not provided for OpenAI chat. Use -i or --input option.');
          showHelp();
          return;
        }
        await chatWithOpenAI(inputText, model || undefined);
      } else {
        console.error(`Unsupported OpenAI operation: ${operation}`);
      }
      break;
    case 'gemini':
      if (operation.toLowerCase() === 'list-models') {
        await listGeminiModels();
      } else if (operation.toLowerCase() === 'chat') {
        if (!inputText) {
          console.error('Error: Input text not provided for Gemini chat. Use -i or --input option.');
          showHelp();
          return;
        }
        await chatWithGemini(inputText, model || undefined);
      } else {
        console.error(`Unsupported Gemini operation: ${operation}`);
      }
      break;
    case 'grok':
      if (operation.toLowerCase() === 'list-models') {
        await listGrokModels();
      } else if (operation.toLowerCase() === 'chat') {
        if (!inputText) {
          console.error('Error: Input text not provided for Grok chat. Use -i or --input option.');
          showHelp();
          return;
        }
        await chatWithGrok(inputText, model || undefined);
      } else {
        console.error(`Unsupported Grok operation: ${operation}`);
      }
      break;
    default:
      console.error(`Unknown API provider: ${provider}`);
      console.error('Supported providers: openai, gemini, grok');
  }
}

main().catch(err => console.error('Fatal error:', err));
