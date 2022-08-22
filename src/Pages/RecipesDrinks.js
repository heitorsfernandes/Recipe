import React from 'react';
import Header from '../Components/Header';
import SearchBar from '../Components/SearchBar.js';

function RecipesDrinks() {
  return (
    <main>
      <Header pageName="Drinks" />
      <SearchBar />
      <h1>Hello Recipes</h1>
    </main>
  );
}

export default RecipesDrinks;
