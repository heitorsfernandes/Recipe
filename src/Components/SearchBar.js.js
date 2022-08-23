import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../Context/Context';
import fetchData from '../Services/fetchApi';

function SearchBar({ pageName }) {
  const history = useHistory();

  const {
    radioSearch,
    setRadioSearch,
    setInputSearch,
    inputSearch,
    setApiData,
  } = useContext(Context);

  const handleChange = ({ target }) => {
    setRadioSearch(target.id);
  };

  const handleClick = async () => {
    const titleAPI = pageName === 'foods' ? 'meals' : 'drinks';
    if (radioSearch && inputSearch) {
      if (radioSearch === 'first-letter' && inputSearch.length > 1) {
        setInputSearch('');
        return global.alert('Your search must have only 1 (one) character');
      }
      const getData = await fetchData(inputSearch, radioSearch, pageName);
      if (!getData[titleAPI]) {
        setInputSearch('');
        return global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      setApiData(getData[titleAPI]);
      if (getData[titleAPI].length === 1 && pageName === 'foods') {
        history.push(`/${pageName}/${getData[titleAPI][0].idMeal}`);
      }
      if (getData[titleAPI].length === 1 && pageName === 'drinks') {
        history.push(`/${pageName}/${getData[titleAPI][0].idDrink}`);
      }
    }
  };

  return (

    <div>
      <form>
        <p>
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            id="ingredient"
            name="searchOptions"
            onChange={ handleChange }
          />
          ingredient
          <input
            type="radio"
            data-testid="name-search-radio"
            id="name"
            name="searchOptions"
            onChange={ handleChange }
          />
          name
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            id="first-letter"
            name="searchOptions"
            onChange={ handleChange }
          />
          first-letter
        </p>
        <p>
          <input
            type="button"
            data-testid="exec-search-btn"
            value="Search"
            onClick={ handleClick }
          />
        </p>
      </form>
    </div>
  );
}

SearchBar.propTypes = {
  pageName: PropTypes.string.isRequired,
};

export default SearchBar;
