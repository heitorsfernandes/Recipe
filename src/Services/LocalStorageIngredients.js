const LocalStorageIngredients = (drink, object) => {
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

export default LocalStorageIngredients;
// função responsável por inserir e/ou pegar informações do local storage.
