import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/Navbar";
import Bar from "./components/Bar";
import Search from "./components/Search";
import CocktailPage from "./components/CocktailPage";
import IngredientPage from "./components/IngredientPage";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    document.title = process.env.REACT_APP_NAME;
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main role="main" className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/cocktails/:id" component={CocktailPage} />
            <Route path="/ingredients/:id" component={IngredientPage} />
            <Route path="/search" component={Search} />
            <Route path="/bar" component={Bar} />
            <Redirect from="/" exact to="/bar" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
