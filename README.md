# ai-api-labs

Testing the use of APIs for some AI models

## Basic help

```
Usage: node dist/index.js [options]

Options:
  -h, --help          Show this help message
  -p, --provider      API provider (openai, gemini, grok)
  -o, --operation     Operation (chat, image-gen)
  -m, --model         Model name (if applicable)
  -i, --input         Input text or image description
  -f, --file          Path to image file (for image input with chat)
```

## Grok examples in dev

```bash
# List available models
npm run dev -- -p grok -o list-models

# Chat with a model (using default model: grok-3-mini)
npm run dev -- -p grok -o chat -i "Tell me a joke about AI."
```

## OpenAI examples in dev

```bash
# List available models
npm run dev -- -p openai -o list-models

# Chat with a model
npm run dev -- -p openai -o chat -m gpt-4o -i "Hello, how are you?"
```

## Gemini examples in dev

```bash
# List available models
npm run dev -- -p gemini -o list-models

# Chat with a model
npm run dev -- -p gemini -o chat -m text-embedding-004 -i "Hello, how are you?"
```

## Available models at 21/05/2025

### Grok

```
Available Grok Models:
- grok-2-1212
- grok-2-vision-1212
- grok-3
- grok-3-fast
- grok-3-mini
- grok-3-mini-fast
- grok-2-image-1212
```

### OpenAI

```
Available OpenAI Models:
- gpt-4o-realtime-preview-2024-12-17
- gpt-4o-audio-preview-2024-12-17
- gpt-4-1106-preview
- dall-e-3
- dall-e-2
- gpt-4o-audio-preview-2024-10-01
- gpt-4-turbo-preview
- text-embedding-3-small
- babbage-002
- gpt-4
- text-embedding-ada-002
- chatgpt-4o-latest
- gpt-4o-mini-audio-preview
- gpt-4o-audio-preview
- o1-preview-2024-09-12
- gpt-4o-mini-realtime-preview
- gpt-4o-mini-realtime-preview-2024-12-17
- gpt-4.1-nano
- gpt-3.5-turbo-instruct-0914
- gpt-4o-mini-search-preview
- gpt-4.1-nano-2025-04-14
- gpt-3.5-turbo-16k
- gpt-4o-realtime-preview
- davinci-002
- gpt-3.5-turbo-1106
- gpt-4o-search-preview
- gpt-3.5-turbo-instruct
- gpt-3.5-turbo
- o3-mini-2025-01-31
- gpt-4o-mini-search-preview-2025-03-11
- gpt-4-0125-preview
- gpt-4o-2024-11-20
- gpt-4o-2024-05-13
- text-embedding-3-large
- o1-2024-12-17
- o1
- o1-preview
- gpt-4-0613
- o1-mini
- gpt-4o-mini-tts
- o1-pro
- gpt-4o-transcribe
- gpt-4.5-preview
- o1-pro-2025-03-19
- gpt-4.5-preview-2025-02-27
- gpt-4o-search-preview-2025-03-11
- omni-moderation-2024-09-26
- gpt-image-1
- o1-mini-2024-09-12
- tts-1-hd
- gpt-4o
- tts-1-hd-1106
- gpt-4o-2024-08-06
- gpt-4o-mini-2024-07-18
- gpt-4.1-mini
- gpt-4o-mini
- gpt-4o-mini-audio-preview-2024-12-17
- gpt-3.5-turbo-0125
- gpt-4-turbo
- tts-1
- gpt-4-turbo-2024-04-09
- tts-1-1106
- gpt-4o-realtime-preview-2024-10-01
- gpt-4o-mini-transcribe
- gpt-4.1-mini-2025-04-14
- o3-mini
- gpt-4.1
- whisper-1
- gpt-4.1-2025-04-14
- omni-moderation-latest
```

### Gemini

```
Available Gemini Models:
- embedding-gecko-001
- gemini-1.0-pro-vision-latest
- gemini-pro-vision
- gemini-1.5-pro-latest
- gemini-1.5-pro-001
- gemini-1.5-pro-002
- gemini-1.5-pro
- gemini-1.5-flash-latest
- gemini-1.5-flash-001
- gemini-1.5-flash-001-tuning
- gemini-1.5-flash
- gemini-1.5-flash-8b
- gemini-1.5-flash-8b-001
- gemini-1.5-flash-8b-latest
- gemini-1.5-flash-8b-exp-0827
- gemini-1.5-flash-8b-exp-0924
- gemini-2.5-pro-exp-03-25
- gemini-2.5-pro-preview-03-25
- gemini-2.5-flash-preview-04-17
- gemini-2.5-flash-preview-05-20
- gemini-2.5-flash-preview-04-17-thinking
- gemini-2.5-pro-preview-05-06
- gemini-2.0-flash-exp
- gemini-2.0-flash
- gemini-2.0-flash-001
- gemini-2.0-flash-exp-image-generation
- gemini-2.0-flash-lite-001
- gemini-2.0-flash-preview-image-generation
- gemini-2.0-flash-lite-preview-02-05
- gemini-2.0-flash-lite-preview
- gemini-2.0-pro-exp
- gemini-2.0-pro-exp-02-05
- gemini-exp-1206
- gemini-2.0-flash-thinking-exp-01-21
- gemini-2.0-flash-thinking-exp
- gemini-2.0-flash-thinking-exp-1219
- gemini-2.5-flash-preview-tts
- gemini-2.5-pro-preview-tts
- learnlm-2.0-flash-experimental
- gemma-3-1b-it
- gemma-3-4b-it
- gemma-3-12b-it
- gemma-3-27b-it
- gemma-3n-e4b-it
- embedding-001
- text-embedding-004
- gemini-embedding-exp-03-07
- gemini-embedding-exp
- aqa
- imagen-3.0-generate-002
- gemini-2.5-flash-preview-native-audio-dialog
- gemini-2.5-flash-exp-native-audio-thinking-dialog
- gemini-2.0-flash-live-001
```
