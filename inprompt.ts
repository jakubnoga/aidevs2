import OpenAI from "openai";
import { answer, authorize, task } from "./utils";

type InpromptTask = {
  input: string[];
  question: string;
};

const { token } = await authorize("inprompt");
const { input, question } = await task<InpromptTask>(token);

const openai = new OpenAI({ apiKey: process.env.OPENAI_APIKEY });
let context = await findContext(openai);
let $answer = await answerQuestionUsingContext(openai, context);

const result = await answer(token, $answer);

console.log(result);

async function answerQuestionUsingContext(openai: OpenAI, context: string[]) {
  const PersonQuestionPrompt = `
Answer in Polish a question about a person given following context:

###
Context:
${context.join("\n")}

###`;

  const {
    choices: [choice],
  } = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: PersonQuestionPrompt,
      },
      {
        role: "user",
        content: question,
      },
    ],
  });

  return choice.message.content;
}

async function findContext(openai: OpenAI) {
  const PersonExtractionPrompt = `
Provided a question about a person I will extract person's name, and return only name:
###
Examples:
- kim jest Adam?
- Adam

- co lubi jeść na śniadanie Alojzy?
- Alojzy
###
`;

  const {
    choices: [choice],
  } = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: PersonExtractionPrompt,
      },
      {
        role: "user",
        content: question,
      },
    ],
  });
  const name = choice.message.content;

  return input.filter((statement) => statement.match(new RegExp(name ?? "#$%^^#$%")));
}
