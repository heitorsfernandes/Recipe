import React from 'react';
import Header from '../Components/Header';
import CardFavoriteRecipes from '../Components/CardFavoriteRecipes';

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

// a chave favoriteRecipes no local storage deve conter a seguinte estrutura:
// [{
//     id: id-da-receita,
//     type: food-ou-drink,
//     nationality: nacionalidade-da-receita-ou-texto-vazio,
//     category: categoria-da-receita-ou-texto-vazio,
//     alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
//     name: nome-da-receita,
//     image: imagem-da-receita
// }]
