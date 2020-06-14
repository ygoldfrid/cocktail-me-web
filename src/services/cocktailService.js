import http from "./httpService";

const cocktailsEndpoint = "cocktails/";
const ingredientsEndpoint = "ingredients";

// Cocktails

function getAllCocktails() {
  return http.get(cocktailsEndpoint);
}

function getCocktailById(cocktailId) {
  return http.get(cocktailsEndpoint + cocktailId);
}

function getCocktailIngredients(cocktailId) {
  return http.get(`${cocktailsEndpoint}${cocktailId}/ingredients`);
}

// Ingredients

function getAllIngredients() {
  return http.get(ingredientsEndpoint);
}

function getIngredientById(ingredientId) {
  return http.get(`${ingredientsEndpoint}/${ingredientId}`);
}

function getIngredientsByType(type) {
  return http.get(`${ingredientsEndpoint}?type=${type}`);
}

function getIngredientCocktails(ingredientId) {
  return http.get(`${ingredientsEndpoint}/${ingredientId}/cocktails`);
}

export default {
  getAllCocktails,
  getCocktailById,
  getCocktailIngredients,
  getAllIngredients,
  getIngredientById,
  getIngredientsByType,
  getIngredientCocktails,
};
