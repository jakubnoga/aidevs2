import OpenAI from "openai";
import { answer, authorize, task } from "./utils";

type BloggerTask = {
  blog: string[];
};

const openai = new OpenAI({ apiKey: process.env.OPENAI_APIKEY });

const { token } = await authorize("blogger");
const { blog, msg } = await task<BloggerTask>(token);

const completions = await Promise.all(
  blog.map((outline) =>
    openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "Jesteś polskim bloggerem specjalizującym się w pizzy. Piszesz po polsku na zadany temat",
        },
        { role: "user", content: outline },
      ],
    })
  )
);

const a = completions.map(({ choices: [message] }) => message.message.content);

console.log(a);

const result = await answer(token, a);

console.log(result);
