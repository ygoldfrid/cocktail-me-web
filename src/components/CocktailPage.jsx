import React, { useEffect, useState } from "react";
import cocktailService from "../services/cocktailService";
import barService from "../services/barService";
import MainPage from "./common/MainPage";

function CocktailPage({ user, bar, match, ...rest }) {
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
          ? barService.replaceComponents(cocktail, barIds)
          : cocktail.components;

        const missing = barService.getMissingLength(components, barIds);
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
      bar={bar}
      type={"cocktail"}
      element={cocktail}
      ingredients={ingredients}
      missing={missing}
      onCheck={handleCheck}
      {...rest}
    />
  );
}

export default CocktailPage;
