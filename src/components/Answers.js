import { TriviaContext } from "../store/triviastore.js";
import { useContext, useState, useEffect } from "react";

export default function Answers({
  changeQuestion,
  timeUp,
  selectedAnswer,
  setSelectedAnswer,
  handleAnswerSelect,
  indexQuestion,
}) {
  const { questions } = useContext(TriviaContext);

  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  useEffect(() => {
    const shuffled = [
      questions[indexQuestion].correct_Answer,
      ...questions[indexQuestion].incorrect_Answers,
    ].sort(() => Math.random() - 0.5);
    setShuffledAnswers(shuffled);
    setSelectedAnswer("");
  }, [questions, indexQuestion, setSelectedAnswer]);

  return (
    <div className={`game-answers ${timeUp ? "time-up" : ""}`}>
      <ul>
        {shuffledAnswers.map((answer, index) => {
          const classBtn = `game-answers-button ${
            selectedAnswer
              ? answer === questions[indexQuestion].correct_Answer
                ? "correct"
                : selectedAnswer === answer
                ? "incorrect"
                : "noselected"
              : ""
          }`;
          return (
            <li key={index}>
              <button
                onClick={() => handleAnswerSelect(answer)}
                className={classBtn}
                disabled={selectedAnswer || timeUp}
              >
                {answer}
              </button>
            </li>
          );
        })}
      </ul>
      {(selectedAnswer || timeUp) && (
        <div>
          <button
            className="btn-play btn-continue-answers"
            onClick={() => changeQuestion(selectedAnswer || "")}
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
