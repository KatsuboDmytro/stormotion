import type { PlayerDesicion, BotDesicion } from "../types/Desicion";
import type { Order } from "../types/Order";

export type CountBallsParams = {
  order: Order;
  playerAmount: number;
  botAmount: number;
  playerDecision: PlayerDesicion;
  botDecision: BotDesicion;
};

export type CountBallsResult = {
  nextPlayerAmount: number;
  nextBotAmount: number;
  winner: "player" | "bot" | null;
};

export function countBallsLogic({
  order,
  playerAmount,
  botAmount,
  playerDecision,
  botDecision,
}: CountBallsParams): CountBallsResult {
  const playerStakes = playerDecision.balls.length;
  const botStakes = botDecision.balls;
  const totalBalls = playerStakes + botStakes;

  let nextPlayerAmount = playerAmount;
  let nextBotAmount = botAmount;

  let winner: "player" | "bot" | null = null;

  if (order === "player") {
    if (
      (totalBalls % 2 === 0 && playerDecision.parity === "парна") ||
      (totalBalls % 2 !== 0 && playerDecision.parity === "непарна")
    ) {
      // гравець вгадав
      nextPlayerAmount += botStakes;
      nextBotAmount -= botStakes;
      winner = "player";
    } else {
      nextPlayerAmount -= playerStakes;
      nextBotAmount += playerStakes;
      winner = "bot";
    }
  } else {
    if (
      (totalBalls % 2 === 0 && botDecision.parity === "парна") ||
      (totalBalls % 2 !== 0 && botDecision.parity === "непарна")
    ) {
      nextBotAmount += playerStakes;
      nextPlayerAmount -= playerStakes;
      winner = "bot";
    } else {
      nextBotAmount -= botStakes;
      nextPlayerAmount += botStakes;
      winner = "player";
    }
  }

  return {
    nextPlayerAmount,
    nextBotAmount,
    winner,
  };
}