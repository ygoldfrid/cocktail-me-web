export function getFullBar(bar) {
  const fullBar = [];
  for (let ing of bar) {
    fullBar.push(ing._id);
    for (let alt of ing.alternatives)
      if (!fullBar.includes(alt)) fullBar.push(alt);
  }
  return fullBar;
}

export function getMissingLength(cocktail, fullBar) {
  const size = cocktail.components.length;

  const match = cocktail.components.filter((component) =>
    fullBar.includes(component.ingredient._id)
  ).length;

  return size - match;
}
