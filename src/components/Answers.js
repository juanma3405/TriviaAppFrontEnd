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
                : ""
              : ""
          }`;
          // esto es lo mismo que lo que sigue
          // let classBtn = "game-answers-button"; // Clase base para el botón
          // if (selectedAnswer) {
          //   // Si el usuario ya seleccionó una respuesta
          //   if (answer === questions[indexQuestion].correct_Answer) {
          //     // Si la respuesta actual es la correcta
          //     classBtn = classBtn + " correct";
          //   }
          //   // Añadir clase "correct" si es correcta
          //   else if (answer === selectedAnswer) {
          //     // Si la respuesta actual es la seleccionada por el usuario y es incorrecta
          //     classBtn = classBtn + " incorrect";
          //   }
          //   // Añadir clase "incorrect" si es la seleccionada y es incorrecta
          // }
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
            className="btn-play"
            onClick={() => changeQuestion(selectedAnswer || "")}
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
