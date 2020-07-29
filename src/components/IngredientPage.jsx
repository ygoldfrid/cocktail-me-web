import React, { useEffect, useState, useContext } from "react";

import BarContext from "../contexts/barContext";
import cocktailService from "../services/cocktailService";
import MainPage from "./common/MainPage";

function IngredientPage({ match }) {
  const { bar } = useContext(BarContext);

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
  }, [id, bar]);

  return (
    <MainPage cocktails={cocktails} element={ingredient} type={"ingredient"} />
  );
}

export default IngredientPage;
