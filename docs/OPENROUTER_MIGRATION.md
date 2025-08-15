# OpenAI to OpenRouter Migration Guide

This project now supports both OpenAI and OpenRouter as AI providers for content moderation. OpenRouter often provides more cost-effective access to various LLMs, including free models.

## What Changed

### 1. Environment Variables
- `OPENAI_API_KEY` is now optional (previously required)
- `OPENROUTER_API_KEY` is a new optional environment variable
- **At least one of these must be provided**

### 2. Model Selection Priority
- If `OPENROUTER_API_KEY` is provided, the system will use OpenRouter models by default
- If only `OPENAI_API_KEY` is provided, the system will use OpenAI models
- Default OpenRouter model: `meta-llama/llama-3.1-8b-instruct:free` (free tier)
- Default OpenAI model: `gpt-4o-mini`

### 3. Configuration Changes
- The system now dynamically registers providers based on available API keys
- The model selection is automatic based on the provider priority

## Migration Steps

### Option 1: Keep Using OpenAI (No Changes Required)
If you're happy with OpenAI, no changes are needed. Your existing `OPENAI_API_KEY` will continue to work.

### Option 2: Switch to OpenRouter
1. Sign up at [openrouter.ai](https://openrouter.ai)
2. Create an API key in your [OpenRouter dashboard](https://openrouter.ai/keys)
3. Add `OPENROUTER_API_KEY=sk-or-your-key-here` to your `.env.local` file
4. Optionally remove `OPENAI_API_KEY` if you want to use only OpenRouter

### Option 3: Use Both (Recommended for Development)
1. Keep your existing `OPENAI_API_KEY`
2. Add `OPENROUTER_API_KEY` as described above
3. The system will prioritize OpenRouter but fall back to OpenAI if needed

## Cost Comparison

### OpenAI GPT-4o-mini
- Input: $0.15 per 1M tokens
- Output: $0.60 per 1M tokens

### OpenRouter Llama 3.1 8B (Free Tier)
- Input: $0.00 per 1M tokens
- Output: $0.00 per 1M tokens
- Rate limits apply on free tier

### Other OpenRouter Models
OpenRouter provides access to many models at competitive prices. See [their pricing page](https://openrouter.ai/models) for details.

## Model Customization

To use different models, update your `config.ts` file:

```typescript
export default defineConfig({
  strategies: {
    prompt: {
      // Use a specific OpenRouter model
      defaultModel: "openrouter:anthropic/claude-3-haiku:beta",
      judgeModel: "openrouter:anthropic/claude-3-haiku:beta",
      
      // Or use OpenAI models
      // defaultModel: "openai:gpt-4o",
      // judgeModel: "openai:gpt-4o-mini",
    },
  },
});
```

## Available Models

### OpenRouter Models (examples)
- `openrouter:meta-llama/llama-3.1-8b-instruct:free` (Free)
- `openrouter:anthropic/claude-3-haiku:beta`
- `openrouter:openai/gpt-4o`
- `openrouter:google/gemini-pro`

### OpenAI Models
- `openai:gpt-4o`
- `openai:gpt-4o-mini`
- `openai:gpt-3.5-turbo`

## Troubleshooting

### Error: "Either OPENAI_API_KEY or OPENROUTER_API_KEY must be provided"
This means you haven't set either API key. Add at least one to your `.env.local` file.

### Error: "Model not found"
Check that:
1. Your API key is valid
2. The model name is correct (including the provider prefix)
3. You have access to the model on your chosen platform

### Performance Considerations
- Free tier models may have rate limits
- OpenRouter free models may have higher latency
- Consider paid tiers for production workloads

## Support

If you encounter issues:
1. Check your API keys are valid
2. Verify the model names in your configuration
3. Check the provider's status page for outages
4. Review the console logs for detailed error messages
