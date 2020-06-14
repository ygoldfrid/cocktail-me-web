import React, { Component } from "react";
import Cookies from "universal-cookie";
import { Form } from "react-bootstrap";
import cocktailService from "../services/cocktailService";
import CocktailList from "./common/CocktailList";
import SearchBox from "./common/SearchBox";
import ListGroup from "./common/ListGroup";

class Search extends Component {
  state = {
    cocktails: [],
    spirits: [],
    selectedSpirit: null,
    searchQuery: "",
  };

  cookies = new Cookies();

  async componentDidMount() {
    const { state } = this.props.location;
    await this.getSpirits();
    await this.getCocktails(state);
    this.getChecked(state);
  }

  getSpirits = async () => {
    const { data: ingredients } = await cocktailService.getAllIngredients();
    const spirits = [
      { _id: "", name: "All of them!" },
      ...ingredients.filter((ing) => ing.type === "Spirits"),
    ];
    this.setState({ spirits });
  };

  getCocktails = async (bar) => {
    let { data: cocktails } = await cocktailService.getAllCocktails();

    if (bar) {
      cocktails = cocktails.filter((cocktail) => {
        cocktail.missing = 0;
        const size = cocktail.components.length;

        const match = cocktail.components.filter((component) =>
          bar.includes(component.ingredient._id)
        ).length;

        cocktail.missing = size - match;
        if (cocktail.missing < 4) return true;
        return false;
      });
    }

    cocktails.sort((x, y) => {
      return x.missing - y.missing;
    });

    this.setState({ cocktails });
  };

  handleSpiritSelect = (spirit) => {
    this.setState({
      selectedSpirit: spirit,
      searchQuery: "",
    });
  };

  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      selectedSpirit: null,
    });
  };

  handleCheck = (checkbox) => {
    let bar = null;
    if (checkbox.checked) bar = this.cookies.get("bar").map((ing) => ing._id);
    this.getCocktails(bar);
  };

  getChecked = (state) => {
    if (state) document.getElementById("checkbox").checked = true;
  };

  getData = () => {
    const { cocktails, searchQuery, selectedSpirit } = this.state;
    if (searchQuery)
      return cocktails.filter((cocktail) =>
        cocktail.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    else if (selectedSpirit && selectedSpirit._id)
      return cocktails.filter((cocktail) =>
        cocktail.components.some(
          (component) => component.ingredient._id === selectedSpirit._id
        )
      );
    return cocktails;
  };

  render() {
    const { spirits, searchQuery, selectedSpirit } = this.state;
    const filtered = this.getData();
    return (
      <div className="row">
        <div className="col-2">
          <Form.Check
            className="box mb-2 pl-4"
            id="checkbox"
            type="checkbox"
            label="Use ingredients from My Bar"
            onChange={({ currentTarget }) => this.handleCheck(currentTarget)}
          />
          <ListGroup
            title="Spirits"
            items={spirits}
            selectedItem={selectedSpirit}
            onItemSelect={this.handleSpiritSelect}
          />
        </div>
        <div className="col">
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <div className="row">
            <CocktailList cocktails={filtered} history={this.props.history} />
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
