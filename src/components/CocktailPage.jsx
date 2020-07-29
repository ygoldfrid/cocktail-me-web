import React, { useEffect, useState, useContext } from "react";

import BarContext from "../contexts/barContext";
import barService from "../services/barService";
import cocktailService from "../services/cocktailService";
import MainPage from "./common/MainPage";

function CocktailPage({ match }) {
  const { bar } = useContext(BarContext);

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
  }, [id, bar, useMyBar]);

  const handleCheck = () => {
    setUseMyBar(!useMyBar);
  };

  return (
    <MainPage
      element={cocktail}
      ingredients={ingredients}
      missing={missing}
      onCheck={handleCheck}
      type={"cocktail"}
    />
  );
}

export default CocktailPage;
