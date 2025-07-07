import { useCallback, useEffect, useState } from "react";

import { getBotDecision } from "../../../service/Gemini";
import type { BotDesicion, PlayerDesicion } from "../../../types/Desicion";
import type { Order } from "../../../types/Order";
import { countBallsLogic } from "../../../utils/gameLogic";
import { ChooseOrder, Decision, ScoreBar, Visualization } from "../../index";
import "./ballsGamePage.css";

export const BallsGamePage = () => {
  const [botsAmountOfBall, setBotsAmountOfBall] = useState(10);
  const [playerAmountOfBall, setPlayersAmountOfBall] = useState(10);

  const [playersDecision, setPlayersDecision] = useState<PlayerDesicion>({
    balls: [],
    parity: "",
  });
  const [botDecision, setBotDecision] = useState<BotDesicion>({
    balls: 0,
    parity: "",
  });
  const [order, setOrder] = useState<Order>("");
  const [showWarning, setShowWarning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChooseBall = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      const target = e.target as HTMLImageElement;
      const ballIndex = parseInt(target.alt.split(" ")[1]) - 1;

      setPlayersDecision((prev) => {
        if (prev.balls.includes(ballIndex)) {
          return {
            ...prev,
            balls: prev.balls.filter((index) => index !== ballIndex),
          };
        } else {
          return {
            ...prev,
            balls: [...prev.balls, ballIndex],
          };
        }
      });
    },
    [setPlayersDecision],
  );

  const handleApproveAmount = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (playersDecision.balls.length === 0) return;

      getBotDecision({
        order,
        playerAmountOfBall,
        botsAmountOfBall,
        setBotDecision,
        setIsLoading,
      });
      setShowResult(true);
    },
    [playersDecision.balls],
  );

  const handleContinue = useCallback(() => {
    if (showResult && botDecision.balls > 0) {
      const result = countBallsLogic({
        order,
        playerAmount: playerAmountOfBall,
        botAmount: botsAmountOfBall,
        playerDecision: playersDecision,
        botDecision,
      });

      setPlayersAmountOfBall(result.nextPlayerAmount);
      setBotsAmountOfBall(result.nextBotAmount);
      setPlayersDecision({ balls: [], parity: "" });
      setBotDecision({ balls: 0, parity: "" });
      if (order === "player") {
        setOrder("bot");
      } else {
        setOrder("player");
      }

      setShowResult(false);
      return;
    }
    if (botDecision.balls > 0 && playersDecision.balls.length > 0) {
      setShowResult(true);
    }
  }, [
    showResult,
    botDecision,
    playersDecision,
    order,
    playerAmountOfBall,
    botsAmountOfBall,
  ]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (playersDecision.balls.length === 0) {
      timer = setTimeout(() => {
        setShowWarning(true);
      }, 1000);
    } else {
      setShowWarning(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [playersDecision.balls]);

  useEffect(() => {
    if (order === "bot") {
      getBotDecision({
        order,
        playerAmountOfBall,
        botsAmountOfBall,
        setBotDecision,
        setIsLoading,
      });
    }
  }, [order]);

  const checkGameOver = useCallback(() => {
    if (botsAmountOfBall <= 0 || playerAmountOfBall <= 0) {
      alert(`
        Game over!
        Player 465 ${playerAmountOfBall <= 0 ? "lost" : "won"}!
      `);

      setBotsAmountOfBall(10);
      setPlayersAmountOfBall(10);
      setOrder("");
      setPlayersDecision({ balls: [], parity: "" });
      setBotDecision({ balls: 0, parity: "" });
    }
  }, [botsAmountOfBall, playerAmountOfBall]);

  useEffect(() => {
    checkGameOver();
  }, [botsAmountOfBall, playerAmountOfBall]);

  return (
    <section className="game">
      {!order ? (
        <ChooseOrder setOrder={setOrder} />
      ) : (
        <>
          <div className="game-window">
            <div className="game__score">
              <ScoreBar
                player="001"
                order={order}
                amountOfBalls={botsAmountOfBall}
              />
              <ScoreBar
                player="456"
                order={order}
                amountOfBalls={playerAmountOfBall}
                playersDecision={playersDecision}
                handleChooseBall={handleChooseBall}
              />
            </div>
            <div className="game__notifications">
              {order === "bot" &&
                playersDecision.balls.length > 0 &&
                showResult && (
                  <p className="warning-bot">
                    I think the sum of the balls is <b>{botDecision.parity}</b>
                  </p>
                )}
            </div>
            <div className="game__control">
              {showWarning && order === "player" && (
                <p className="warning-player">
                  It's your turn! You can choose the number of balls by clicking
                  on them.
                </p>
              )}
              {botDecision.balls > 0 && playersDecision.balls.length !== 0 && (
                <button className="game__approve" onClick={handleContinue}>
                  Continue
                </button>
              )}
              <Decision
                playersDecision={playersDecision}
                setPlayersDecision={setPlayersDecision}
                handleApproveAmount={handleApproveAmount}
                showResult={showResult}
                order={order}
              />
            </div>
          </div>

          <Visualization
            showResult={showResult}
            isLoading={isLoading}
            botDecision={botDecision}
            playersDecision={playersDecision}
          />
        </>
      )}
    </section>
  );
};
