import React, { Component, Fragment } from "react";
import { Form } from "react-bootstrap";
import Media from "react-media";
import { getFullBar, getMissingLength } from "../services/barService";
import cocktailService from "../services/cocktailService";
import { paginate } from "../utils/paginate";
import SearchBox from "./common/SearchBox";
import ListGroup from "./common/ListGroup";
import Pagination from "./common/Pagination";
import CocktailList from "./CocktailList";

class Home extends Component {
  state = {
    cocktails: [],
    spirits: [],
    selectedSpirit: null,
    searchQuery: "",
    currentPage: 1,
    pageSize: 6,
    barIsSelected: false,
  };

  async componentDidMount() {
    const { state: barIsSelected } = this.props.location;
    this.setChecked(barIsSelected);
    this.setState({ barIsSelected });

    await this.getSpirits();
    await this.refreshCocktails();
  }

  setChecked = (barIsSelected) => {
    document.getElementById("barIsSelected").checked = barIsSelected;
  };

  getSpirits = async () => {
    const { data: ingredients } = await cocktailService.getAllIngredients();
    const spirits = [
      { _id: "", name: "All of them!" },
      ...ingredients.filter((ing) => ing.category === "Spirits"),
    ];
    this.setState({ spirits });
  };

  getBar = async () => {
    const { data: bar } = await cocktailService.getBar(this.props.user);
    return getFullBar(bar);
  };

  refreshCocktails = async () => {
    let { data: cocktails } = await cocktailService.getAllCocktails();

    if (this.state.barIsSelected) {
      const bar = await this.getBar();

      cocktails = cocktails.filter((cocktail) => {
        cocktail.missing = getMissingLength(cocktail.components, bar);
        if (cocktail.missing < 4) return true;
        return false;
      });

      cocktails.sort((x, y) => x.missing - y.missing);
    }

    this.setState({ cocktails });
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

  handlePageChange = (page) => {
    if (page === "previous") page = this.state.currentPage - 1;
    if (page === "next") page = this.state.currentPage + 1;

    this.refreshCocktails();
    this.setState({ currentPage: page });
  };

  handleCheck = () => {
    this.refreshCocktails();
    this.setState({ barIsSelected: !this.state.barIsSelected, currentPage: 1 });
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
    else if (selectedSpirit && selectedSpirit._id) {
      filtered = allCocktails.filter((cocktail) =>
        cocktail.components.some(
          (component) =>
            component.ingredient._id === selectedSpirit._id ||
            component.ingredient._id === selectedSpirit.alternatives[0]
        )
      );
    }

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
          <Media
            queries={{
              mobile: "(max-width: 991px)",
              desktop: "(min-width: 992px)",
            }}
          >
            {(matches) => (
              <Fragment>
                {matches.desktop && (
                  <ListGroup
                    title="Spirits"
                    items={spirits}
                    selectedItem={selectedSpirit}
                    onItemSelect={this.handleSpiritSelect}
                  />
                )}
              </Fragment>
            )}
          </Media>
        </div>
        <div className="col">
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <Form.Check
            className="mb-3 pl-4"
            id="barIsSelected"
            type="checkbox"
            label="Use ingredients from My Bar"
            onChange={this.handleCheck}
          />
          {pagedCocktails.length > 0 && (
            <Fragment>
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
            </Fragment>
          )}
          {pagedCocktails.length === 0 && (
            <p>Oops! No results found. Try removing some filters</p>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
