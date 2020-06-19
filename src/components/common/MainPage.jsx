import React, { Fragment } from "react";
import BottomBox from "./BottomBox";
import TopBox from "./TopBox";

function MainPage({
  type,
  items,
  missing,
  element,
  history,
  onClick,
  isInMyBar,
  onCheckChange,
}) {
  const getTopBoxContent = () => {
    if (type === "cocktail") {
      return (
        <TopBox
          type={type}
          items={items}
          missing={missing}
          history={history}
          showCaption={true}
          title={element.name}
          showAlternatives={true}
          onCheckChange={onCheckChange}
        />
      );
    }

    if (type === "ingredient") {
      const showIngredients =
        element.alternatives && element.alternatives.length > 0;

      return (
        <TopBox
          type={type}
          history={history}
          element={element}
          onClick={onClick}
          showCaption={false}
          title={element.name}
          isInMyBar={isInMyBar}
          items={element.alternatives}
          showIngredients={showIngredients}
          subtitle={
            showIngredients
              ? `You can replace it with:`
              : "There are no replacements for this ingredient. It's one of a kind!"
          }
        />
      );
    }
  };

  const getBottomBoxContent = () => {
    if (type === "cocktail")
      return <BottomBox title="Preparation" body={element.preparation} />;

    if (type === "ingredient")
      return (
        <BottomBox
          type="cocktails"
          title={`Cocktails you can make with ${element.name}`}
          items={items}
          history={history}
        />
      );
  };

  return (
    <Fragment>
      <div className="row mb-4">
        <div className="col-sm-12 col-md-6 col-lg-4">
          <img
            className="rounded mb-1 mr-1"
            src={element.image}
            alt={element.name}
            height="300"
            width="300"
          />
        </div>
        <div className="col box primary-box mb-1">{getTopBoxContent()}</div>
      </div>
      <div className="box secondary-box text-justify px-4">
        {getBottomBoxContent()}
      </div>
    </Fragment>
  );
}

export default MainPage;
