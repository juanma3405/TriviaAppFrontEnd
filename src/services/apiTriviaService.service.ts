//const apiUrl = "https://localhost:7045/api/trivia/"; // para ejecutar aplicacion local
const apiUrl = "http://www.trivia-backend.somee.com/"; //para ejecutar aplicacion desde hosting 
class apiTriviaService {

  static async getCategories(){
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
      console.error("There was a problem with the fetch categories operation:", error);
      throw error; 
    }
  }

  static async getQuestions(config) {
    try {
      const response = await fetch(apiUrl + "questions", {
           method: "POST",
           headers: {
           'Content-type': 'application/json'
           },
           body: JSON.stringify(config)
         });
         if (!response.ok){
           throw new Error("Error getting questions");
         }
         const data = await response.json();
         return data; 
    } catch (error) {
      console.error("There was a problem with the fetch questions operation:", error);
      throw error; 
    }
  }

}

export default apiTriviaService;
