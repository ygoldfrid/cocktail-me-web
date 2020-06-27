import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import cocktailService from "./services/cocktailService";
import barService from "./services/barService";
import auth from "./services/authService";
import IngredientPage from "./components/IngredientPage";
import CocktailPage from "./components/CocktailPage";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import Profile from "./components/Profile";
import NavBar from "./components/Navbar";
import Logout from "./components/Logout";
import MyBar from "./components/MyBar";
import Home from "./components/Home";
import Items from "./components/Items";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount = async () => {
    await this.getMainData();
  };

  getMainData = async () => {
    const user = auth.getCurrentUser();
    const bar = await cocktailService.getBar(user);
    this.setState({ user, bar });
  };

  handleAddRemoveItem = async (ingredient, isInMyBar = true) => {
    const { user } = this.state;
    const bar = [...this.state.bar];
    if (isInMyBar) await barService.removeFromBar(user, ingredient, bar);
    else await barService.addToBar(user, ingredient, bar);
    this.setState({ bar });
  };

  render() {
    const { user, bar } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} bar={bar} />
        <div className="container-fluid">
          <main role="main">
            <Switch>
              <Route path="/register" component={RegisterPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/logout" component={Logout} />
              <Route
                path="/profile"
                render={(props) => <Profile {...props} user={user} />}
              />
              <Route
                path="/cocktails/:id"
                render={(props) => (
                  <CocktailPage
                    {...props}
                    user={user}
                    bar={bar}
                    onAddRemove={this.handleAddRemoveItem}
                  />
                )}
              />
              <Route
                path="/ingredients/:id"
                render={(props) => (
                  <IngredientPage
                    {...props}
                    user={user}
                    bar={bar}
                    onAddRemove={this.handleAddRemoveItem}
                  />
                )}
              />
              <Route
                path="/items"
                render={(props) => (
                  <Items
                    {...props}
                    user={user}
                    bar={bar}
                    onAddRemove={this.handleAddRemoveItem}
                  />
                )}
              />
              <Route
                path="/mybar"
                render={(props) => (
                  <MyBar
                    {...props}
                    user={user}
                    bar={bar}
                    onAddRemove={this.handleAddRemoveItem}
                  />
                )}
              />
              <Route
                path="/home"
                render={(props) => (
                  <Home
                    {...props}
                    user={user}
                    bar={bar}
                    onAddRemove={this.handleAddRemoveItem}
                  />
                )}
              />
              <Redirect from="/" exact to="/home" />
            </Switch>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
