import { Link } from "react-router";

import "./homePage.css";

export const HomePage = () => {

  return (
    <div className="home">
      <img className="home__img" src="/text/title.svg" alt="title" />
      <div className="home__buttons">
        <Link to={"/matches"} className="home__buttons-write">
          <img src="/icons/home/write-author.svg" alt="write-author button" />
          <p>Matches</p>
        </Link>
        <Link to={"/balls"} className="home__buttons-play">
          <img src="/icons/home/play.svg" alt="to play button" />
          <p>Balls</p>
        </Link>
        <Link to={"/rules"} className="home__buttons-rules">
          <img src="/icons/home/rules.svg" alt="rules button" />
          <p>Rules</p>
        </Link>
      </div>
    </div>
  );
};
