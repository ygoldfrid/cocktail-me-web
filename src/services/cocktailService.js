import http from "./httpService";
import _ from "lodash";

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

// Ingredients
function getAllIngredients() {
  return http.get(ingredientsEndpoint);
}
function getIngredientById(ingredientId) {
  return http.get(`${ingredientsEndpoint}/${ingredientId}`);
}
function getIngredientsByCategory(query) {
  return http.get(`${ingredientsEndpoint}?${query}`);
}
function getIngredientCocktails(ingredientId) {
  return http.get(
    `${ingredientsEndpoint}/${ingredientId}/${cocktailsEndpoint}`
  );
}

// Bar
async function getBar(user) {
  const localBar = JSON.parse(localStorage.getItem(barKey));

  if (user) {
    const { data: dbBar } = await http.get(barEndpoint);

    if (localBar && localBar.length > 0) {
      for (let ing of localBar) addToBar(user, ing._id);

      const jointBar = _.unionBy(localBar, dbBar, "_id");

      localStorage.removeItem(barKey);
      return jointBar;
    }

    return dbBar;
  }
  return localBar || [];
}
function addToBar(user, ingredientId, bar) {
  return user
    ? http.post(barEndpoint, { _id: ingredientId })
    : { data: localStorage.setItem(barKey, JSON.stringify(bar)) };
}
function removeFromBar(user, ingredientId, bar) {
  return user
    ? http.delete(`${barEndpoint}${ingredientId}`)
    : { data: localStorage.setItem(barKey, JSON.stringify(bar)) };
}
export async function concatBar(bar) {}

export default {
  getAllCocktails,
  getCocktailById,
  getAllIngredients,
  getIngredientById,
  getIngredientsByCategory,
  getIngredientCocktails,
  getBar,
  addToBar,
  removeFromBar,
};
