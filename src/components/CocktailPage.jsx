import React, { useEffect, useState, Fragment } from "react";
import cocktailService from "../services/cocktailService";
import MainPage from "./common/MainPage";
import { getMissingLength, replaceComponents } from "./../utils/bar";

function CocktailPage({ user, match, history }) {
  const [cocktail, setCocktail] = useState({});
  const [ingredients, setIngredients] = useState(null);
  const [missing, setMissing] = useState(0);
  const [useMyBar, setUseMyBar] = useState(false);
  const id = match.params.id;

  useEffect(() => {
    async function getData() {
      const { data: cocktail } = await cocktailService.getCocktailById(id);
      setCocktail(cocktail);

      const { data } = await cocktailService.getBar(user);
      const barIds = data.map((ing) => ing._id);

      const components = useMyBar
        ? replaceComponents(cocktail, barIds)
        : cocktail.components;

      const missing = getMissingLength(components, barIds);
      setMissing(missing);

      setIngredients(components);
    }

    getData();
  }, [id, user, useMyBar]);

  const handleCheck = () => {
    setUseMyBar(!useMyBar);
  };

  return (
    <Fragment>
      <MainPage
        type="cocktail"
        element={cocktail}
        missing={missing}
        items={ingredients}
        onCheckChange={handleCheck}
        history={history}
      />
    </Fragment>
  );
}

export default CocktailPage;
