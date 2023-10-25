import { answer, authorize, task, Response } from "./utils";

type HelloApiTask = {
  cookie: string;
};

const { token } = await authorize("helloapi");
const { cookie } = await task<HelloApiTask>(token);

const result = await answer(token, cookie);

console.log(result);
