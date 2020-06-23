import React, { useEffect, useState } from "react";
import cocktailService from "../services/cocktailService";
import MainPage from "./common/MainPage";

function IngredientPage({ user, bar, match, ...rest }) {
  const [ingredient, setIngredient] = useState({});
  const [cocktails, setCocktails] = useState(null);
  const id = match.params.id;

  useEffect(() => {
    async function getData() {
      const { data: ingredient } = await cocktailService.getIngredientById(id);
      const { data: cocktails } = await cocktailService.getIngredientCocktails(
        id
      );

      setIngredient(ingredient);
      setCocktails(cocktails);
    }

    getData();
  }, [id, user, bar]);

  return (
    <MainPage
      bar={bar}
      type={"ingredient"}
      element={ingredient}
      cocktails={cocktails}
      {...rest}
    />
  );
}

export default IngredientPage;
