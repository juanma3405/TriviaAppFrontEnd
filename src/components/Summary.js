import { TriviaContext } from "../store/triviastore.js";
import { useContext, useEffect, useState } from "react";
import victoryImg from "../assets/victoria.png";
import defeatImg from "../assets/derrota.png";
import approveImg from "../assets/aprobado.png";

const preloadImages = (imageArray, setImagesLoaded) => {
  let loadedImages = [];
  imageArray.forEach((src, index) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      loadedImages[index] = img.src;
      if (loadedImages.length === imageArray.length) {
        setImagesLoaded(loadedImages);
      }
    };
  });
};

export default function Summary({ resetGame }) {
  const { questions, userAnswers } = useContext(TriviaContext);
  const [imagesLoaded, setImagesLoaded] = useState([]);

  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === questions[index].correct_Answer
  );

  const points = correctAnswers.length * 10;

  const numberCorrectAnswers = correctAnswers.length;
  const numberWrongAnswers = 10 - numberCorrectAnswers;

  useEffect(() => {
    const images = [victoryImg, defeatImg, approveImg];
    preloadImages(images, setImagesLoaded);
  }, []);

  return (
    <div className="home-container">
      {imagesLoaded.length > 0 ? (
        <div className="summary-elements">
          <div className="row">
            <div className="col">
              {numberCorrectAnswers === 10 && (
                <img
                  src={imagesLoaded[0]}
                  className="home-image"
                  alt="Winimage"
                ></img>
              )}
              {numberCorrectAnswers < 5 && (
                <img
                  src={imagesLoaded[1]}
                  className="home-image"
                  alt="Loseimage"
                ></img>
              )}
              {numberCorrectAnswers >= 5 && numberCorrectAnswers < 10 && (
                <img
                  src={imagesLoaded[2]}
                  className="home-image"
                  alt="Passimage"
                ></img>
              )}
            </div>
            <div className="col">
              <div>
                <h1> YOUR SCORE </h1>
                <h2> {points} POINTS!</h2>
              </div>
              <p> {numberCorrectAnswers} correct answers</p>
              <p> {numberWrongAnswers} wrong answers</p>
              <button onClick={resetGame} className="btn-play">
                PLAY AGAIN
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="home-text">Waiting for results...</p>
      )}
    </div>
  );
}
