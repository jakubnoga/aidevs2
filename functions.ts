import OpenAI from "openai";
import { answer, authorize, task } from "./utils";

const { token } = await authorize("functions");
const data = await task(token);

const f: OpenAI.Chat.ChatCompletionCreateParams.Function = {
  name: "addUser",
  parameters: {
    type: "object",
    properties: {
      name: {
        type: "string",
      },
      surname: {
        type: "string",
      },
      year: {
        type: "integer",
      },
    },
  },
  description: "Add user to long-term mem"
};

const result = await answer(token, f);
console.log(result);
