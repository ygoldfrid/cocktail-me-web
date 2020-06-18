import React, { Fragment } from "react";
import BottomBox from "./BottomBox";
import TopBox from "./TopBox";

function MainPage({ type, element, items, history, isInMyBar }) {
  const getPrimaryBoxContent = () => {
    if (type === "cocktail")
      return (
        <TopBox
          title={element.name}
          subtitle="Ingredients:"
          items={items}
          showCaption={true}
          history={history}
        />
      );

    if (type === "ingredient") {
      const pills = (
        <Fragment>
          {isInMyBar && (
            <span className="badge badge-pill badge-success">In My Bar</span>
          )}
          {!isInMyBar && (
            <span className="badge badge-pill badge-danger">Not in My Bar</span>
          )}
          <span className="badge badge-pill badge-primary mb-3 ml-1">
            {element.category}
          </span>
        </Fragment>
      );
      const showIngredients =
        element.alternatives && element.alternatives.length > 0;
      return (
        <TopBox
          title={element.name}
          pills={pills}
          subtitle={
            showIngredients
              ? `You can replace it with:`
              : "There are no replacements for this ingredient. It's one of a kind!"
          }
          showIngredients={showIngredients}
          items={element.alternatives}
          showCaption={false}
          history={history}
        />
      );
    }
  };

  const getSecondaryBoxContent = () => {
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
        <div className="col box primary-box mb-1">{getPrimaryBoxContent()}</div>
      </div>
      <div className="box secondary-box text-justify px-4">
        {getSecondaryBoxContent()}
      </div>
    </Fragment>
  );
}

export default MainPage;
