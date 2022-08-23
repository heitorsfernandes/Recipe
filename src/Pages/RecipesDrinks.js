import React from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import SearchBar from '../Components/SearchBar.js';
import SearchCards from '../Components/SearchCards';

function RecipesDrinks() {
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
