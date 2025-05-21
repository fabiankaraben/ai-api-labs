import dotenv from 'dotenv';
import { listOpenAIModels } from './openai.js';
import { listGeminiModels } from './gemini.js';
import { listGrokModels } from './grok.js';

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
Usage: node dist/index.js [options]

Options:
  -h, --help          Show this help message
  -p, --provider      API provider (openai, gemini, grok)
  -o, --operation     Operation (chat, image-gen)
  -m, --model         Model name (if applicable)
  -i, --input         Input text or image description
  -f, --file          Path to image file (for image input with chat)

Examples:
  node dist/index.js -p openai -o chat -m gpt-4o -i "Hello, how are you?"
  node dist/index.js -p gemini -o image-gen -i "A futuristic cityscape"
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
      } else {
        console.error(`Unsupported OpenAI operation: ${operation}`);
      }
      break;
    case 'gemini':
      if (operation.toLowerCase() === 'list-models') {
        await listGeminiModels();       
      } else {
        console.error(`Unsupported Gemini operation: ${operation}`);
      }
      break;
    case 'grok':
      if (operation.toLowerCase() === 'list-models') {
        await listGrokModels();
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
