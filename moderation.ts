import OpenAI from "openai";
import { authorize, task, answer } from "./utils";

type ModerationTask = {
  input: string[];
};

const { token } = await authorize("moderation");
const t = await task<ModerationTask>(token);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_APIKEY,
});

const moderations = await Promise.all(
  t.input.map((input) =>
    openai.moderations.create({
      input,
    })
  )
);

const result = moderations.map(({ results: [result] }) => +result.flagged);
answer(token, result);
