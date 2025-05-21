import { OpenAI } from 'openai'; // Grok uses an OpenAI-compatible API
// Re-define or import main if it's needed for goBack
// For now, we'll expect goBack as a parameter
// Placeholder for Grok-specific model listing, adapt as needed
async function callGrokChat(apiKey, modelName, systemMessage, userMessage) {
    try {
        const grok = new OpenAI({
            apiKey: apiKey,
            baseURL: 'https://api.x.ai/v1', // Grok API endpoint
        });
        console.log(`\nSending chat completion request to Grok model: ${modelName}...`);
        const messages = [];
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
                }
                else if (choice.message.refusal) {
                    console.log('\nGrok Refused:');
                    console.log(choice.message.refusal);
                }
                else {
                    console.log('\nReceived an empty message from Grok.');
                }
            }
            else {
                console.log('\nNo message in Grok\'s response choice.');
            }
        }
        else {
            console.log('\nNo choices returned from Grok.');
        }
    }
    catch (error) {
        const err = error;
        console.error('\nError calling Grok chat completions:', err.message || err);
    }
}
async function callGrokListModels(apiKey) {
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
        }
        else {
            console.log('No models found or an issue with the response.');
        }
    }
    catch (error) {
        const err = error;
        console.error('Error fetching Grok models:', err.message || err);
    }
}
/**
 * Handles Grok choice based on the provided operation and options.
 *
 * @param operation The operation to perform (e.g., generateText, chat).
 * @param options Additional options for the operation (e.g., model, inputText).
 */
export async function handleGrokChoice(operation, options) {
    console.log('Testing Grok API...');
    // Implementation for Grok API testing
    console.log(`Operation: ${operation}`);
    console.log(`Model: ${options.model || 'default'}`);
    console.log(`Input: ${options.inputText || 'none'}`);
    console.log('\nReturning to main menu...\n');
}
