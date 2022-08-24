import React, { useContext, useEffect } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import SearchBar from '../Components/SearchBar.js';
import SearchCards from '../Components/SearchCards';
import Context from '../Context/Context';
import { fetchApi } from '../Services/fetchApi';

function RecipesDrinks() {
  const { setApiData } = useContext(Context);

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
      <SearchCards />
      <Footer />
    </main>
  );
}

export default RecipesDrinks;
