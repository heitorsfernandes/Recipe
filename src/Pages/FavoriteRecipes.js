import React from 'react';
import CardFavoriteRecipes from '../Components/CardFavoriteRecipes';
import Header from '../Components/Header';

function FavoriteRecipes() {
  return (
    <>
      <Header pageName="Favorite Recipes" search={ false } />
      <div>
        <section>
          <CardFavoriteRecipes />
        </section>
      </div>
    </>
  );
}

export default FavoriteRecipes;
