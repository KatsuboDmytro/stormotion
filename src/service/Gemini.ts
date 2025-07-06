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
      ? `Ти береш участь у грі "Парні чи непарні" проти твого найзапеклішого ворога. 
    У тебе зараз ${playerAmountOfBall} кульок, а у суперника — ${botsAmountOfBall} кульок. 
    Ти повинен вибрати кількість кульок, які поставиш (від 1 до ${playerAmountOfBall}). 
    Подумай стратегічно:
    - ніколи не став всі свої кульки, бо тебе вб'ють;
    - якщо у тебе менше кульок, ризикуй більшою ставкою;
    - якщо у тебе більше кульок, став менше, щоб захистити свою перевагу;
    - вибирай парність так, щоб зменшити шанси ворога виграти.
    Напиши ВИКЛЮЧНО у форматі: кількість кульок.
  `
      : `Ти потрапив у справжню "Гру в Кальмара". У тебе залишилось ${botsAmountOfBall} кульок, а в гравця 456 — ${playerAmountOfBall} кульок. 
    Ти маєш обрати кількість кульок, які поставиш (від 1 до ${botsAmountOfBall}) та вказати, чи буде сума ваших кульок парною чи непарною. 
    Подумай стратегічно: 
    - ніколи не став всі свої кульки, бо тебе вб'ють;
    - якщо у тебе більше кульок, ризикуй мінімально, щоб зберегти перевагу; 
    - якщо у тебе менше кульок, став більше, щоб відігратись;
    - вибирай парність так, щоб ускладнити гравцеві вгадування.
    Напиши ВИКЛЮЧНО у форматі: кількість кульок, парна/непарна.
  `,
  );

  const text = response.response.text().trim();

  const parts = text.split(",").map((p) => p.trim());
  let amount = parseInt(parts[0]);

  if (isNaN(amount) || amount < 1 || amount > botsAmountOfBall) {
    amount = 1;
    console.warn(
      `BOT ставить некоректну кількість кульок, виправлено на ${amount}`,
    );
  }

  setBotDecision({
    balls: amount,
    parity: parts[1] as "" | "парна" | "непарна",
  });
  setIsLoading(false);
};
