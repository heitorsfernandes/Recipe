import React, { useContext, useEffect } from 'react';
import CategoryFilter from '../Components/CategoryFilter';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import SearchBar from '../Components/SearchBar.js';
import SearchCards from '../Components/SearchCards';
import Context from '../Context/Context';
import { fetchApi } from '../Services/fetchApi';
import './Recipes.css';

function Recipes() {
  const { setApiData } = useContext(Context);
  // const mealsCategories = ['Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat'];
  useEffect(() => {
    const newFetch = async () => {
      const data = await fetchApi('themealdb', 'search.php?s', '');
      setApiData(data.meals);
    };

    newFetch();
  }, [setApiData]);

  return (
    <main>
      <Header pageName="Foods" />
      <SearchBar pageName="foods" />
      <CategoryFilter pageName="foods" />
      {/* <div>
        <button type="button" data-testid="All-category-filter">All</button>
        {mealsCategories.map((category) => (
          <button
            key={ category }
            type="button"
            data-testid={ `${category}-category-filter` }
          >
            { category }

          </button>
        ))}
        </div>  */}
      <SearchCards />
      <Footer />
    </main>
  );
}

export default Recipes;
