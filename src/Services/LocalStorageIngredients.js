// eslint-disable-next-line import/prefer-default-export
export const localStorageIngredients = (drink, object) => {
  if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
    return localStorage.setItem('inProgressRecipes',
      JSON.stringify({ cocktails: {}, meals: {} }));
  }
  const readRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (drink) {
    const drinkIngredients = { ...readRecipes, cocktails: { ...object } };
    return localStorage.setItem('inProgressRecipes',
      JSON.stringify(drinkIngredients));
  }
  const mealsIngredients = { ...readRecipes, meals: { ...object } };
  return localStorage.setItem('inProgressRecipes',
    JSON.stringify(mealsIngredients));
};
