import React from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import SearchBar from '../Components/SearchBar.js';

function Recipes() {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('myParam');
  console.log(myParam);
  return (
    <main>
      <Header pageName="Foods" />
      <SearchBar pageName="foods" />
      <h1>Hello Recipes</h1>
      <Footer />
    </main>
  );
}

export default Recipes;
