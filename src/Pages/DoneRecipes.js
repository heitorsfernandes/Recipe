import React from 'react';
import CardDoneRecipes from '../Components/CardDoneRecipes';
import Header from '../Components/Header';

function DoneRecipes() {
  return (
    <div>
      <section>
        <Header pageName="Done Recipes" search={ false } />
      </section>
      <section>
        <CardDoneRecipes />
      </section>
    </div>
  );
}

export default DoneRecipes;
