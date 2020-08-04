import React from "react";
import Tour from "reactour";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

import BarContext from "../contexts/barContext";
import barService from "../services/barService";
import cocktailService from "../services/cocktailService";
import useTour from "../contexts/useTour";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

function AppTour() {
  const history = useHistory();
  const { bar, addOrRemoveItem } = useContext(BarContext);
  const { isTourOpen, closeTour } = useTour();

  const disableBody = (target) => disableBodyScroll(target);
  const enableBody = (target) => enableBodyScroll(target);

  const addIngredient = async ({ ingredientId }) => {
    if (!barService.isInMyBar(ingredientId, bar)) {
      const { data: ingredient } = await cocktailService.getIngredientById(
        ingredientId
      );

      await addOrRemoveItem(ingredient, false);
    }
  };

  const removeIngredient = async ({ ingredientId }) => {
    if (barService.isInMyBar(ingredientId, bar)) {
      const { data: ingredient } = await cocktailService.getIngredientById(
        ingredientId
      );

      await addOrRemoveItem(ingredient, true);
    }
  };

  const exec = (func, params) => {
    if (func === tour_funcs.add_ingredient) addIngredient(params);
    if (func === tour_funcs.remove_ingredient) removeIngredient(params);
  };

  const steps = [
    {
      action: () => history.push("/home"),
      content: () => (
        <div className="p-2">
          <h5>
            <b>Welcome to Cocktail Me!</b>
          </h5>
          <p>
            With <b>Cocktail Me!</b> you can add everything you have in your
            kitchen to <b>My Bar</b> and find out which <b>Cocktails</b> you can
            make. Are you ready?
          </p>
          <p className="mt-2 small">
            (you can move with the keyboard arrows too)
          </p>
        </div>
      ),
    },
    {
      action: () => history.push("/home"),
      selector: ".market",
      content: (
        <div className="p-2">
          <p>
            First let's go to the <b>Market</b>
          </p>
        </div>
      ),
    },
    {
      action: () => history.push("/market"),
      content: (
        <div className="p-2">
          <p>
            This is the <b>Market</b> page. Here we can add all the ingredients
            we want to <b>My Bar</b>.
          </p>
        </div>
      ),
    },
    {
      action: () => history.push("/market"),
      position: "top",
      selector: `[tour_id="market-${tour_ids.white_rum}"]`,
      content: (
        <div className="p-2">
          <p>
            We'll start with <b>White Rum</b>.
          </p>
          <p>
            Click on <b>Add to My Bar</b>.
          </p>
        </div>
      ),
    },
    {
      action: () => {
        history.push("/market");
        exec(tour_funcs.add_ingredient, { ingredientId: tour_ids.white_rum });
      },
      selector: ".flex-column",
      content: (
        <div className="p-2">
          <p>
            Here we can check all the ingredients that we've added to{" "}
            <b>My Bar</b>.
          </p>
          <p>
            As you can see <b>White Rum</b> was just added.
          </p>
        </div>
      ),
    },
    {
      action: () => history.push("/market"),
      content: (
        <div className="p-2">
          <p>
            We need at least 3 ingredients in <b>My Bar</b> for the algorithm to
            work.
          </p>
          <p>We'll do that for you.</p>
        </div>
      ),
    },
    {
      action: () => {
        history.push("/market");
        exec(tour_funcs.add_ingredient, { ingredientId: tour_ids.white_rum });
        exec(tour_funcs.add_ingredient, {
          ingredientId: tour_ids.lime_juice,
        });

        exec(tour_funcs.add_ingredient, { ingredientId: tour_ids.cola });
      },
      selector: ".flex-column",
      content: (
        <div className="p-2">
          <p>
            We have added <b>Lime Juice</b> and <b>Cola</b>. We hope you like
            them!
          </p>
        </div>
      ),
    },
    {
      action: () => history.push("/market"),
      selector: ".btn-cocktailme",
      content: (
        <div className="p-2">
          <p>Now let the magic begin!</p>
          <p>
            Click on the <b>Cocktail Me!</b> button.
          </p>
        </div>
      ),
    },
    {
      action: () => history.push({ pathname: "/home", state: true }),
      content: (
        <div className="p-2">
          <p>
            These are all the <b>Cocktails</b> you can make with the{" "}
            <b>Ingredients</b> you have.
          </p>
        </div>
      ),
    },
    {
      action: () => history.push({ pathname: "/home", state: true }),
      selector: `[tour_id="missing-${tour_ids.daiquiri}"]`,
      position: "right",
      content: (
        <div className="p-2">
          <p>
            Here you can see how many ingredients you are <b>Missing</b>
          </p>
        </div>
      ),
    },
    {
      action: () => history.push({ pathname: "/home", state: true }),
      selector: `[tour_id="missing-${tour_ids.cuba_libre}"]`,
      position: "right",
      content: (
        <div className="p-2">
          <p>Or if you have all you need</p>
        </div>
      ),
    },
    {
      action: () => history.push({ pathname: "/home", state: true }),
      selector: `[id="${tour_ids.cuba_libre}"]`,
      position: "right",
      content: (
        <div className="p-2">
          <p>
            Let's check out how to make a <b>Cuba Libre</b>.
          </p>
        </div>
      ),
    },
    {
      action: () => history.push(`/cocktails/${tour_ids.cuba_libre}`),
      content: (
        <div className="p-2">
          <p>
            This is the <b>Cocktail</b> page.
          </p>
        </div>
      ),
    },
    {
      action: () => history.push(`/cocktails/${tour_ids.cuba_libre}`),
      selector: ".ingredients",
      content: (
        <div className="p-2">
          <p>
            Here we can see the <b>Ingredients</b> of our favorite cocktails.
          </p>
        </div>
      ),
    },
    {
      action: () => history.push(`/cocktails/${tour_ids.cuba_libre}`),
      selector: ".bottom-box",
      content: (
        <div className="p-2">
          <p>
            As well as the <b>Preparation</b>.
          </p>
        </div>
      ),
    },
    {
      action: () => history.push(`/cocktails/${tour_ids.cuba_libre}`),
      selector: ".flex-column",
      content: (
        <div className="p-2">
          <p>
            Let's say you don't have <b>Lime Juice</b>, because let's be honest
            that's kind of hard to find.
          </p>
          <p>
            Click on the{" "}
            <b>
              <i className="fa fa-trash-o" />
            </b>{" "}
            icon next to the <b>Lime Juice</b>
          </p>
        </div>
      ),
    },
    {
      action: () => {
        history.push(`/cocktails/${tour_ids.cuba_libre}`);
        exec(tour_funcs.remove_ingredient, {
          ingredientId: tour_ids.lime_juice,
        });
      },
      selector: ".ingredients",
      content: (
        <div className="p-2">
          <p>
            As you can see the <b>Lime Juice</b> has immediately{" "}
            <b>grayed out</b> from the ingredient list.
          </p>
        </div>
      ),
    },
    {
      action: () => history.push(`/cocktails/${tour_ids.cuba_libre}`),
      selector: ".market",
      content: (
        <div className="p-2">
          <p>
            Let's go back to the <b>Market</b> and see something different.
          </p>
        </div>
      ),
    },
    {
      action: () => history.push("/market"),
      content: (
        <div className="p-2">
          <p>
            Let's say we have <b>Lemon</b> instead of <b>Lime Juice</b>.
          </p>
        </div>
      ),
    },
    {
      action: () => history.push("/market"),
      selector: `[tour_id="market-${tour_ids.lemon}"]`,
      content: (
        <div className="p-2">
          <p>
            Let's add it to <b>My Bar</b>.
          </p>
        </div>
      ),
    },
    {
      action: () => {
        history.push("/market");
        exec(tour_funcs.add_ingredient, { ingredientId: tour_ids.lemon });
      },
      selector: ".btn-cocktailme",
      content: (
        <div className="p-2">
          <p>
            And now <b>Cocktail Me!</b> one more time.
          </p>
        </div>
      ),
    },
    {
      action: () => history.push({ pathname: "/home", state: true }),
      content: (
        <div className="p-2">
          <p>We see the same results! Why?</p>
        </div>
      ),
    },
    {
      action: () => history.push(`/cocktails/${tour_ids.cuba_libre}`),
      content: (
        <div className="p-2">
          <p>
            Let's go back to <b>Cuba Libre</b> and see what happened.
          </p>
        </div>
      ),
    },
    {
      action: () => history.push(`/cocktails/${tour_ids.cuba_libre}`),
      selector: ".ingredients",
      content: (
        <div className="p-2">
          <p>
            As you can see <b>Lime Juice</b> has been replaced by <b>Lemon</b>.
          </p>
        </div>
      ),
    },
    {
      action: () => history.push(`/cocktails/${tour_ids.cuba_libre}`),
      selector: ".form-check",
      position: "left",
      content: (
        <div className="p-2">
          <p>
            When you have <b>Alternatives</b> for ingredients, you will see this{" "}
            <b>Checkbox</b>. You can toggle between the original ingredients and
            the ones you have.
          </p>
          <p>
            <b>Try it out!</b>
          </p>
        </div>
      ),
    },
    {
      action: () => history.push(`/cocktails/${tour_ids.cuba_libre}`),
      selector: `[tour_id="figure-${tour_ids.white_rum}"]`,
      content: (
        <div className="p-2">
          <p>
            We can also check out any <b>Ingredient</b>. Let's go with{" "}
            <b>White Rum</b>.
          </p>
        </div>
      ),
    },
    {
      action: () => history.push(`/ingredients/${tour_ids.white_rum}`),
      content: (
        <div className="p-2">
          <p>
            This is the <b>Ingredient</b> page.
          </p>
        </div>
      ),
    },
    {
      action: () => history.push(`/ingredients/${tour_ids.white_rum}`),
      selector: ".alternatives",
      content: (
        <div className="p-2">
          <p>
            You can see all the <b>Alternatives</b> there are.
          </p>
        </div>
      ),
    },
    {
      action: () => history.push(`/ingredients/${tour_ids.white_rum}`),
      selector: ".bottom-box",
      content: (
        <div className="p-2">
          <p>
            And all the <b>Cocktails</b> you can make with it.
          </p>
        </div>
      ),
    },
    {
      action: () => history.push({ pathname: "/home", state: true }),
      content: (
        <div className="p-2">
          <p>
            One last thing before we finish. Back at the <b>Home</b> page.
          </p>
        </div>
      ),
    },
    {
      action: () => history.push({ pathname: "/home", state: true }),
      selector: ".form-check",
      content: (
        <div className="p-2">
          <p>
            Here you can choose to use the ingredients from <b>My Bar</b> or
            not.
          </p>
          <p>
            <b>Try it out!</b>
          </p>
        </div>
      ),
    },
    {
      action: () => history.push({ pathname: "/home", state: true }),
      selector: ".tour",
      content: (
        <div className="p-2">
          <p>
            That's the end of our <b>Tour</b>! If you want to take it again at
            any time just click here.
          </p>
          <p>
            <b>Happy Drinking!</b>
          </p>
        </div>
      ),
    },
  ];

  return (
    <Tour
      startAt={0}
      steps={steps}
      isOpen={isTourOpen}
      onRequestClose={closeTour}
      rounded={5}
      accentColor="#155724"
      onAfterOpen={disableBody}
      onBeforeClose={enableBody}
      lastStepNextButton={<button className="btn-cocktailme">Finish</button>}
    />
  );
}

const tour_ids = {
  white_rum: "5eecfb641e34422b4039dba3",
  lime_juice: "5eecfb641e34422b4039dbb4",
  cola: "5eecfb641e34422b4039dbaf",
  cuba_libre: "5eecfb641e34422b4039dbdc",
  daiquiri: "5eecfb641e34422b4039dc17",
  lemon: "5eecfb641e34422b4039dbbe",
};

const tour_funcs = {
  add_ingredient: "Add Ingredient",
  remove_ingredient: "Remove Ingredient",
};

export default AppTour;
