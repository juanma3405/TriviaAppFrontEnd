import { createContext, useState, useEffect } from "react";

export const TriviaContext = createContext();

export default function TriviaContextProvider({ children }) {
  const [categories, setCategories] = useState(() => {
    const savedCategories = sessionStorage.getItem("categories");
    return savedCategories ? JSON.parse(savedCategories) : [];
  });
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [error, setError] = useState(null);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    if (categories.length > 0) {
      sessionStorage.setItem("categories", JSON.stringify(categories));
      setLoadingCategories(false);
    }
  }, [categories]);

  return (
    <TriviaContext.Provider
      value={{
        categories,
        setCategories,
        questions,
        setQuestions,
        userAnswers,
        setUserAnswers,
        error,
        setError,
        loadingCategories,
        setLoadingCategories,
      }}
    >
      {children}
    </TriviaContext.Provider>
  );
}
