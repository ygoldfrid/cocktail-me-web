import React, { useEffect, useState } from "react";
import cocktailService from "../services/cocktailService";
import MainPage from "./common/MainPage";

function CocktailPage({ match, history }) {
  const [ingredient, setIngredient] = useState({});
  const [cocktails, setCocktails] = useState(null);
  const id = match.params.id;

  useEffect(() => {
    //Getting Ingredients
    async function getIngredient() {
      const { data: ingredient } = await cocktailService.getIngredientById(id);
      setIngredient(ingredient);
    }

    //Getting Cocktails
    async function getCocktails() {
      const { data: cocktails } = await cocktailService.getIngredientCocktails(
        id
      );
      setCocktails(cocktails);
    }

    getIngredient();
    getCocktails();
  }, [id]);

  return (
    <MainPage
      type="ingredient"
      element={ingredient}
      items={cocktails}
      history={history}
    />
  );
}

export default CocktailPage;
