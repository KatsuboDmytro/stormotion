import React from "react";

import type { PlayerDesicion } from "../../../../../types/Desicion";
import type { Order } from "../../../../../types/Order";

type ScoreBarProps = {
  player: string;
  order: Order;
  amountOfBalls: number;
  playersDecision?: PlayerDesicion;
  handleChooseBall?: (e: React.MouseEvent<HTMLImageElement>) => void;
};

export const ScoreBar: React.FC<ScoreBarProps> = ({
  player,
  order,
  amountOfBalls,
  playersDecision,
  handleChooseBall,
}) => {
  return (
    <article className="game-window__player">
      {player === "001" && (
        <img
          src={`/players/${player}.png`}
          alt={`player ${player}`}
          className={order === "bot" ? "active-player" : ""}
        />
      )}
      <div className="game-window__player-balls">
        {Array.from({ length: amountOfBalls }, (_, i) => (
          <img
            key={i}
            src="/players/ball.png"
            alt={`ball ${i + 1}`}
            className={`game-window__player-ball ${player === "456" && playersDecision?.balls.includes(i) ? "active-ball" : ""}`}
            onClick={handleChooseBall}
          />
        ))}
      </div>
      {player === "456" && (
        <img
          src={`/players/${player}.png`}
          alt={`player ${player}`}
          className={order === "player" ? "active-player" : ""}
        />
      )}
    </article>
  );
};
