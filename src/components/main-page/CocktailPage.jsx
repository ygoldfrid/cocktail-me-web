import React, { useEffect, useState, useContext } from "react";

import BarContext from "../../contexts/barContext";
import barService from "../../services/barService";
import cocktailService from "../../services/cocktailService";
import MainPage from "./MainPage";

function CocktailPage({ match }) {
  const { bar, useMyBar } = useContext(BarContext);

  const [areThereAlternatives, setAreThereAlternatives] = useState(false);
  const [cocktail, setCocktail] = useState({});
  const [components, setComponents] = useState(null);
  const [missingCount, setMissingCount] = useState(0);
  const id = match.params.id;

  useEffect(() => {
    async function getData() {
      const { data: cocktail } = await cocktailService.getCocktailById(id);
      setCocktail(cocktail);

      if (bar) {
        const barIds = bar.map((ing) => ing._id);

        const replaced = barService.replaceComponents(cocktail, barIds);

        const loadedComponents = useMyBar
          ? replaced.replacedComponents
          : cocktail.components;

        const missing = barService.getMissingCount(loadedComponents, barIds);
        setMissingCount(missing);

        setAreThereAlternatives(replaced.areThereAlternatives);
        setComponents(loadedComponents);
      }
    }

    getData();
  }, [id, bar, useMyBar]);

  return (
    <MainPage
      areThereAlternatives={areThereAlternatives}
      element={cocktail}
      components={components}
      missingCount={missingCount}
      type={"cocktail"}
    />
  );
}

export default CocktailPage;
