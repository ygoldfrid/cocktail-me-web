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

    if (!bar.includes(item)) {
      bar.push(item);

      this.setState({ bar });
      this.cookies.set("bar", bar, {
        expires: moment().add(30, "days").toDate(),
      });
    } else {
      toast(`You already have ${item.name} in you bar`);
    }
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
