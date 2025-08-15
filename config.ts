import { createOpenAI } from "@ai-sdk/openai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { defineConfig } from "@/services/config";
import { env } from "@/lib/env";

const registry: Record<string, any> = {};

// Add OpenAI provider if API key is available
if (env.OPENAI_API_KEY) {
  registry.openai = createOpenAI({
    apiKey: env.OPENAI_API_KEY,
  });
}

// Add OpenRouter models directly if API key is available
if (env.OPENROUTER_API_KEY) {
  const openrouter = createOpenRouter({
    apiKey: env.OPENROUTER_API_KEY,
  });
  
  // Register OpenRouter as a custom provider for language models only
  registry.openrouter = {
    languageModel: (modelId: string) => openrouter.languageModel(modelId),
  };
}

export default defineConfig({
  registry,
  strategies: {
    // LLM-based moderation
    prompt: {
      defaultModel: env.OPENROUTER_API_KEY 
        ? "openrouter:meta-llama/llama-3.1-8b-instruct:free" 
        : "openai:gpt-4o-mini",
      judgeModel: env.OPENROUTER_API_KEY 
        ? "openrouter:meta-llama/llama-3.1-8b-instruct:free" 
        : "openai:gpt-4o-mini",
    },
    // regex filtering
    blocklist: {},
  },
});
