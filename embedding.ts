import OpenAI from "openai";
import { answer, authorize, task } from "./utils";

const { token } = await authorize("embedding");
await task(token);

const openai = new OpenAI({ apiKey: process.env.OPENAI_APIKEY });
const data = await openai.embeddings.create({
  model: "text-embedding-ada-002",
  input: "Hawaiian pizza",
});

answer(token, data.data[0].embedding);
