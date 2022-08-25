import React from 'react';
import CardDoneRecipes from '../Components/CardDoneRecipes';
import Header from '../Components/Header';

function DoneRecipes() {
  return (
    <div>
      <section>
        <Header pageName="Done Recipes" search={ false } />
        <button
          type="button"
          name="all"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          name="Food"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          name="Drinks"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </section>
      <section>
        <CardDoneRecipes />
      </section>
    </div>
  );
}

export default DoneRecipes;
