import React from 'react';
import Header from '../Components/Header';
import SearchBar from '../Components/SearchBar.js';

function Recipes() {
  return (
    <main>
      <Header pageName="Foods" />
      <SearchBar />
      <h1>Hello Recipes</h1>
    </main>
  );
}

export default Recipes;
