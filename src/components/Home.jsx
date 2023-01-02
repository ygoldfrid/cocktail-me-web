import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import Media from "react-media";

import BarContext from "../contexts/barContext";
import barService from "../services/barService";
import CocktailList from "./cocktails/CocktailList";
import cocktailService from "../services/cocktailService";
import FooterDesktop from "./footer/FooterDesktop";
import ListGroup from "./common/ListGroup";
import Loader from "./common/Loader";
import Pagination from "./common/Pagination";
import SearchBox from "./common/SearchBox";
import SideBar from "./bar/SideBar";
import { paginate } from "../utils/paginate";

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
      <>
        <SideBar onClick={this.handleClick} />
        <div className="row cocktails col-md-9 mr-sm-auto col-lg-10 px-md-4">
          <Media queries={{ desktop: "(min-width: 992px)" }}>
            {(matches) =>
              matches.desktop && (
                <ListGroup
                  title="Spirits"
                  items={spirits}
                  selectedItem={selectedSpirit}
                  onItemSelect={this.handleSpiritSelect}
                />
              )
            }
          </Media>

          <div className="col-10">
            <Media queries={{ mobile: "(max-width: 575px)" }}>
              {(matches) =>
                matches.mobile && (
                  <div
                    className="alert alert-warning alert-dismissible fade show pl-1 pb-1"
                    role="alert"
                  >
                    <p className="pl-2">Try the Mobile App</p>
                    <a href="https://play.google.com/store/apps/details?id=com.yanivgoldfrid.cocktailme">
                      <img
                        alt="Get it on Google Play"
                        src="https://play.google.com/intl/en_us/badges/images/generic/en-play-badge.png"
                        height="60"
                      />
                    </a>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="alert"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                )
              }
            </Media>

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
              <>
                <CocktailList cocktails={pagedCocktails} size="small" />
                <Pagination
                  itemsCount={totalCount}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={this.handlePageChange}
                />
              </>
            )}
            {allCocktails.length === 0 && (
              <Loader text="Loading delicious cocktails..." />
            )}
            {allCocktails.length !== 0 && pagedCocktails.length === 0 && (
              <p>Oops! No results found. Try removing some filters</p>
            )}
          </div>
          <FooterDesktop />
        </div>
      </>
    );
  }
}

Home.contextType = BarContext;

export default Home;
