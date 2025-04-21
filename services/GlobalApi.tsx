import OpenAI from "openai";

console.log("API KEY:", process.env.EXPO_PUBLIC_OPENROUTER_API_KEY); // Add this line

const openai = new OpenAI({
  baseURL:"https://openrouter.ai/api/v1",
  apiKey: process.env.EXPO_PUBLIC_OPENROUTER_API_KEY,
});

export const AiModel = async (prompt: string) =>
  await openai.chat.completions.create({
    model:"deepseek/deepseek-chat-v3-0324:free" ,  // or a different one if needed
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

export default {
  AiModel 
};