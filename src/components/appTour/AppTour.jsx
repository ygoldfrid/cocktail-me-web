import React, { useContext, useState } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import Media from "react-media";

import AppTourDesktop from "./AppTourDesktop";
import AppTourMobile from "./AppTourMobile";
import BarContext from "../../contexts/barContext";
import barService from "../../services/barService";
import cocktailService from "../../services/cocktailService";
import useTour from "../../contexts/useTour";

function AppTour() {
  const { bar, addOrRemoveItem } = useContext(BarContext);
  const { isTourOpen, closeTour } = useTour();

  const [tourComponent, setTourComponent] = useState();
  const [disableBodyScrollSteps, setDisableBodyScrollSteps] = useState([]);

  const handleCurrentStep = (curr) => {
    if (disableBodyScrollSteps.includes(curr)) disableBodyScroll(tourComponent);
    else enableBodyScroll(tourComponent);
  };

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

  return (
    <Media
      queries={{
        mobile: "(max-width: 767px)",
        desktop: "(min-width: 768px)",
      }}
    >
      {(matches) => (
        <>
          {matches.mobile && (
            <AppTourMobile
              accentColor="#155724"
              closeWithMask={false}
              exec={exec}
              getCurrentStep={handleCurrentStep}
              isOpen={isTourOpen}
              lastStepNextButton={
                <button className="btn-cocktailme">Finish Tour</button>
              }
              nextButton={
                <i id="next-btn" className="fa fa-arrow-right fa-2x" />
              }
              onAfterOpen={setTourComponent}
              onBeforeClose={enableBodyScroll}
              onRequestClose={closeTour}
              prevButton={
                <i id="prev-btn" className="fa fa-arrow-left fa-2x" />
              }
              rounded={5}
              setDisableBodyScrollSteps={setDisableBodyScrollSteps}
              showNavigation={false}
              startAt={0}
              tour_funcs={tour_funcs}
              tour_ids={tour_ids}
            />
          )}
          {matches.desktop && (
            <AppTourDesktop
              accentColor="#155724"
              closeWithMask={false}
              exec={exec}
              getCurrentStep={handleCurrentStep}
              isOpen={isTourOpen}
              lastStepNextButton={
                <button className="btn-cocktailme">Finish Tour</button>
              }
              nextButton={
                <i id="next-btn" className="fa fa-arrow-right fa-2x" />
              }
              onAfterOpen={setTourComponent}
              onBeforeClose={enableBodyScroll}
              onRequestClose={closeTour}
              prevButton={
                <i id="prev-btn" className="fa fa-arrow-left fa-2x" />
              }
              rounded={5}
              setDisableBodyScrollSteps={setDisableBodyScrollSteps}
              showNavigation={false}
              startAt={0}
              tour_funcs={tour_funcs}
              tour_ids={tour_ids}
            />
          )}
        </>
      )}
    </Media>
  );
}

const tour_ids = {
  cola: "5eecfb641e34422b4039dbaf",
  cuba_libre: "5eecfb641e34422b4039dbdc",
  daiquiri: "5eecfb641e34422b4039dc17",
  lemon: "5eecfb641e34422b4039dbbe",
  lime_juice: "5eecfb641e34422b4039dbb4",
  white_rum: "5eecfb641e34422b4039dba3",
};

const tour_funcs = {
  add_ingredient: "Add Ingredient",
  remove_ingredient: "Remove Ingredient",
};

export default AppTour;
