import "dotenv";

if (process.env.APIKEY == null) {
  throw new Error("Missing APIKEY env");
}

const apikey = process.env.APIKEY;

const enum ENDPOINT {
  AUTH = "/token",
  TASK = "/task",
  ANSWER = "/answer",
}

const BaseUrl = "https://zadania.aidevs.pl/";

export async function authorize(taskname: string): AuthResponse {
  const url = new URL(`${ENDPOINT.AUTH}/${taskname}`, BaseUrl);
  const body = JSON.stringify({
    apikey,
  });
  const method = "POST";

  return fetch(url, {
    body,
    method,
  }).then((response) => response.json<AuthResponse>());
}

export async function task<T>(token: string | Promise<string>): Response<T> {
  const url = new URL(`${ENDPOINT.TASK}/${await token}`, BaseUrl);
  return fetch(url).then((response) => response.json<Response<T>>());
}

export async function answer(
  token: string | Promise<string>,
  answer: string
): AnswerResponse {
  const url = new URL(`${ENDPOINT.ANSWER}/${await token}`, BaseUrl);
  const body = JSON.stringify({
    answer,
  });
  const method = "POST";

  return fetch(url, {
    body,
    method,
  }).then((response) => response.json<AnswerResponse>());
}

export type Response<T> = Promise<
  {
    code: number;
    msg: string;
  } & T
>;

type AuthResponse = Response<{
  token: string;
}>;

type AnswerResponse = Response<never>;
