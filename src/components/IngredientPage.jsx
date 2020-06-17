import React, { useEffect, useState } from "react";
import cocktailService from "../services/cocktailService";
import MainPage from "./common/MainPage";

function IngredientPage({ user, match, history }) {
  const [ingredient, setIngredient] = useState({});
  const [cocktails, setCocktails] = useState(null);
  const [isInMyBar, setIsInMyBar] = useState(false);
  const id = match.params.id;

  useEffect(() => {
    //Getting Ingredients
    async function getIngredient() {
      const { data: ingredient } = await cocktailService.getIngredientById(id);
      setIngredient(ingredient);

      const { data: bar } = await cocktailService.getBar(user);
      setIsInMyBar(bar.some((ing) => ing._id === ingredient._id));
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
  }, [id, user]);

  return (
    <MainPage
      type="ingredient"
      element={ingredient}
      items={cocktails}
      isInMyBar={isInMyBar}
      history={history}
    />
  );
}

export default IngredientPage;
