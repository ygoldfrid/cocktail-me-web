import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/Navbar";
import Bar from "./components/Bar";
import Search from "./components/Search";
import CocktailPage from "./components/CocktailPage";
import IngredientPage from "./components/IngredientPage";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  document.title = process.env.REACT_APP_NAME;
  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar />
      <main role="main" className="container">
        <Switch>
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

export default App;
