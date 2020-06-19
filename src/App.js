import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/Navbar";
import Bar from "./components/Bar";
import Home from "./components/Home";
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
            <Route
              path="/cocktails/:id"
              render={(props) => <CocktailPage {...props} user={user} />}
            />
            <Route
              path="/ingredients/:id"
              render={(props) => <IngredientPage {...props} user={user} />}
            />
            <Route
              path="/bar"
              render={(props) => <Bar {...props} user={user} />}
            />
            <Route
              path="/home"
              render={(props) => <Home {...props} user={user} />}
            />
            <Redirect from="/" exact to="/home" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
