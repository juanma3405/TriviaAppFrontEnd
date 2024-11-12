import logoImg from "../assets/Interrogantes-Inflados-Mandala.jpg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiTriviaService from "../services/apiTriviaService.service.ts";
import { TriviaContext } from "../store/triviastore.js";
import { useContext } from "react";

const preloadImage = (imageSrc, setImageLoaded) => {
  const img = new Image();
  img.src = imageSrc;
  img.onload = () => {
    setImageLoaded(img.src);
  };
};

export default function Home() {
  const { setError, categories, setCategories, setLoadingCategories } =
    useContext(TriviaContext);

  const [imageLoaded, setImageLoaded] = useState(null);
  const imageUrl = logoImg;

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await apiTriviaService.getCategories();
        setCategories(response);
        setLoadingCategories(false);
      } catch (error) {
        setError(error.message);
        setLoadingCategories(false);
        console.error("Error fetching categories", error);
      }
    }
    fetchCategories();
  }, [setCategories, setError, setLoadingCategories]);

  useEffect(() => {
    preloadImage(imageUrl, setImageLoaded);
  }, [imageUrl]);

  const navigate = useNavigate();

  const goToSelections = () => {
    navigate("/selections");
  };

  if (categories.length === 0 || !imageLoaded)
    return (
      <div className="home-container">
        {" "}
        <p className="home-text"> Loading... </p>
      </div>
    );

  return (
    <div className="home-container">
      <img className="home-image" src={logoImg} alt="Quiz logo"></img>
      <h1 className="home-text"> LET´S PLAY NOW A TRIVIA GAME </h1>
      <button className="home-button" onClick={goToSelections}>
        GET STARTED
      </button>
    </div>
  );
}
