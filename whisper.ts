import OpenAI from "openai";
import { answer, authorize, task } from "./utils";

const { token } = await authorize("whisper");
const data = await task(token);

const audioFile = await fetch("https://zadania.aidevs.pl/data/mateusz.mp3");
const openai = new OpenAI({ apiKey: process.env.OPENAI_APIKEY });
const transcript = await openai.audio.transcriptions.create({
  file: audioFile,
  model: "whisper-1",
});

const result = await answer(token, transcript.text);
console.log(result);
