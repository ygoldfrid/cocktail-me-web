import React, { useEffect, useState } from "react";
import cocktailService from "../services/cocktailService";
import MainPage from "./common/MainPage";

function IngredientPage({ user, bar, onAdd, onRemove, match, history }) {
  const [ingredient, setIngredient] = useState({});
  const [cocktails, setCocktails] = useState(null);
  const [isInMyBar, setIsInMyBar] = useState(false);
  const id = match.params.id;

  useEffect(() => {
    async function getData() {
      const { data: ingredient } = await cocktailService.getIngredientById(id);
      const { data: cocktails } = await cocktailService.getIngredientCocktails(
        id
      );

      setIngredient(ingredient);
      setCocktails(cocktails);
      if (bar) setIsInMyBar(bar.some((ing) => ing._id === ingredient._id));
    }

    getData();
  }, [id, user, bar]);

  const handleClick = async () => {
    if (isInMyBar) {
      await onRemove(ingredient);
      setIsInMyBar(false);
    } else {
      const added = onAdd(ingredient);
      setIsInMyBar(added);
    }
  };

  return (
    <MainPage
      history={history}
      bar={bar}
      onRemove={onRemove}
      type={"ingredient"}
      element={ingredient}
      cocktails={cocktails}
      onClick={handleClick}
    />
  );
}

export default IngredientPage;
