/// <reference types="vite/client" />
import { GoogleGenerativeAI } from "@google/generative-ai";



import type { GetBotDecisionProps } from "../types/Desicion";





const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-lite",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 65536,
  responseModalities: [],
  responseMimeType: "text/plain",
};

export const AIChatSession = model.startChat({
  generationConfig,
  history: [],
});

export const getBotDecision = async ({
  order,
  playerAmountOfBall,
  botsAmountOfBall,
  setBotDecision,
  setIsLoading,
}: GetBotDecisionProps) => {
  setIsLoading(true);
  const response = await AIChatSession.sendMessage(
    order === "player"
      ? `You are playing Odd or Even against your worst enemy.
    You currently have ${botsAmountOfBall} balls, and your opponent has ${playerAmountOfBall} balls.
    You must choose the number of balls you will bet (from 1 to ${botsAmountOfBall}).
    Think strategically:
    - never bet all your balls, because you will be killed;
    - if you have fewer balls, risk a larger bet;
    - if you have more balls, bet less to protect your advantage;
    - choose the evenness so as to reduce the enemy's chances of winning.
    Write EXCLUSIVELY in the format: number of balls.
    `
      : `You are in a real Squid Game. You have ${botsAmountOfBall} balls left, and player 456 has ${playerAmountOfBall} balls.
    You have to choose the number of balls you will bet (from 1 to ${botsAmountOfBall}) and indicate whether the sum of your balls will be even or odd.
    Think strategically:
    - never bet all your balls, because you will be killed;
    - if you have more balls, take minimal risks to maintain an advantage;
    - if you have fewer balls, bet more to win back;
    - choose the evenness so that it is difficult for the player to guess.
    Write EXCLUSIVELY in the format: number of balls, even/odd.
    `,
  );

  const text = response.response.text().trim();

  const parts = text.split(",").map((p) => p.trim());
  let amount = parseInt(parts[0]);

  if (isNaN(amount) || amount < 1 || amount > botsAmountOfBall) {
    amount = 0;
    console.warn(`BOT puts the incorrect number of balls, fixed on ${amount}`);
  }

  setBotDecision({
    balls: amount,
    parity: parts[1] as "" | "even" | "odd",
  });
  setIsLoading(false);
};