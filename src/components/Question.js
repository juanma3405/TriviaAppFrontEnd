import Answers from "./Answers";
import { TriviaContext } from "../store/triviastore.js";
import { useContext, useEffect, useState } from "react";

export default function Question({
  changeQuestion,
  timeLeft,
  setTimeLeft,
  timeUp,
  setTimeUp,
  indexQuestion,
}) {
  debugger;
  const { questions } = useContext(TriviaContext);
  const question = questions[indexQuestion].question;
  const [selectedAnswer, setSelectedAnswer] = useState("");

  useEffect(() => {
    if (timeLeft > 0 && !timeUp && !selectedAnswer) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0) {
      setTimeUp(true);
    }
  }, [timeLeft, setTimeLeft, setTimeUp, timeUp, selectedAnswer]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  return (
    <>
      {!timeUp && (
        <div className="timer-container">Time Left: {timeLeft} seconds</div>
      )}
      {timeUp && <div className="time-up-message">TIME'S UP!!</div>}
      <div className="game-question">
        <p className="home-text">{indexQuestion + 1}/10</p>
        {question}
      </div>
      <Answers
        changeQuestion={changeQuestion}
        timeUp={timeUp}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
        handleAnswerSelect={handleAnswerSelect}
        indexQuestion={indexQuestion}
      />
    </>
  );
}
