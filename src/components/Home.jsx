import React, { Component, Fragment } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import Media from "react-media";

import BarContext from "../contexts/barContext";

import cocktailService from "../services/cocktailService";
import barService from "../services/barService";

import { paginate } from "../utils/paginate";

import Pagination from "./common/Pagination";
import SearchBox from "./common/SearchBox";
import ListGroup from "./common/ListGroup";
import SideBar from "./common/SideBar";
import Loader from "./common/Loader";
import CocktailList from "./CocktailList";

class Home extends Component {
  state = {
    cocktails: [],
    spirits: [],
    selectedSpirit: null,
    searchQuery: "",
    currentPage: 1,
    pageSize: 6,
  };

  async componentDidMount() {
    this.setChecked(this.props.location.state);
    await this.getSpirits();
    await this.refreshCocktails();
  }

  setChecked = (useMyBar) => {
    const checkbox = document.getElementById("useMyBar");
    if (checkbox) {
      checkbox.checked = useMyBar;
      this.context.setUseMyBar(useMyBar);
    }
  };

  getSpirits = async () => {
    const { data: ingredients } = await cocktailService.getAllIngredients();
    const spirits = [
      { _id: "", name: "All Cocktails" },
      { _id: "fav", name: "Favorites" },
      ...ingredients.filter((ing) => ing.category === "Spirits"),
    ];
    this.setState({ spirits });
  };

  refreshCocktails = async () => {
    let { data: cocktails } = await cocktailService.getAllCocktails();

    if (this.context.bar.length > 0 && this.context.useMyBar) {
      const barIds = this.context.bar.map((ing) => ing._id);

      cocktails = cocktails.filter((cocktail) => {
        cocktail.missing = barService.getMissingCount(
          cocktail.components,
          barIds,
          this.context.useMyBar
        );
        if (cocktail.missing < 4) return true;
        return false;
      });

      cocktails.sort((x, y) => x.missing - y.missing);
    }

    this.setState({ cocktails });
  };

  handleSpiritSelect = (spirit) => {
    if (spirit._id === "fav" && !this.props.user) {
      toast.info("Login to use Favorites");
      this.props.history.push("/login");
    }

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
    this.setState({ currentPage: 1 });
    this.context.setUseMyBar(!this.context.useMyBar);
  };

  handleClick = () => {
    if (this.context.bar.length < 3)
      return toast.info(`You need at least 3 items in My Bar`);
    this.refreshCocktails();
    this.setChecked(true);
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
      if (selectedSpirit._id === "fav") filtered = this.props.favorites;
      else {
        filtered = allCocktails.filter((cocktail) =>
          cocktail.components.some(
            (component) =>
              component.ingredient._id === selectedSpirit._id ||
              component.ingredient._id === selectedSpirit.alternatives[0]
          )
        );
      }
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
      cocktails: allCocktails,
    } = this.state;

    let { totalCount, pagedCocktails } = this.getPagedData();

    return (
      <Fragment>
        <SideBar onClick={this.handleClick} />
        <div className="row cocktails col-md-9 mr-sm-auto col-lg-10 px-md-4">
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

          <div className="col">
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            {this.context.bar && this.context.bar.length >= 3 && (
              <Form.Check
                className="mb-3 pl-4"
                id="useMyBar"
                type="checkbox"
                label="Use ingredients from My Bar"
                onChange={this.handleCheck}
              />
            )}
            {pagedCocktails.length > 0 && (
              <Fragment>
                <CocktailList cocktails={pagedCocktails} size="small" />
                <Pagination
                  itemsCount={totalCount}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={this.handlePageChange}
                />
              </Fragment>
            )}
            {allCocktails.length === 0 && (
              <Loader text="Loading delicious cocktails..." />
            )}
            {allCocktails.length !== 0 && pagedCocktails.length === 0 && (
              <p>Oops! No results found. Try removing some filters</p>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

Home.contextType = BarContext;

export default Home;
