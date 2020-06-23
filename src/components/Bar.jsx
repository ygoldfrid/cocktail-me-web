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

  handleClick = async (ingredient, isInMyBar = true) => {
    const { onAdd, onRemove } = this.props;
    if (isInMyBar) await onRemove(ingredient);
    else await onAdd(ingredient);
  };

  render() {
    const { spirits, liqueurs, mixers, others } = this.state;
    const { bar, onRemove, history } = this.props;

    return (
      <Fragment>
        <SideBar bar={bar} onRemove={onRemove} history={history} />
        <div className="categories col-md-9 mr-sm-auto col-lg-10 px-md-4">
          <IngredientCategory
            bar={bar}
            title={"Spirits"}
            items={spirits}
            onClick={this.handleClick}
            history={history}
          />
          <IngredientCategory
            bar={bar}
            title={"Liqueurs, Wines & Beers"}
            items={liqueurs}
            onClick={this.handleClick}
            history={history}
          />
          <IngredientCategory
            bar={bar}
            title={"Mixers"}
            items={mixers}
            onClick={this.handleClick}
            history={history}
          />
          <IngredientCategory
            bar={bar}
            title={"Others"}
            items={others}
            onClick={this.handleClick}
            history={history}
          />
        </div>
      </Fragment>
    );
  }
}

export default Bar;
