import { TriviaContext } from "../store/triviastore.js";
import { useContext } from "react";
import winImg from "../assets/win-removebg-preview.png";
import loseImg from "../assets/derrota-removebg-preview.png";
import passImg from "../assets/aproved-removebg-preview.png";

export default function Summary({ resetGame }) {
  const { questions, userAnswers } = useContext(TriviaContext);

  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === questions[index].correct_Answer
  );

  const points = correctAnswers.length * 10;

  const numberCorrectAnswers = correctAnswers.length;
  const numberWrongAnswers = 10 - numberCorrectAnswers;

  return (
    <div className="home-container">
      <div className="summary-elements">
        <div className="row">
          <div className="col">
            {numberCorrectAnswers === 10 && (
              <img src={winImg} className="home-image" alt="Winimage"></img>
            )}
            {numberCorrectAnswers < 5 && (
              <img src={loseImg} className="home-image" alt="Loseimage"></img>
            )}
            {numberCorrectAnswers >= 5 && numberCorrectAnswers < 10 && (
              <img src={passImg} className="home-image" alt="Passimage"></img>
            )}
          </div>
          <div className="col">
            <div className="home-text">
              <h1> YOUR SCORE </h1>
              <h2> {points} POINTS!</h2>
            </div>
            <p className="home-text"> {numberCorrectAnswers} correct answers</p>
            <p className="home-text"> {numberWrongAnswers} wrong answers</p>
            <button onClick={resetGame} className="btn-play">
              PLAY AGAIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
