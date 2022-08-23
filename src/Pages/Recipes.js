import React from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import SearchBar from '../Components/SearchBar.js';
import SearchCards from '../Components/SearchCards';

function Recipes() {
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
