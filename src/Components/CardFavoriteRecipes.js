import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

// a chave favoriteRecipes deve conter a seguinte estrutura:
// [{
//     id: id-da-receita,
//     type: food-ou-drink,
//     nationality: nacionalidade-da-receita-ou-texto-vazio,
//     category: categoria-da-receita-ou-texto-vazio,
//     alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
//     name: nome-da-receita,
//     image: imagem-da-receita
// }]

function CardFavoriteRecipes() {
//   const favoriteRecipes = localStorage.getItem('favoriteRecipes')
//     ? JSON.parse(localStorage.getItem('favoriteRecipes'))
//     : [];

  const favoriteRecipes = [{
    id: '1',
    type: 'food',
    nationality: '1',
    category: '1',
    alcoholicOrNot: 'non -alcoholic',
    name: '1',
    image: '1',
  },
  {
    id: '2',
    type: 'food',
    nationality: '2',
    category: '2',
    alcoholicOrNot: 'non- alcoholic',
    name: '2',
    image: '2',
  },
  {
    id: '3',
    type: 'drink',
    nationality: '3',
    category: '3',
    alcoholicOrNot: 'non - alcoholic',
    name: '3',
    image: '3',
  },
  {
    id: '4',
    type: 'drink',
    nationality: '4',
    category: '4',
    alcoholicOrNot: 'alcoholic',
    name: '4',
    image: '4',
  },
  {
    id: '5',
    type: 'food',
    nationality: '5',
    category: '5',
    alcoholicOrNot: 'non - alcoholic',
    name: '5',
    image: '5',
  }];

  const [listFavoriteRecipes, setListFavoriteRecipes] = useState(favoriteRecipes);

  const handleClick = ({ target: { value } }) => {
    if (value !== 'all') {
      const filteredFavorits = favoriteRecipes
        .filter((recipe) => recipe.type === value);
      setListFavoriteRecipes(filteredFavorits);
    } else return setListFavoriteRecipes(favoriteRecipes);
  };

  return (
    <>
      <div>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ handleClick }
          value="food"
        >
          Foods
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ handleClick }
          value="drink"
        >
          Drinks
        </button>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleClick }
          value="all"
        >
          All
        </button>
      </div>
      <section>
        {listFavoriteRecipes
          .map((recipe, index) => (
            // um botão de compartilhar e um de "desfavoritar"
            <div key={ index }>
              {
                recipe.type === 'food' ? (
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    { `${recipe.nationality} - ${recipe.category}` }
                  </p>
                )
                  : (
                    <p data-testid={ `${index}-horizontal-top-text` }>
                      { recipe.alcoholicOrNot}
                    </p>
                  )
              }
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <div data-testid={ `${index}-horizontal-image` }>
                  <img
                    src={ recipe.image }
                    alt={ recipe.name }
                    className="img"
                  />
                </div>
              </Link>
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <p
                  data-testid={ `${index}-horizontal-name` }
                >
                  {recipe.name }
                </p>
              </Link>
              <button
                type="button"
                // onClick={ handleClick }
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="icone de compartilhar"
                />
              </button>
              <button
                type="button"
                // onClick={ handleClick }
              >
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="share"
                />
              </button>
            </div>
          ))}
      </section>
    </>
  );
}

export default CardFavoriteRecipes;
