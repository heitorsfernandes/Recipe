import React, { useEffect, useContext } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import SearchBar from '../Components/SearchBar.js';
import SearchCards from '../Components/SearchCards';
import { fetchApi } from '../Services/fetchApi';
import Context from '../Context/Context';

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
      <SearchCards />
      <Footer />
    </main>
  );
}

export default Recipes;
