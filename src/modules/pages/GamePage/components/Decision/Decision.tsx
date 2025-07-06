import React from "react";



import type { PlayerDesicion } from "../../../../../types/Desicion";
import type { Order, Parity } from "../../../../../types/Order";





type DecisionProps = {
  playersDecision: PlayerDesicion;
  setPlayersDecision: React.Dispatch<React.SetStateAction<PlayerDesicion>>;
  handleApproveAmount: (e: React.FormEvent<HTMLFormElement>) => void;
  showResult: boolean;
  order: Order;
};

export const Decision: React.FC<DecisionProps> = ({
  playersDecision,
  setPlayersDecision,
  handleApproveAmount,
  showResult,
  order,
}) => {
  const handleParityChoose = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayersDecision((prev) => ({
      ...prev,
      parity: e.target.value as Parity,
    }));
  };

  if (playersDecision.balls.length !== 0 && !showResult && order === "player") {
    return (
      <form
        action="submit"
        onSubmit={handleApproveAmount}
        className="game__form"
      >
        <p>Ставлю {playersDecision.balls.length} шт. та загадую, що сума:</p>
        <p className="game__parity">
          <label>
            <input
              type="radio"
              name="parity"
              value="парна"
              required
              checked={playersDecision.parity === "парна"}
              onChange={handleParityChoose}
            />
            Парна
          </label>
          <label>
            <input
              type="radio"
              name="parity"
              value="непарна"
              required
              checked={playersDecision.parity === "непарна"}
              onChange={handleParityChoose}
            />
            Непарна
          </label>
        </p>
        <button
          className="game__approve"
          type="submit"
          disabled={playersDecision.balls.length === 0}
        >
          Підтвердити
        </button>
      </form>
    );
  }
  return null;
};