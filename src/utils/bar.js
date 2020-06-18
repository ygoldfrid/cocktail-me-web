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
