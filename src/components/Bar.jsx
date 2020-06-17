import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import cocktailService from "../services/cocktailService";
import BottomBox from "./common/BottomBox";
import BarChoices from "./BarChoices";

class Bar extends Component {
  state = {
    spirits: [],
    liqueurs: [],
    mixers: [],
    others: [],
    bar: [],
  };

  barLimit = 20;

  componentDidMount = async () => {
    await this.getMenuIngredients();
    await this.getBarIngredients();
  };

  componentDidUpdate = async (prevProps) => {
    if (prevProps.user !== this.props.user) await this.getBarIngredients();
  };

  getMenuIngredients = async () => {
    const { data: spirits } = await cocktailService.getIngredientsByType(
      "Spirits"
    );
    const { data: liqueurs } = await cocktailService.getIngredientsByType(
      "Liqueurs"
    );
    const { data: mixers } = await cocktailService.getIngredientsByType(
      "Mixers"
    );
    const { data: others } = await cocktailService.getIngredientsByType(
      "Others"
    );
    this.setState({ spirits, liqueurs, mixers, others });
  };

  getBarIngredients = async () => {
    const { data: bar } = await cocktailService.getBar(this.props.user);
    if (bar) this.setState({ bar });
  };

  handleSelect = async (item) => {
    const { bar } = this.state;
    const { user } = this.props;

    if (!user && bar.length >= this.barLimit)
      return toast.info(
        `Log In to add more than ${this.barLimit} items to your Bar`
      );

    if (bar.some((ing) => ing._id === item._id))
      return toast(`You already have ${item.name} in you bar`);

    const barItem = {
      _id: item._id,
      name: item.name,
      image: item.image,
      alternatives: item.alternatives,
    };
    bar.push(barItem);
    await cocktailService.addToBar(user, bar, item._id);

    this.setState({ bar });
  };

  handleRemove = async (item) => {
    const { bar } = this.state;

    const index = bar.indexOf(item);
    bar.splice(index, 1);

    await cocktailService.removeFromToBar(this.props.user, bar, item._id);

    this.setState({ bar });
  };

  getSubtitle = () => {
    return !this.props.user && this.state.bar.length === this.barLimit ? (
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
        <BarChoices
          spirits={spirits}
          liqueurs={liqueurs}
          mixers={mixers}
          others={others}
          onSelect={this.handleSelect}
        />
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
            to={{ pathname: "/search", state: true }}
          >
            Cocktail Me!
          </Link>
        </div>
      </div>
    );
  }
}

export default Bar;
