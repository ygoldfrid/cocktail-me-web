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

  const match = cocktail.components.filter((component) => {
    if (fullBar.includes(component.ingredient._id)) {
      return true;
    }
    component.missing = true;
    return false;
  }).length;

  return size - match;
}
