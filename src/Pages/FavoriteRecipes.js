import React from 'react';
import Header from '../Components/Header';

function FavoriteRecipes() {
  return (
    <Header pageName="Favorite Recipes" search={ false } />
    <p>Receitas favoritas</p>
  );
}

export default FavoriteRecipes;
