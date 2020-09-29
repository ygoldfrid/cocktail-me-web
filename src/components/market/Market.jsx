import React, { useEffect } from "react";

import cocktailService from "../../services/cocktailService";
import FooterDesktop from "../footer/FooterDesktop";
import MarketCategory from "./MarketCategory";
import Loader from "../common/Loader";
import SideBar from "../bar/SideBar";
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
    <>
      <SideBar />
      <div className="categories col-md-9 mr-sm-auto col-lg-10 px-md-4">
        <h3 className="text-center mb-4">Market</h3>
        {(spirits.length === 0 ||
          liqueurs.length === 0 ||
          mixers.length === 0 ||
          others.length === 0) && <Loader text="Loading delicious items..." />}
        {spirits.length !== 0 &&
          liqueurs.length !== 0 &&
          mixers.length !== 0 &&
          others.length !== 0 && (
            <>
              <MarketCategory title={"Spirits"} items={spirits} />
              <MarketCategory
                title={"Liqueurs, Wines & Beers"}
                items={liqueurs}
              />
              <MarketCategory title={"Mixers"} items={mixers} />
              <MarketCategory title={"Others"} items={others} />
            </>
          )}
        <FooterDesktop />
      </div>
    </>
  );
}

export default Market;
