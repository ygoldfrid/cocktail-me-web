import React, { Fragment, useEffect } from "react";
import cocktailService from "../services/cocktailService";
import SideBar from "./common/SideBar";
import IngredientCategory from "./IngredientCategory";
import Loader from "./common/Loader";
import { useState } from "react";

function Market() {
  const [spirits, setSpirits] = useState([]);
  const [liqueurs, setLiqueurs] = useState([]);
  const [mixers, setMixers] = useState([]);
  const [others, setOthers] = useState([]);

  useEffect(() => {
    getMenuIngredients();
  }, []);

  const getMenuIngredients = async () => {
    const { data: spirits } = await cocktailService.getIngredientsByCategory(
      "Spirits"
    );
    const { data: liqueurs } = await cocktailService.getIngredientsByCategory(
      "Liqueurs&Wines&Beers"
    );
    const { data: mixers } = await cocktailService.getIngredientsByCategory(
      "Mixers&Syrups"
    );
    const { data: others } = await cocktailService.getIngredientsByCategory(
      "Others"
    );
    setSpirits(spirits);
    setLiqueurs(liqueurs);
    setMixers(mixers);
    setOthers(others);
  };

  return (
    <Fragment>
      <SideBar />
      <div className="categories col-md-9 mr-sm-auto col-lg-10 px-md-4">
        <h3 className="text-center mb-4">Select some items for My Bar</h3>
        {(spirits.length === 0 ||
          liqueurs.length === 0 ||
          mixers.length === 0 ||
          others.length === 0) && <Loader text="Loading delicious items..." />}
        {spirits.length !== 0 &&
          liqueurs.length !== 0 &&
          mixers.length !== 0 &&
          others.length !== 0 && (
            <Fragment>
              <IngredientCategory title={"Spirits"} items={spirits} />
              <IngredientCategory
                title={"Liqueurs, Wines & Beers"}
                items={liqueurs}
              />
              <IngredientCategory title={"Mixers"} items={mixers} />
              <IngredientCategory title={"Others"} items={others} />
            </Fragment>
          )}
      </div>
    </Fragment>
  );
}

export default Market;
