import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './CardFavoriteRecipes.css';

const copy = require('clipboard-copy');

function CardFavoriteRecipes() {
  const favoriteRecipes = localStorage.getItem('favoriteRecipes')
    ? JSON.parse(localStorage.getItem('favoriteRecipes'))
    : [];

  const [listFavoriteRecipes, setListFavoriteRecipes] = useState(favoriteRecipes);
  const [isCopied, setIsCopied] = useState(false);
  // const [favoriteState, setFavoriteState] = useState(false);

  const handleClick = ({ target: { value } }) => {
    if (value !== 'all') {
      const filteredFavorits = favoriteRecipes
        .filter((recipe) => recipe.type === value);
      setListFavoriteRecipes(filteredFavorits);
    } else return setListFavoriteRecipes(favoriteRecipes);
  };

  const handleCopy = (type, id) => {
    const copyURL = `http://localhost:3000/${type}s/${id}`;
    copy(copyURL);
    setIsCopied(true);
  };

  const deleteFavoriteRecipe = (id) => {
    const favRemoved = favoriteRecipes.filter((element) => element.id !== id);
    setListFavoriteRecipes(favRemoved);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favRemoved));
  };

  return (
    <>
      <div className="categoryFavorites">
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
      { isCopied === true
        ? <span className="copy">Link copied!</span>
        : <span className="copy">Not Copied!</span> }
      <section className="searchCards-containerZ">
        {listFavoriteRecipes
          .map((recipe, index) => (
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
                <img
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                  className="img"
                  width="200"
                  height="200"
                />
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
                onClick={ () => handleCopy(recipe.type, recipe.id) }
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="icone de compartilhar"
                />
              </button>
              <button
                type="button"
                onClick={ () => deleteFavoriteRecipe(recipe.id) }
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
