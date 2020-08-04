import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Tour from "reactour";

function AppTourMobile({
  exec,
  setDisableBodyScrollSteps,
  tour_funcs,
  tour_ids,
  ...rest
}) {
  const history = useHistory();

  useEffect(() => {
    setDisableBodyScrollSteps([
      3,
      10,
      11,
      12,
      14,
      15,
      20,
      23,
      26,
      27,
      28,
      30,
      31,
      33,
    ]);
  }, [setDisableBodyScrollSteps]);

  const steps = [
    {
      // Step 1
      action: () => history.push("/home"),
      content: () => (
        <div className="p-2">
          <h5>
            <b>Welcome!</b>
          </h5>
          <p>
            With <b>Cocktail Me!</b> you can add everything you have in your
            kitchen to{" "}
            <b>
              <i className="fa fa-glass" /> My Bar
            </b>{" "}
            and find out which <b>Cocktails</b> you can make. Are you ready?
          </p>
        </div>
      ),
    },
    {
      // Step 2
      action: (node) => {
        history.push("/home");
        if (node)
          node.onclick = () => {
            const nextBtn = document.getElementById("next-btn");
            if (nextBtn) nextBtn.click();
          };
      },
      selector: ".market",
      content: (
        <div className="p-2">
          <p>
            First let's go to the <b>Market</b>.
          </p>
          <p>
            <b>
              Click on the <i className="fa fa-shopping-basket" /> icon.
            </b>
          </p>
        </div>
      ),
    },
    {
      // Step 3
      action: () => history.push("/market"),
      content: (
        <div className="p-2">
          <p>
            This is the{" "}
            <b>
              <i className="fa fa-shopping-basket" /> Market
            </b>
            .
          </p>
          <p>
            Here we can add all the ingredients we want to{" "}
            <b>
              <i className="fa fa-glass" /> My Bar
            </b>
            .
          </p>
        </div>
      ),
    },
    {
      // Step 4
      action: (node) => {
        history.push("/market");
        if (node)
          node.onclick = () => {
            const nextBtn = document.getElementById("next-btn");
            if (nextBtn) nextBtn.click();
          };
      },
      selector: `[tour_id="market-${tour_ids.white_rum}"]`,
      content: (
        <div className="p-2">
          <p>
            Let's add <b>White Rum</b>.
          </p>
          <p>
            Click on <b>Add to My Bar</b>.
          </p>
        </div>
      ),
    },
    {
      // Step 5
      action: (node) => {
        history.push("/market");
        exec(tour_funcs.add_ingredient, { ingredientId: tour_ids.white_rum });
        if (node)
          node.onclick = () => {
            const nextBtn = document.getElementById("next-btn");
            if (nextBtn) nextBtn.click();
          };
      },
      selector: ".mybar",
      content: (
        <div className="p-2">
          <p>
            Great! Now let's check out <b>My Bar</b>.
          </p>
          <b>
            Click on the <i className="fa fa-glass" /> icon.
          </b>
        </div>
      ),
    },
    {
      // Step 6
      action: () => history.push("/mybar"),
      stepInteraction: false,
      content: (
        <div className="p-2">
          <p>
            This is{" "}
            <b>
              <i className="fa fa-glass" /> My Bar
            </b>
            .
          </p>
          <p>
            Here we can see all the <b>Ingredients</b> you have. As you can see{" "}
            <b>White Rum</b> was just added.
          </p>
        </div>
      ),
    },
    {
      // Step 7
      action: () => history.push("/mybar"),
      content: (
        <div className="p-2">
          <p>
            We need at least 3 ingredients in{" "}
            <b>
              <i className="fa fa-glass" /> My Bar
            </b>{" "}
            for the algorithm to work.
          </p>
          <p>We'll do that for you.</p>
        </div>
      ),
    },
    {
      // Step 8
      action: () => {
        history.push("/mybar");
        exec(tour_funcs.add_ingredient, { ingredientId: tour_ids.white_rum });
        exec(tour_funcs.add_ingredient, {
          ingredientId: tour_ids.lime_juice,
        });

        exec(tour_funcs.add_ingredient, { ingredientId: tour_ids.cola });
      },
      stepInteraction: false,
      selector: ".nav",
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
      //Step 9
      action: (node) => {
        history.push("/mybar");
        if (node)
          node.onclick = () => {
            const nextBtn = document.getElementById("next-btn");
            if (nextBtn) nextBtn.click();
          };
      },
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
      //Step 10
      action: () => history.push({ pathname: "/home", state: true }),
      content: (
        <div className="p-2">
          <p>
            Done! We have calculated all the <b>Cocktails</b> you can make with
            the <b>Ingredients</b> you have.
          </p>
        </div>
      ),
    },
    {
      //Step 11
      action: () => history.push({ pathname: "/home", state: true }),
      selector: `[tour_id="missing-${tour_ids.daiquiri}"]`,
      position: "top",
      stepInteraction: false,
      content: (
        <div className="p-2">
          <p>
            Here you can see how many ingredients you are <b>Missing</b>.
          </p>
        </div>
      ),
    },
    {
      //Step 12
      action: (node) => {
        history.push({ pathname: "/home", state: true });
        if (node)
          node.onclick = () => {
            const nextBtn = document.getElementById("next-btn");
            if (nextBtn) nextBtn.click();
          };
      },
      selector: `[id="${tour_ids.cuba_libre}"]`,
      content: (
        <div className="p-2">
          <p>Let's check out how to make a Cuba Libre.</p>
          <p>
            <b>Click on it!</b>
          </p>
        </div>
      ),
    },
    {
      //Step 13
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
      //Step 14
      action: () => history.push(`/cocktails/${tour_ids.cuba_libre}`),
      selector: ".ingredients",
      position: "bottom",
      stepInteraction: false,
      content: (
        <div className="p-2">
          <p>
            Here you can see the <b>Ingredients</b> of your favorite cocktails.
          </p>
        </div>
      ),
    },
    {
      //Step 15
      action: () => {
        history.push(`/cocktails/${tour_ids.cuba_libre}`);
      },
      selector: ".mybar",
      content: (
        <div className="p-2">
          <p>
            Let's go back to{" "}
            <b>
              <i className="fa fa-glass" /> My Bar
            </b>{" "}
            and make some changes.
          </p>
        </div>
      ),
    },
    {
      // Step 16
      action: () => history.push("/mybar"),
      content: (
        <div className="p-2">
          <p>
            Let's say you don't have <b>Lime Juice</b>, let's go delete it from{" "}
            <b>
              <i className="fa fa-glass" /> My Bar
            </b>
            .
          </p>
        </div>
      ),
    },
    {
      // Step 17
      action: (node) => {
        history.push("/mybar");
        if (node)
          node.onclick = () => {
            const nextBtn = document.getElementById("next-btn");
            if (nextBtn) nextBtn.click();
          };
      },
      selector: ".nav",
      content: (
        <div className="p-2">
          <p>
            Click on the{" "}
            <b>
              <i className="fa fa-trash-o" />
            </b>{" "}
            next to the <b>Lime Juice</b>
          </p>
        </div>
      ),
    },
    {
      //Step 18
      action: () => {
        history.push(`/cocktails/${tour_ids.cuba_libre}`);
        exec(tour_funcs.remove_ingredient, {
          ingredientId: tour_ids.lime_juice,
        });
      },
      content: (
        <div className="p-2">
          <p>
            Great! Now back at <b>Cuba Libre</b>.
          </p>
        </div>
      ),
    },
    {
      //Step 19
      action: () => {
        history.push(`/cocktails/${tour_ids.cuba_libre}`);
      },
      selector: ".ingredients",
      position: "bottom",
      stepInteraction: false,
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
      //Step 20
      action: (node) => {
        history.push(`/cocktails/${tour_ids.cuba_libre}`);
        if (node)
          node.onclick = () => {
            const nextBtn = document.getElementById("next-btn");
            if (nextBtn) nextBtn.click();
          };
      },
      selector: ".market",
      content: (
        <div className="p-2">
          <p>
            Let's go back to the{" "}
            <b>
              <i className="fa fa-shopping-basket" /> Market
            </b>{" "}
            and see something different.
          </p>
        </div>
      ),
    },
    {
      //Step 21
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
      //Step 22
      action: (node) => {
        history.push("/market");
        if (node)
          node.onclick = () => {
            const nextBtn = document.getElementById("next-btn");
            if (nextBtn) nextBtn.click();
          };
      },
      selector: `[tour_id="market-${tour_ids.lemon}"]`,
      content: (
        <div className="p-2">
          <p>
            Let's add it to{" "}
            <b>
              <i className="fa fa-glass" /> My Bar
            </b>
            .
          </p>
        </div>
      ),
    },
    {
      //Step 23
      action: () => {
        history.push(`/cocktails/${tour_ids.cuba_libre}`);
        exec(tour_funcs.add_ingredient, { ingredientId: tour_ids.lemon });
      },
      content: (
        <div className="p-2">
          <p>
            Great! Now back at <b>Cuba Libre</b> let's see what happened.
          </p>
        </div>
      ),
    },
    {
      //Step 24
      action: () => history.push(`/cocktails/${tour_ids.cuba_libre}`),
      selector: ".ingredients",
      position: "bottom",
      stepInteraction: false,
      content: (
        <div className="p-2">
          <p>
            As you can see <b>Lime Juice</b> has been replaced by <b>Lemon</b>.
          </p>
        </div>
      ),
    },
    {
      //Step 25
      action: () => history.push(`/cocktails/${tour_ids.cuba_libre}`),
      selector: ".form-check",
      position: "top",
      content: (
        <div className="p-2">
          <p>
            When you have <b>Alternatives</b> you will see this <b>Checkbox</b>.
          </p>
          <p>
            <b>Try it out!</b>
          </p>
        </div>
      ),
    },
    {
      //Step 26
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
      //Step 27
      action: () => history.push({ pathname: "/home", state: true }),
      selector: ".form-check",
      content: (
        <div className="p-2">
          <p>
            Here you can choose to use the ingredients from{" "}
            <b>
              <i className="fa fa-glass" /> My Bar
            </b>{" "}
            or not.
          </p>
          <p>
            <b>Try it out!</b>
          </p>
        </div>
      ),
    },
    {
      //Step 28
      action: () => history.push({ pathname: "/home", state: true }),
      selector: ".tour",
      stepInteraction: false,
      content: (
        <div className="p-2">
          <p>
            That's the end of our <b>Tour</b>! If you want to take it again at
            any time just click in the{" "}
            <b>
              <i className="fa fa-superpowers" />
            </b>{" "}
            icon.
          </p>
          <p>
            <b>Happy Drinking!</b>
          </p>
        </div>
      ),
    },
  ];

  return <Tour steps={steps} {...rest} />;
}

export default AppTourMobile;
