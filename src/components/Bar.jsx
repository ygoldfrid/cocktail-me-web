import React, { Component, Fragment } from "react";
import cocktailService from "../services/cocktailService";
import IngredientCategory from "./IngredientCategory";
import SideBar from "./SideBar";

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
    const { bar, onAddRemove, history } = this.props;

    return (
      <Fragment>
        <SideBar bar={bar} onAddRemove={onAddRemove} history={history} />
        <div className="categories col-md-9 mr-sm-auto col-lg-10 px-md-4">
          <IngredientCategory
            bar={bar}
            title={"Spirits"}
            items={spirits}
            onAddRemove={onAddRemove}
            history={history}
          />
          <IngredientCategory
            bar={bar}
            title={"Liqueurs, Wines & Beers"}
            items={liqueurs}
            onAddRemove={onAddRemove}
            history={history}
          />
          <IngredientCategory
            bar={bar}
            title={"Mixers"}
            items={mixers}
            onAddRemove={onAddRemove}
            history={history}
          />
          <IngredientCategory
            bar={bar}
            title={"Others"}
            items={others}
            onAddRemove={onAddRemove}
            history={history}
          />
        </div>
      </Fragment>
    );
  }
}

export default Bar;
