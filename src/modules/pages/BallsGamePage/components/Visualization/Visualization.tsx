import React from "react";

import type {
  BotDesicion,
  PlayerDesicion,
} from "../../../../../types/Desicion";

type VisualizationProps = {
  showResult: boolean;
  isLoading: boolean;
  botDecision: BotDesicion;
  playersDecision: PlayerDesicion;
};

export const Visualization: React.FC<VisualizationProps> = ({
  showResult,
  isLoading,
  botDecision,
  playersDecision,
}) => {
  return (
    <div className="game__visualization">
      {!showResult || isLoading ? (
        <img src="/players/001-wait-arm.png" alt="001-wait-arm" />
      ) : (
        <img
          src={`/players/001-balls-${botDecision.balls}.png`}
          alt={`001-balls-${botDecision.balls}`}
        />
      )}

      {!showResult || isLoading ? (
        <img src="/players/456-wait-arm.png" alt="456-wait-arm" />
      ) : (
        <img
          src={`/players/456-balls-${playersDecision.balls.length}.png`}
          alt={`456-balls-${playersDecision.balls.length}`}
        />
      )}
    </div>
  );
};
