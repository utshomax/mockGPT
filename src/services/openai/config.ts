import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization:'org-tJCxClCz4f7o1w83sWHs7fvb',
    apiKey: process.env.OPENAI_API_KEY,
});
export const openai = new OpenAIApi(configuration);  
