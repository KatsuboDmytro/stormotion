export type PlayerDesicion = {
  balls: number[];
  parity: "парна" | "непарна" | "";
};

export type BotDesicion = {
  balls: number;
  parity: "парна" | "непарна" | "";
};

export type GetBotDecisionProps = {
  order: "bot" | "player" | "";
  playerAmountOfBall: number;
  botsAmountOfBall: number;
  setBotDecision: React.Dispatch<
    React.SetStateAction<{
      balls: number;
      parity: "" | "парна" | "непарна";
    }>
  >;
  setIsLoading: (loading: boolean) => void;
};