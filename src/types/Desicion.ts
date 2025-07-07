export type PlayerDesicion = {
  balls: number[];
  parity: "even" | "odd" | "";
};

export type BotDesicion = {
  balls: number;
  parity: "even" | "odd" | "";
};

export type GetBotDecisionProps = {
  order: "bot" | "player" | "";
  playerAmountOfBall: number;
  botsAmountOfBall: number;
  setBotDecision: React.Dispatch<
    React.SetStateAction<{
      balls: number;
      parity: "" | "even" | "odd";
    }>
  >;
  setIsLoading: (loading: boolean) => void;
};