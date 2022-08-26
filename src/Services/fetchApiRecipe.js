// eslint-disable-next-line import/prefer-default-export
export const recipeAPI = async (idRecipe) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idRecipe}`;
  const response = await fetch(URL);
  const result = await response.json();
  return result;
};

export const drinkAPI = async (idRecipe) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`;
  const response = await fetch(URL);
  const result = await response.json();
  return result;
};
