require("dotenv").config();
import express from "express";

import Anthropic from "@anthropic-ai/sdk";
import { getSystemPrompt } from "./prompts";

const app = express();

// const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

const anthropic = new Anthropic();

async function main() {
  anthropic.messages
    .stream({
      messages: [{ role: "user", content: "craete a simple todo app" }],
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: getSystemPrompt(),
    })
    .on("text", (text) => {
      console.log(text);
    });
}

main();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
