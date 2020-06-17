import React, { useEffect, useState } from "react";
import cocktailService from "../services/cocktailService";
import MainPage from "./common/MainPage";

function CocktailPage({ match, history }) {
  const [cocktail, setCocktail] = useState({});
  const [ingredients, setIngredients] = useState(null);
  const id = match.params.id;

  useEffect(() => {
    async function getData() {
      const { data: cocktail } = await cocktailService.getCocktailById(id);
      setCocktail(cocktail);
      setIngredients(cocktail.components);
    }

    getData();
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
