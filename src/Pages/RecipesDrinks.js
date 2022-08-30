import React, { useContext, useEffect } from 'react';
import CategoryFilter from '../Components/CategoryFilter';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import SearchBar from '../Components/SearchBar.js';
import SearchCards from '../Components/SearchCards';
import Context from '../Context/Context';
import { fetchApi } from '../Services/fetchApi';
import './RecipesDrinks.css';

function RecipesDrinks() {
  const { setApiData } = useContext(Context);
  /* const drinksCategories = [
    'Ordinary Drink', 'Cocktail', 'Shake', 'Other/Unknown', 'Cocoa']; */

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
      <CategoryFilter pageName="drinks" />
      <SearchCards pageName="drinks" />
      <Footer />
    </main>
  );
}

export default RecipesDrinks;
