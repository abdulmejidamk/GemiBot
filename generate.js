import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-pro",
});

export async function generateStuff(prompt) {
  const result = await model.generateContent(
    "response should be in html format with some good stylings,fonts and other appropriate coloring, " +
      prompt
  );

  const content = result.response.text();
  console.log(content);
  return content;
}
