import { useEffect, useRef, useState } from "react";

export const useMatchesGame = () => {
  const [order, setOrder] = useState<string>("");
  const [amountOfMatches, setAmountOfMatches] = useState(25);
  const [showPlatform, setShowPlatform] = useState(false);
  const [playerMatches, setPlayerMatches] = useState(0);
  const botMatches = useRef(0);

  const handlePlayerTurn = (matches: number) => {
    if (matches > amountOfMatches || order !== "player" || !showPlatform)
      return;

    setPlayerMatches((prev) => prev + matches);
    setAmountOfMatches((prev) => prev - matches);
    setShowPlatform(false);

    setOrder("bot");
    setShowPlatform(true);
  };

  const handleBotTurn = () => {
    const matches = Math.min(amountOfMatches, amountOfMatches % 4 || 1);
    botMatches.current += matches;
    setAmountOfMatches((prev) => prev - matches);
    setOrder("player");
    setShowPlatform(true);
  };

  const checkGameEnd = () => {
    if (amountOfMatches <= 0) {
      const winnerMessage =
        playerMatches % 2 === 0
          ? `Player: ${playerMatches}, Bot: ${botMatches.current}. Player wins with an even amount of matches!`
          : `Player: ${playerMatches}, Bot: ${botMatches.current}. Bot wins with an even amount of matches!`;

      alert(winnerMessage);
      window.location.reload();
    }
  };

  useEffect(() => {
    if (order === "bot") {
      const timer = setTimeout(handleBotTurn, 1000);
      return () => clearTimeout(timer);
    }
    checkGameEnd();
  }, [order, amountOfMatches]);

  const handleWindowKeyDown = (event: KeyboardEvent) => {
    if (order !== "player" || !showPlatform) return;

    const matches = parseInt(event.key);
    if ([1, 2, 3].includes(matches) && matches <= amountOfMatches) {
      handlePlayerTurn(matches);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleWindowKeyDown);
    return () => {
      window.removeEventListener("keydown", handleWindowKeyDown);
    };
  }, [order, amountOfMatches]);

  return {
    order,
    amountOfMatches,
    showPlatform,
    playerMatches,
    setOrder,
    setShowPlatform,
  };
};
