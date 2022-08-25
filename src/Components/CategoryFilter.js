import PropTypes from 'prop-types';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import Context from '../Context/Context';
import { fetchCategories, fetchDatabyCategories } from '../Services/fetchApi';
import './CategoryFilter.css';

function CategoryFilter({ pageName }) {
  const { setApiData } = useContext(Context);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const categoriesNum = 5;

  const requestCategories = useCallback(async () => {
    const selectedType = pageName === 'foods' ? 'meals' : 'drinks';
    const categories = await fetchCategories(pageName);
    setCategoryFilters(categories[selectedType].splice(0, categoriesNum));
  }, [pageName]);

  useEffect(() => {
    requestCategories();
  }, [pageName, requestCategories]);

  const onClick = (filter) => {
    if (filter === 'All') {
      const filterByAll = async () => {
        const titleAPI = pageName === 'foods' ? 'foods' : 'drinks';
        const result = await fetchDatabyCategories(
          '',
          'name',
          titleAPI,
        );
        setApiData(result[titleAPI === 'foods' ? 'meals' : titleAPI]);
      };
      filterByAll();
    } else {
      const filterByCategory = async () => {
        const titleAPI = pageName === 'foods' ? 'foods' : 'drinks';
        const result = await fetchDatabyCategories(
          filter,
          'category',
          titleAPI,
        );
        setApiData(result[titleAPI === 'foods' ? 'meals' : titleAPI]);
      };
      filterByCategory();
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
