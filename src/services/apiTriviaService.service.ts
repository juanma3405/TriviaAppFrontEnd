const apiUrl =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL_PRODUCTION
    : process.env.REACT_APP_API_URL_LOCAL;

class apiTriviaService {
  static async getCategories() {
    try {
      const response = await fetch(apiUrl + "categories", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Error getting categories");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(
        "There was a problem with the fetch categories operation:",
        error
      );
      throw error;
    }
  }

  static async getQuestions(config: any) {
    try {
      const response = await fetch(apiUrl + "questions", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(config),
      });
      if (!response.ok) {
        throw new Error("Error getting questions");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(
        "There was a problem with the fetch questions operation:",
        error
      );
      throw error;
    }
  }
}

export default apiTriviaService;
