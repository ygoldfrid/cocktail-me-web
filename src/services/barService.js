import { toast } from "react-toastify";
import cocktailService from "./cocktailService";

export const barLimit = 20;

export async function addToBar(user, bar, ingredient) {
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

  bar.push(barItem);
  await cocktailService.addToBar(user, bar, ingredient._id);

  return true;
}

export async function removeFromBar(user, bar, ingredient) {
  const barIds = bar.map((ing) => ing._id);
  const index = barIds.indexOf(ingredient._id);

  bar.splice(index, 1);

  await cocktailService.removeFromBar(user, bar, ingredient._id);
}

export function getFullBar(bar) {
  const fullBar = [];

  for (let ing of bar) {
    fullBar.push(ing._id);

    for (let alt of ing.alternatives)
      if (!fullBar.includes(alt)) fullBar.push(alt);
  }

  return fullBar;
}

export function getMissingLength(components, barIds) {
  const size = components.length;

  const match = components.filter((component) => {
    if (barIds.includes(component.ingredient._id)) {
      return true;
    }
    component.missing = true;
    return false;
  }).length;

  return size - match;
}

export function replaceComponents(cocktail, bar) {
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
