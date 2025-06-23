import { Agent } from '@mastra/core/agent';
import { weatherTool } from '../tools/weather-tool.js';
import { weatherWorkflow } from '../workflows/weather-workflow.js';
import { google } from '@ai-sdk/google';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';

export const weatherAgent = new Agent({
  name: 'Weather Agent',
  instructions: `You are a helpful weather assistant that provides accurate weather information.

Your primary function is to help users get weather details for specific locations. When responding:
- Always ask for a location if none is provided
- If the location name isn’t in English, please translate it
- If giving a location with multiple parts (e.g. "New York, NY"), use the most relevant part (e.g. "New York")
- Include relevant details like humidity, wind conditions, and precipitation

Use the weatherTool to fetch current weather data.`,
  model: google('gemini-2.0-flash'),
  tools: { weatherTool },
  workflows: { weatherWorkflow },
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../mastra.db',
    })
  }),
});
