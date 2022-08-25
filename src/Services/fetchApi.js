export const fetchApi = async (url, type, query) => {
  const response = await fetch(`https://www.${url}.com/api/json/v1/1/${type}=${query}`);
  const data = await response.json();
  return data;
};

const searchS = 'search.php?s';

export const fetchData = (inputSearch, radioSearch, pageName) => {
  if (pageName === 'foods') {
    const url = 'themealdb';
    if (radioSearch === 'ingredient') {
      return fetchApi(url, 'filter.php?i', inputSearch);
    }
    if (radioSearch === 'name') {
      return fetchApi(url, searchS, inputSearch);
    }
    if (radioSearch === 'first-letter') {
      return fetchApi(url, 'search.php?f', inputSearch);
    }
  }
  if (pageName === 'drinks') {
    const url = 'thecocktaildb';
    if (radioSearch === 'ingredient') {
      return fetchApi(url, 'filter.php?i', inputSearch);
    }
    if (radioSearch === 'name') {
      return fetchApi(url, searchS, inputSearch);
    }
    if (radioSearch === 'first-letter') {
      return fetchApi(url, 'search.php?f', inputSearch);
    }
  }
};
