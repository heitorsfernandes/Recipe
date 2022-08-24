import React, { useContext, useEffect } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import SearchBar from '../Components/SearchBar.js';
import SearchCards from '../Components/SearchCards';
import Context from '../Context/Context';
import { fetchApi } from '../Services/fetchApi';

function RecipesDrinks() {
  const { setApiData } = useContext(Context);
  const drinksCategories = [
    'Ordinary Drink', 'Cocktail', 'Shake', 'Other/Unknown', 'Cocoa'];

  useEffect(() => {
    const newFetch = async () => {
      const data = await fetchApi('thecocktaildb', 'search.php?s', '');
      setApiData(data.drinks);
    };

    newFetch();
  }, [setApiData]);
  return (
    <main>
      <Header pageName="Drinks" />
      <SearchBar pageName="drinks" />
      <div>
        <button type="button" data-testid="All-category-filter">All</button>
        {drinksCategories.map((category) => (
          <button
            key={ category }
            type="button"
            data-testid={ `${category}-category-filter` }
          >
            { category }

          </button>
        ))}
      </div>
      <SearchCards />
      <Footer />
    </main>
  );
}

export default RecipesDrinks;
