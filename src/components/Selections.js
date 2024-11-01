import { TriviaContext } from "../store/triviastore.js";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import apiTriviaService from "../services/apiTriviaService.service.ts";

export default function Selections() {
  debugger;
  const navigate = useNavigate();
  const { categories, setQuestions, error, setError, loadingCategories } =
    useContext(TriviaContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    const config = {
      category: data.category,
      difficulty: data.difficulty,
      type: data["question-type"],
    };
    console.log(config);
    try {
      const response = await apiTriviaService.getQuestions(config);
      if (response.length === 0) {
        navigate("/failed-search");
        return;
      }
      setQuestions(response);
      navigate("/game");
    } catch (error) {
      setError(error.message);
      console.error("Error fetching questions", error);
    }
  };

  if (error) {
    return (
      <div className="home-container">
        <p className="home-text">Error connecting with server</p>
      </div>
    );
  }

  if (loadingCategories) {
    return (
      <div className="home-container">
        <p className="home-text">Loading categories...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-container">
        <div className="form-elements">
          <label htmlFor="category" className="label home-text">
            Category:
          </label>
          <select id="category" name="category" className="select-field">
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <label htmlFor="difficulty" className="label home-text">
            Difficulty:
          </label>
          <select id="difficulty" name="difficulty" className="select-field">
            <option value="any">Any difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <label htmlFor="question-type" className="label home-text">
            Type of questions:
          </label>
          <select
            id="question-type"
            name="question-type"
            className="select-field"
          >
            <option value="any">Any type</option>
            <option value="multiple">Múltiple Choice</option>
            <option value="boolean">True/False</option>
          </select>
          <div>
            <button type="submit" className="btn-play">
              START PLAYING
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
