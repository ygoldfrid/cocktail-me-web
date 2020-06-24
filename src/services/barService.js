import { toast } from "react-toastify";
import cocktailService from "./cocktailService";

const barLimit = 20;

async function addToBar(user, ingredient, bar) {
  if (bar.some((ing) => ing._id === ingredient._id)) {
    toast(`You already have ${ingredient.name} in you bar`);
    return false;
  }

  if (!user && bar.length >= barLimit) {
    toast.info(`Log In to add more than ${barLimit} items to your Bar`);
    return false;
  }

  const barItem = {
    _id: ingredient._id,
    name: ingredient.name,
    image: ingredient.image,
    alternatives: ingredient.alternatives,
  };

  bar.unshift(barItem);
  await cocktailService.addToBar(user, ingredient._id, bar);

  return true;
}

async function removeFromBar(user, ingredient, bar) {
  const barIds = bar.map((ing) => ing._id);
  const index = barIds.indexOf(ingredient._id);

  bar.splice(index, 1);

  await cocktailService.removeFromBar(user, ingredient._id, bar);
}

function getMissingLength(components, barIds) {
  const size = components.length;

  const match = components.filter((component) => {
    if (barIds.includes(component.ingredient._id)) return true;
    for (let alt of component.ingredient.alternatives)
      if (barIds.includes(alt)) return true;

    component.missing = true;
    return false;
  }).length;
  return size - match;
}

function replaceComponents(cocktail, bar) {
  return cocktail.components.map((component) => {
    if (bar.includes(component.ingredient._id)) return component;
    for (let alt of component.ingredient.alternatives)
      if (bar.includes(alt._id))
        return {
          _id: component._id,
          ingredient: { ...alt },
        };
    return component;
  });
}

export default {
  addToBar,
  removeFromBar,
  getMissingLength,
  replaceComponents,
};
