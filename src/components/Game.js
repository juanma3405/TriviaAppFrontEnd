import { TriviaContext } from "../store/triviastore.js";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Summary from "./Summary.js";
import Question from "./Question.js";

export default function Game() {
  debugger;
  const navigate = useNavigate();
  const { questions, setQuestions, userAnswers, setUserAnswers, error } =
    useContext(TriviaContext);
  const [timeLeft, setTimeLeft] = useState(20);
  const [timeUp, setTimeUp] = useState(false);
  const [indexQuestion, setIndexQuestion] = useState(0);
  const gameFailed = userAnswers.length === 0 && questions.length === 0;
  const gameComplete = userAnswers.length === questions.length;

  const handleChangeQuestion = (selectedAnswer) => {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
    setIndexQuestion((prevIndex) => {
      return prevIndex + 1;
    });
    setTimeLeft(20);
    setTimeUp(false);
  };

  const resetGame = () => {
    setQuestions([]);
    setUserAnswers([]);
    setIndexQuestion(0);
    navigate("/selections");
  };

  if (error) {
    return (
      <div className="home-container">
        <p className="home-text">Error connecting with server</p>
      </div>
    );
  }

  if (gameFailed) {
    return (
      <div className="home-container">
        <p className="home-text">Something went wrong</p>
        <button onClick={resetGame} className="btn-play">
          Back to selections
        </button>
      </div>
    );
  }

  if (gameComplete) {
    return (
      <Summary
        setIndexQuestion={setIndexQuestion}
        resetGame={resetGame}
      ></Summary>
    );
  }

  return (
    <div className="game-container">
      <Question
        changeQuestion={handleChangeQuestion}
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
        timeUp={timeUp}
        setTimeUp={setTimeUp}
        indexQuestion={indexQuestion}
      />
    </div>
  );
}
