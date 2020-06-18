import React, { useEffect, useState } from "react";
import cocktailService from "../services/cocktailService";
import MainPage from "./common/MainPage";
import { getFullBar, getMissingLength } from "./../utils/bar";

function CocktailPage({ user, match, history }) {
  const [cocktail, setCocktail] = useState({});
  const [ingredients, setIngredients] = useState(null);
  const [missing, setMissing] = useState(0);
  const id = match.params.id;

  useEffect(() => {
    async function getData() {
      const { data: cocktail } = await cocktailService.getCocktailById(id);
      setCocktail(cocktail);
      setIngredients(cocktail.components);

      const { data: bar } = await cocktailService.getBar(user);
      const fullBar = getFullBar(bar);
      const missing = getMissingLength(cocktail, fullBar);
      setMissing(missing);
    }

    getData();
  }, [id, user]);

  return (
    <MainPage
      type="cocktail"
      element={cocktail}
      missing={missing}
      items={ingredients}
      history={history}
    />
  );
}

export default CocktailPage;
