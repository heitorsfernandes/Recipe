export const fetchApi = async (url, type, query) => {
  const response = await fetch(`https://www.${url}.com/api/json/v1/1/${type}=${query}`);
  const data = await response.json();
  return data;
};

export const fetchData = (inputSearch, radioSearch, pageName) => {
  if (pageName === 'foods') {
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

export const fetchDatabyCategories = (inputSearch, radioSearch, pageName) => {
  if (pageName === 'foods') {
    const url = 'themealdb';
    if (radioSearch === 'category') {
      return fetchApi(url, 'filter.php?c', inputSearch);
    }
    if (radioSearch === 'name') {
      return fetchApi(url, 'search.php?s', inputSearch);
    }
  }
  if (pageName === 'drinks') {
    const url = 'thecocktaildb';
    if (radioSearch === 'category') {
      return fetchApi(url, 'filter.php?c', inputSearch);
    }
  }
};

export const fetchCategories = async (pageName) => {
  let result = '';
  if (pageName === 'foods') {
    result = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  } else {
    result = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  }
  const categories = await result.json();
  return categories;
};
