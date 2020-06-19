import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import cocktailService from "../services/cocktailService";
import BottomBox from "./common/BottomBox";
import BarChoices from "./BarChoices";
import BarChoicesMobile from "./BarChoicesMobile";
import { barLimit, addToBar, removeFromBar } from "../services/barService";
import Media from "react-media";

class Bar extends Component {
  state = {
    spirits: [],
    liqueurs: [],
    mixers: [],
    others: [],
    bar: [],
  };

  componentDidMount = async () => {
    await this.getMenuIngredients();
    await this.getBarIngredients();
  };

  componentDidUpdate = async (prevProps) => {
    if (prevProps.user !== this.props.user) await this.getBarIngredients();
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

  getBarIngredients = async () => {
    const { data: bar } = await cocktailService.getBar(this.props.user);
    if (bar) this.setState({ bar });
  };

  handleSelect = async (ingredient) => {
    const { bar } = this.state;
    const { user } = this.props;

    await addToBar(user, bar, ingredient);

    this.setState({ bar });
  };

  handleRemove = async (ingredient) => {
    const { bar } = this.state;

    removeFromBar(this.props.user, bar, ingredient);

    this.setState({ bar });
  };

  getSubtitle = () => {
    return !this.props.user && this.state.bar.length === barLimit ? (
      <p className="subtitle">
        You've reached the limit of items for anonymous users.{" "}
        <Link to="/login">
          <b>Log in</b>
        </Link>{" "}
        to add more!
      </p>
    ) : null;
  };

  render() {
    const { spirits, liqueurs, mixers, others, bar } = this.state;

    return (
      <div className="my-bar">
        <div className="row justify-content-center">
          <h1 className="mb-4">Select your ingredients</h1>
        </div>
        <Media
          queries={{
            mobile: "(max-width: 769px)",
            desktop: "(min-width: 770px)",
          }}
        >
          {(matches) => (
            <Fragment>
              {matches.mobile && (
                <BarChoicesMobile
                  spirits={spirits}
                  liqueurs={liqueurs}
                  mixers={mixers}
                  others={others}
                  onSelect={this.handleSelect}
                />
              )}
              {matches.desktop && (
                <BarChoices
                  spirits={spirits}
                  liqueurs={liqueurs}
                  mixers={mixers}
                  others={others}
                  onSelect={this.handleSelect}
                />
              )}
            </Fragment>
          )}
        </Media>
        <BottomBox
          type="ingredients"
          title="My Bar"
          subtitle={this.getSubtitle()}
          body={["Start adding some ingredients to your bar!"]}
          items={bar}
          onRemove={this.handleRemove}
          history={this.props.history}
        />
        <div className="row justify-content-center m-3">
          <Link
            className="btn btn-cocktailme"
            to={{ pathname: "/home", state: true }}
          >
            Cocktail Me!
          </Link>
        </div>
      </div>
    );
  }
}

export default Bar;
