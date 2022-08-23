const fetchApi = async (url, type, query) => {
  const response = await fetch(`https://www.${url}.com/api/json/v1/1/${type}=${query}`);
  const data = await response.json();
  return data;
};

const fetchData = (inputSearch, radioSearch, pageName) => {
  if (pageName === 'foods') {
    console.log(inputSearch);
    const url = 'themealdb';
    if (radioSearch === 'ingredient') {
      return fetchApi(url, 'filter.php?i', inputSearch);
    }
    if (radioSearch === 'name') {
      return fetchApi(url, 'search.php?s', inputSearch);
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
      return fetchApi(url, 'search.php?s', inputSearch);
    }
    if (radioSearch === 'first-letter') {
      return fetchApi(url, 'search.php?f', inputSearch);
    }
  }
};

export default fetchData;
