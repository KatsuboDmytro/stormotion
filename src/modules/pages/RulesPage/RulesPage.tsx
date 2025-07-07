import { Back } from "../../index";
import "./rulesPage.css";

export const RulesPage = () => {
  return (
    <div className="rules">
      <Back />
      <h1 className="rules__title">Rules</h1>
      <ul className="rules__list">
        <li>Participants are divided into pairs.</li>
        <li>Each player receives 10 marbles.</li>
        <li>
          Players take turns choosing how many marbles to put in their hand —
          from 1 to 10.
        </li>
        <li>The player who guesses says “even” or “odd.”</li>
        <li>
          Then both players simultaneously show their hand with a certain number
          of marbles.
        </li>
        <li>
          If the sum of the marbles of both players matches the guess (even or
          odd), then the player who guessed takes from the opponent the number
          of marbles he put in.
        </li>
        <li>
          If not, the one who guessed incorrectly loses and gives away the
          marbles.
        </li>
        <li>
          The game continues until one of the players collects all the marbles
          or is left without them.
        </li>
        <li>The winner is the one who collects all the balls.</li>
      </ul>
    </div>
  );
};
