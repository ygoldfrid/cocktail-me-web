import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import moment from "moment";
import cocktailService from "../services/cocktailService";
import BottomBox from "./common/BottomBox";
import BarChoices from "./BarChoices";

class Bar extends Component {
  state = {
    spirits: [],
    mixers: [],
    others: [],
    bar: [],
  };

  cookies = new Cookies();
  barLimit = 20;

  componentDidMount = () => {
    this.getMenuIngredients();
    this.getCookieIngredients();
  };

  getMenuIngredients = async () => {
    const { data: spirits } = await cocktailService.getIngredientsByType(
      "Spirits"
    );
    const { data: mixers } = await cocktailService.getIngredientsByType(
      "Mixers"
    );
    const { data: others } = await cocktailService.getIngredientsByType(
      "Others"
    );
    this.setState({ spirits, mixers, others });
  };

  getCookieIngredients = () => {
    const bar = this.cookies.get("bar");
    if (bar) this.setState({ bar });
  };

  handleSelect = (item) => {
    const { bar } = this.state;

    if (bar.length >= this.barLimit)
      return toast.info(
        `Log In to add more than ${this.barLimit} items to your Bar`
      );

    if (bar.some((ing) => ing._id === item._id))
      return toast(`You already have ${item.name} in you bar`);

    const barItem = { ...item };
    delete barItem.type;
    delete barItem.measure;
    delete barItem.__v;
    bar.push(barItem);

    this.setState({ bar });
    this.cookies.set("bar", bar, {
      expires: moment().add(30, "days").toDate(),
    });
  };

  handleRemove = (item) => {
    const { bar } = this.state;

    const index = bar.indexOf(item);
    bar.splice(index, 1);

    this.setState({ bar });
    this.cookies.set("bar", bar, {
      expires: moment().add(30, "days").toDate(),
    });
  };

  getSubtitle = () => {
    return this.state.bar.length === this.barLimit ? (
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
    const { spirits, mixers, others, bar } = this.state;

    return (
      <div className="my-bar">
        <BarChoices
          spirits={spirits}
          mixers={mixers}
          others={others}
          onSelect={this.handleSelect}
        />
        <BottomBox
          type="ingredients"
          title="My Bar"
          subtitle={this.getSubtitle()}
          body="Start adding some ingredients to your bar!"
          items={bar}
          onRemove={this.handleRemove}
          history={this.props.history}
        />
        <div className="row justify-content-center m-3">
          <Link
            className="btn btn-bar"
            to={{
              pathname: "/search",
              state: bar.map((ing) => ing._id),
            }}
          >
            Cocktail Me!
          </Link>
        </div>
      </div>
    );
  }
}

export default Bar;
