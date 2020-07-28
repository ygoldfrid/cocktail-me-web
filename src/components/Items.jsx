import React, { Component, Fragment } from "react";
import cocktailService from "../services/cocktailService";
import SideBar from "./common/SideBar";
import IngredientCategory from "./IngredientCategory";
import Loader from "./common/Loader";

class Bar extends Component {
  state = {
    spirits: [],
    liqueurs: [],
    mixers: [],
    others: [],
  };

  componentDidMount = async () => {
    await this.getMenuIngredients();
  };

  getMenuIngredients = async () => {
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
    this.setState({ spirits, liqueurs, mixers, others });
  };

  render() {
    const { spirits, liqueurs, mixers, others } = this.state;
    const { ...rest } = this.props;

    return (
      <Fragment>
        <SideBar {...rest} />
        <div className="categories col-md-9 mr-sm-auto col-lg-10 px-md-4">
          <h3 className="text-center mb-4">Select some items for My Bar</h3>
          {(spirits.length === 0 ||
            liqueurs.length === 0 ||
            mixers.length === 0 ||
            others.length === 0) && (
            <Loader text="Loading delicious items..." />
          )}
          {spirits.length !== 0 &&
            liqueurs.length !== 0 &&
            mixers.length !== 0 &&
            others.length !== 0 && (
              <Fragment>
                <IngredientCategory
                  title={"Spirits"}
                  items={spirits}
                  {...rest}
                />
                <IngredientCategory
                  title={"Liqueurs, Wines & Beers"}
                  items={liqueurs}
                  {...rest}
                />
                <IngredientCategory title={"Mixers"} items={mixers} {...rest} />
                <IngredientCategory title={"Others"} items={others} {...rest} />
              </Fragment>
            )}
        </div>
      </Fragment>
    );
  }
}

export default Bar;
