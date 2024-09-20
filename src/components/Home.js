import logoImg from "../assets/Interrogantes-Inflados-Mandala.jpg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiTriviaService from "../services/apiTriviaService.service.ts";
import { TriviaContext } from "../store/triviastore.js";
import { useContext } from "react";

export default function Home() {
  const { setError, setCategories, setLoadingCategories } =
    useContext(TriviaContext);

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

  const navigate = useNavigate();

  const goToSelections = () => {
    navigate("/selections");
  };

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
