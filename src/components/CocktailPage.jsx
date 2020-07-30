import React, { useEffect, useState, useContext } from "react";

import BarContext from "../contexts/barContext";
import barService from "../services/barService";
import cocktailService from "../services/cocktailService";
import MainPage from "./common/MainPage";

function CocktailPage({ match }) {
  const { bar, setUseMyBar, useMyBar } = useContext(BarContext);

  const [areThereAlternatives, setAreThereAlternatives] = useState(false);
  const [cocktail, setCocktail] = useState({});
  const [ingredients, setIngredients] = useState(null);
  const [missingCount, setMissingCount] = useState(0);
  const id = match.params.id;

  useEffect(() => {
    async function getData() {
      const { data: cocktail } = await cocktailService.getCocktailById(id);
      setCocktail(cocktail);

      if (bar) {
        const barIds = bar.map((ing) => ing._id);

        const replaced = barService.replaceComponents(cocktail, barIds);

        const components = useMyBar
          ? replaced.replacedComponents
          : cocktail.components;

        const missing = barService.getMissingCount(components, barIds);
        setMissingCount(missing);

        setAreThereAlternatives(replaced.areThereAlternatives);
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
      areThereAlternatives={areThereAlternatives}
      element={cocktail}
      ingredients={ingredients}
      missingCount={missingCount}
      onCheck={handleCheck}
      type={"cocktail"}
    />
  );
}

export default CocktailPage;
