import React, { useEffect, useState } from "react";
import cocktailService from "../services/cocktailService";
import MainPage from "./common/MainPage";

function CocktailPage({ match, history }) {
  const [cocktail, setCocktail] = useState({});
  const [ingredients, setIngredients] = useState(null);
  const id = match.params.id;

  useEffect(() => {
    //Getting Cocktails
    async function getCocktail() {
      const { data: cocktail } = await cocktailService.getCocktailById(id);
      setCocktail(cocktail);
    }

    //Getting Ingredients
    async function getIngredients() {
      const {
        data: ingredients,
      } = await cocktailService.getCocktailIngredients(id);
      setIngredients(ingredients);
    }

    getCocktail();
    getIngredients();
  }, [id]);

  return (
    <MainPage
      type="cocktail"
      element={cocktail}
      items={ingredients}
      history={history}
    />
  );
}

export default CocktailPage;
