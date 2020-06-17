import http from "./httpService";

const cocktailsEndpoint = "cocktails/";
const ingredientsEndpoint = "ingredients";
const barEndpoint = "bar/";

const barKey = "bar";

// Cocktails
function getAllCocktails() {
  return http.get(cocktailsEndpoint);
}
function getCocktailById(cocktailId) {
  return http.get(`${cocktailsEndpoint}${cocktailId}`);
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
  return http.get(
    `${ingredientsEndpoint}/${ingredientId}/${cocktailsEndpoint}`
  );
}

// Bar
function getBar(user) {
  return user
    ? http.get(barEndpoint)
    : { data: JSON.parse(localStorage.getItem(barKey)) };
}
function addToBar(user, bar, ingredientId) {
  return user
    ? http.post(barEndpoint, { _id: ingredientId })
    : { data: localStorage.setItem(barKey, JSON.stringify(bar)) };
}
function removeFromToBar(user, bar, ingredientId) {
  return user
    ? http.delete(`${barEndpoint}${ingredientId}`)
    : { data: localStorage.setItem(barKey, JSON.stringify(bar)) };
}

export default {
  getAllCocktails,
  getCocktailById,
  getCocktailIngredients,
  getAllIngredients,
  getIngredientById,
  getIngredientsByType,
  getIngredientCocktails,
  getBar,
  addToBar,
  removeFromToBar,
};
