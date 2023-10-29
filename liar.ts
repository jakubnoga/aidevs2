import { OpenAI } from "langchain/llms/openai";
import { answer, authorize, task } from "./utils";
import { ChatPromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { HumanMessage, SystemMessage } from "langchain/schema";

type LiarTask = {
  answer: string;
};

const question = "Who is David Beckham?";
const { token } = await authorize("liar");

const form = new FormData();
form.append("question", question);
const { answer: liarAnswer } = await task<LiarTask>(token, form);
console.log(liarAnswer);
const llm = new OpenAI({
  openAIApiKey: process.env.OPENAI_APIKEY,
  modelName: "gpt-4",
});

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `Return only one single word "YES" if user is correct or "NO" otherwise.
{question}
Answer: `,
  ],
  ["human", `{answer}`],
]);

const chain = new LLMChain({
  llm,
  prompt,
});

const detection = await chain.call({
  question,
  answer: liarAnswer,
});

console.log(detection.text);

const result = await answer(token, detection.text);

console.log(result);
