import React, { useEffect, useState } from "react";
import cocktailService from "../services/cocktailService";
import MainPage from "./common/MainPage";
import { addToBar, removeFromBar } from "../services/barService";

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

  const handleClick = async () => {
    const { data: bar } = await cocktailService.getBar(user);

    if (isInMyBar) removeFromBar(user, bar, ingredient);
    else await addToBar(user, bar, ingredient);

    setIsInMyBar(!isInMyBar);
  };

  return (
    <MainPage
      type="ingredient"
      items={cocktails}
      history={history}
      element={ingredient}
      isInMyBar={isInMyBar}
      onClick={handleClick}
    />
  );
}

export default IngredientPage;
