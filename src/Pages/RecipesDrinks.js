import React from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import SearchBar from '../Components/SearchBar.js';

function RecipesDrinks() {
  return (
    <main>
      <Header pageName="Drinks" />
      <SearchBar pageName="drinks" />
      <h1>Hello Recipes</h1>
      <Footer />
    </main>
  );
}

export default RecipesDrinks;
