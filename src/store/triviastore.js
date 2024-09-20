import { createContext, useState } from "react";

export const TriviaContext = createContext();

export default function TriviaContextProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [error, setError] = useState(null);
  const [loadingCategories, setLoadingCategories] = useState(true);

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
