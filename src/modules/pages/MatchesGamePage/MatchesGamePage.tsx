import { useMatchesGame } from "../../../hooks/useMatchesGame";
import "./matchesGamePage.css";

export const MatchesGamePage = () => {
  const { order, showPlatform, playerMatches, setOrder, setShowPlatform } =
    useMatchesGame();

  return (
    <section className="matches">
      <article className="matches__player matches__player--bot">
        <img src="/items/treasure-bot.png" alt="treasure-war-fog" />
        <div
          className={`matches__bot--view1 ${order === "" ? "matches__order--player-choose" : ""}`}
          onClick={() => {
            setOrder("bot");
            setShowPlatform(false);
          }}
        >
          <img
            src="/players/matches-bot.png"
            alt="matches-bot"
            className="matches__bot--view"
          />
        </div>
      </article>
      {order === "" ? (
        <div className="matches__order">
          <h1>Who will play the first?</h1>
          <p>Click on the bot or player!</p>
        </div>
      ) : (
        <section className="matches__center">
          <div className="matches__rules">
            <h1 className="rules__title">Rules "Matches"</h1>
            <ul className="rules__list">
              <li>Participants are divided into pairs.</li>
              <li>
                From the pile of 25 matches, each player takes 1, 2 or 3 matches
                on each turn.
              </li>
              <li>The game is over once all matches are taken.</li>
              <li>Whoever has the even amount of matches wins.</li>
            </ul>
          </div>
          <div
            className="matches__pile"
            style={{
              transform:
                order === "bot" ? "rotateX(180deg)" : "rotateY(180deg)",
            }}
          >
            <img
              src="/items/pile.png"
              alt="pile"
              className="matches__pile--pile"
            />
            <div
              className="matches__pile--platform"
              style={{
                bottom: showPlatform ? "-44px" : "0px",
              }}
            >
              <img src="/items/gift-platform.png" alt="gift-platform" />
            </div>
          </div>
          {order === "player" && (
            <h1 className="matches__warning">
              Press 1, 2 or 3 to choose amount
            </h1>
          )}
        </section>
      )}
      <article className="matches__player matches__player--player">
        <div
          className={`${order === "" ? "matches__order--choose" : ""}`}
          onClick={() => {
            setOrder("player");
            setShowPlatform(true);
          }}
        >
          <img
            src="/players/matches-player.png"
            alt="matches-player"
            className="matches__player--view"
          />
        </div>
        <img src="/items/treasure-player.png" alt="treasure-war-fog" />
        <div className="matches__pile--amount">
          {Array.from({ length: playerMatches }).map((_, index) => (
            <span key={index}>🔥</span>
          ))}
        </div>
      </article>
    </section>
  );
};
