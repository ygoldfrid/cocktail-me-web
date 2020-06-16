import React, { Component } from "react";
import Cookies from "universal-cookie";
import { Form } from "react-bootstrap";
import cocktailService from "../services/cocktailService";
import CocktailList from "./CocktailList";
import SearchBox from "./common/SearchBox";
import ListGroup from "./common/ListGroup";
import Pagination from "./common/Pagination";
import { paginate } from "./../utils/paginate";

class Search extends Component {
  state = {
    cocktails: [],
    spirits: [],
    selectedSpirit: null,
    searchQuery: "",
    currentPage: 1,
    pageSize: 6,
  };

  cookies = new Cookies();

  async componentDidMount() {
    const { state } = this.props.location;
    await this.getSpirits();
    await this.getCocktails(state, this.state.currentPage);
    this.setChecked(state);
  }

  getSpirits = async () => {
    const { data: ingredients } = await cocktailService.getAllIngredients();
    const spirits = [
      { _id: "", name: "All of them!" },
      ...ingredients.filter((ing) => ing.type === "Spirits"),
    ];
    this.setState({ spirits });
  };

  getCocktails = async (bar, page) => {
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

  getBarFromCookies = () => {
    return this.cookies.get("bar").map((ing) => ing._id);
  };

  handleSpiritSelect = (spirit) => {
    this.setState({
      selectedSpirit: spirit,
      searchQuery: "",
      currentPage: 1,
    });
  };

  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      selectedSpirit: null,
      currentPage: 1,
    });
  };

  handleCheck = (checkbox) => {
    const bar = checkbox.checked ? this.getBarFromCookies() : null;
    this.getCocktails(bar, this.state.currentPage);
  };

  handlePageChange = (page) => {
    if (page === "previous") page = this.state.currentPage - 1;
    if (page === "next") page = this.state.currentPage + 1;

    const bar = this.getChecked() ? this.getBarFromCookies() : null;
    this.getCocktails(bar, page);

    this.setState({ currentPage: page });
  };

  getChecked = () => {
    return document.getElementById("checkbox").checked;
  };

  setChecked = (state) => {
    if (state) document.getElementById("checkbox").checked = true;
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      searchQuery,
      selectedSpirit,
      cocktails: allCocktails,
    } = this.state;

    let filtered = allCocktails;
    if (searchQuery)
      filtered = allCocktails.filter((cocktail) =>
        cocktail.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    else if (selectedSpirit && selectedSpirit._id)
      filtered = allCocktails.filter((cocktail) =>
        cocktail.components.some(
          (component) => component.ingredient._id === selectedSpirit._id
        )
      );

    const pagedCocktails = paginate(filtered, currentPage, pageSize);

    return { totalCount: filtered.length, pagedCocktails };
  };

  render() {
    const {
      pageSize,
      currentPage,
      spirits,
      selectedSpirit,
      searchQuery,
    } = this.state;

    const { totalCount, pagedCocktails } = this.getPagedData();

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
          <p className="mb-2">
            Showing {pagedCocktails.length} out of {totalCount} results
          </p>
          <CocktailList
            cocktails={pagedCocktails}
            history={this.props.history}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Search;
