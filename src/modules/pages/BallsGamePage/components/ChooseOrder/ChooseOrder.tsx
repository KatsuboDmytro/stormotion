import React from "react";

import type { Order } from "../../../../../types/Order";

type ChooseOrderProps = {
  setOrder: (order: Order) => void;
};

export const ChooseOrder: React.FC<ChooseOrderProps> = ({ setOrder }) => {
  const handleBotStart = () => setOrder("bot");
  const handlePlayerStart = () => setOrder("player");

  return (
    <div className="game-start">
      <h1>Who will play first?</h1>
      <div className="game-start__players">
        <img src="players/001.png" alt="player 001" onClick={handleBotStart} />
        <h2>VS</h2>
        <img
          src="players/456.png"
          alt="player 456"
          onClick={handlePlayerStart}
        />
      </div>
    </div>
  );
};
