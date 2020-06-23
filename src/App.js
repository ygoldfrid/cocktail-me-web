import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/Navbar";
import Bar from "./components/Bar";
import Home from "./components/Home";
import CocktailPage from "./components/CocktailPage";
import IngredientPage from "./components/IngredientPage";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import Logout from "./components/Logout";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import cocktailService from "./services/cocktailService";
import { removeFromBar, addToBar } from "./services/barService";
import Profile from "./components/Profile";

class App extends Component {
  state = {};

  componentDidMount = async () => {
    this.setAppTitle();
    await this.getMainData();
  };

  setAppTitle = () => {
    document.title = process.env.REACT_APP_NAME;
  };

  getMainData = async () => {
    const user = auth.getCurrentUser();
    const bar = await cocktailService.getBar(user);
    this.setState({ user, bar });
  };

  handleAddRemoveItem = async (ingredient, isInMyBar = true) => {
    const { user, bar } = this.state;
    if (isInMyBar) await removeFromBar(user, ingredient, bar);
    else await addToBar(user, ingredient, bar);
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
                path="/bar"
                render={(props) => (
                  <Bar
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
