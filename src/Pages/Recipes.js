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
      <SearchCards pageName="foods" />
      <Footer />
    </main>
  );
}

export default Recipes;
