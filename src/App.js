import React, { useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AuthContext from "./contexts/authContext";
import BarContext from "./contexts/barContext";

import auth from "./services/authService";
import barService from "./services/barService";
import cocktailService from "./services/cocktailService";

import IngredientPage from "./components/IngredientPage";
import CocktailPage from "./components/CocktailPage";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import Profile from "./components/Profile";
import NavBar from "./components/Navbar";
import MyBar from "./components/MyBar";
import Home from "./components/Home";
import Market from "./components/Market";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export default function App() {
  const [user, setUser] = useState();
  const [bar, setBar] = useState();

  useEffect(() => {
    getMainData();
  }, []);

  const getMainData = async () => {
    const user = auth.getCurrentUser();
    const bar = await cocktailService.getBar(user);
    setUser(user);
    setBar(bar);
  };

  const addOrRemoveItem = async (ingredient, isInMyBar = true) => {
    const barCopy = [...bar];
    if (isInMyBar) await barService.removeFromBar(user, ingredient, barCopy);
    else await barService.addToBar(user, ingredient, barCopy);
    setBar(barCopy);
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <BarContext.Provider value={{ bar, addOrRemoveItem }}>
        <ToastContainer />
        <NavBar />
        <div className="container-fluid">
          <main role="main">
            <Switch>
              <Route path="/register" component={RegisterPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/profile" component={Profile} />
              <Route path="/cocktails/:id" component={CocktailPage} />
              <Route path="/ingredients/:id" component={IngredientPage} />
              <Route path="/market" component={Market} />
              <Route path="/mybar" component={MyBar} />
              <Route path="/home" component={Home} />
              <Redirect from="/" exact to="/home" />
            </Switch>
          </main>
        </div>
      </BarContext.Provider>
    </AuthContext.Provider>
  );
}
