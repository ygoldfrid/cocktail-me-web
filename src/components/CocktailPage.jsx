import React, { useEffect, useState } from "react";
import { getMissingLength, replaceComponents } from "./../services/barService";
import cocktailService from "../services/cocktailService";
import MainPage from "./common/MainPage";

function CocktailPage({ user, bar, onRemove, match, history }) {
  const [cocktail, setCocktail] = useState({});
  const [ingredients, setIngredients] = useState(null);
  const [missing, setMissing] = useState(0);
  const [useMyBar, setUseMyBar] = useState(false);
  const id = match.params.id;

  useEffect(() => {
    async function getData() {
      const { data: cocktail } = await cocktailService.getCocktailById(id);
      setCocktail(cocktail);

      if (bar) {
        const barIds = bar.map((ing) => ing._id);

        const components = useMyBar
          ? replaceComponents(cocktail, barIds)
          : cocktail.components;

        const missing = getMissingLength(components, barIds);
        setMissing(missing);

        setIngredients(components);
      }
    }

    getData();
  }, [id, user, bar, useMyBar]);

  const handleCheck = () => {
    setUseMyBar(!useMyBar);
  };

  return (
    <MainPage
      history={history}
      bar={bar}
      onRemove={onRemove}
      type={"cocktail"}
      element={cocktail}
      ingredients={ingredients}
      missing={missing}
      onCheck={handleCheck}
    />
  );
}

export default CocktailPage;
