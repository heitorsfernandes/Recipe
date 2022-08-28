import PropTypes from 'prop-types';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import Context from '../Context/Context';
import { fetchApi, fetchCategories, fetchDatabyCategories } from '../Services/fetchApi';
import './CategoryFilter.css';

function CategoryFilter({ pageName }) {
  const { setApiData } = useContext(Context);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [filters, setFilters] = useState('All');
  const categoriesNum = 5;

  const requestCategories = useCallback(async () => {
    const selectedType = pageName === 'foods' ? 'meals' : 'drinks';
    const categories = await fetchCategories(pageName);
    setCategoryFilters(categories[selectedType].slice(0, categoriesNum));
  }, [pageName]);

  useEffect(() => {
    requestCategories();
  }, [pageName, requestCategories]);

  const filterByAll = async () => {
    const titleAPI = pageName === 'foods' ? 'foods' : 'drinks';
    const data = await fetchApi(
      titleAPI === 'foods' ? 'themealdb' : 'thecocktaildb', 'search.php?s', '',
    ); setApiData(data[titleAPI === 'foods' ? 'meals' : 'drinks']);
  };

  const filterByCategory = async (filter) => {
    const titleAPI = pageName === 'foods' ? 'foods' : 'drinks';
    const result = await fetchDatabyCategories(filter, 'category', titleAPI);
    setApiData(result[titleAPI === 'foods' ? 'meals' : titleAPI]);
  };

  const onClick = async (filter) => {
    if (filter === 'All' || (filters === filter && filters !== 'All')) {
      filterByAll();
      setFilters('All');
    } else {
      filterByCategory(filter);
      setFilters(filter);
    }
  };

  return (
    <div className="categoryFilter">
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => onClick('All') }
      >
        All
      </button>
      {categoryFilters.map(({ strCategory }) => (
        <button
          key={ strCategory }
          type="button"
          data-testid={ `${strCategory}-category-filter` }
          onClick={ () => onClick(strCategory) }
        >
          { strCategory }
        </button>
      ))}
    </div>
  );
}

CategoryFilter.propTypes = {
  pageName: PropTypes.string.isRequired,
};

export default CategoryFilter;
