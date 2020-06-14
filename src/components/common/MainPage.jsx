import React, { Fragment } from "react";
import BottomBox from "./BottomBox";
import Thumbnail from "./Thumbnail";

function MainPage({ type, element, items, history }) {
  const getPrimaryBoxContent = () => {
    if (type === "cocktail")
      return (
        <Fragment>
          <h1>{element.name}</h1>
          <h5>Ingredients:</h5>
          <div className="d-flex flex-row">
            {items &&
              items.map((item) => (
                <div key={item._id} className="p-2">
                  <Thumbnail
                    type="ingredients"
                    element={item.ingredient}
                    caption={`(${item.quantity} ${item.ingredient.measure})`}
                    history={history}
                  />
                </div>
              ))}
          </div>
        </Fragment>
      );
    if (type === "ingredient") return <h1>{element.name}</h1>;
  };

  const getSecondaryBoxContent = () => {
    if (type === "cocktail")
      return <BottomBox title="Recipe" body={element.recipe} />;
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
            className="rounded float-left"
            src={element.image}
            alt={element.name}
            height="300"
            width="300"
          />
        </div>
        <div className="col box primary-box">{getPrimaryBoxContent()}</div>
      </div>
      <div className="secondary-box text-justify">
        {getSecondaryBoxContent()}
      </div>
    </Fragment>
  );
}

export default MainPage;
