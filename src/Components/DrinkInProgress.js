import clipboardCopy from 'clipboard-copy';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import blackFavoriteIcon from '../images/blackHeartIcon.svg';
import whiteFavoriteIcon from '../images/whiteHeartIcon.svg';
import { drinkAPI } from '../Services/fetchApiRecipe';
import LocalStorageIngredients from '../Services/LocalStorageIngredients';

function DrinkInProgress({ drink = true }) {
  const { id } = useParams(); // para acessar o parâmetro e obter a url
  const [recipe, setRecipe] = useState([]);
  const [ingredient, setIngredient] = useState([]);
  const history = useHistory();
  const [copyUrl, setCopyUrl] = useState();
  const [favoriteState, setFavoriteState] = useState(false);

  useEffect(() => {
    const validFavorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (!validFavorite) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    } else {
      setFavoriteState(
        validFavorite.some((element) => element.id === id),
      );
    }
  }, []);

  useEffect(() => {
    if (drink) { // se for bebida acessa o id da API
      const drinkRecipe = async () => {
        const results = await drinkAPI(id);
        setRecipe(results.drinks[0]);
      };
      drinkRecipe();
      if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
        return localStorage.setItem('inProgressRecipes',
          JSON.stringify({ cocktails: {} }));
      }
      const getCheckedDrinks = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (getCheckedDrinks.cocktails[id]) {
        setIngredient(getCheckedDrinks.cocktails[id]);
      }
    }
  }, []);

  const checkIngredient = (e) => { // função de checkar os igredientes
    if (ingredient.includes(e.target.id)) {
      const filterIngred = ingredient
        .filter((markedIngredient) => markedIngredient !== e.target.id);
      LocalStorageIngredients(drink, { [id]: filterIngred });
      return setIngredient(filterIngred);
    }
    setIngredient([...ingredient, e.target.id]);
    const ingredientId = { [id]: [...ingredient, e.target.id] };
    LocalStorageIngredients(drink, ingredientId);
  };

  const recipeIngredients = Object.keys(recipe || {}) //
    .filter((elem) => elem.includes('strIngredient') && (recipe[elem])) // caso o array tenha a string dentro do parametro retorna booleano
    .map((element) => recipe[element]).map((elemValid) => (
      <label
        htmlFor={ elemValid }
        key={ elemValid }
        className={ ingredient.includes(elemValid) ? 'usedIngredient' : null }
      >
        <input
          id={ elemValid }
          type="checkbox"
          onChange={ (e) => checkIngredient(e) }
          checked={ ingredient.includes(elemValid) }
        />
        {elemValid}
      </label>
    ));

  if (recipe.length === 0) {
    return <p>Loading...</p>;
  }

  const saveFavoriteRecipe = () => {
    const favObj = {
      id: recipe?.idDrink,
      type: 'drink',
      nationality: '',
      alcoholicOrNot: recipe?.strAlcoholic,
      name: recipe?.strDrink,
      image: recipe?.strDrinkThumb,
      category: recipe?.strCategory,
    };
    const fav = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (fav === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([favObj]));
    } else if (favoriteState) {
      const favRemoved = fav.filter((element) => element.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify([favRemoved]));
    } else { localStorage.setItem('favoriteRecipes', JSON.stringify([...fav, favObj])); }

    setFavoriteState(!favoriteState);
  };

  const getUrl = async (url) => {
    const interval = 1000;
    await clipboardCopy(url).then(setCopyUrl(true));
    setInterval(() => setCopyUrl(false), interval);
  };

  return (
    <div>
      <div>
        <img
          src={ recipe.strDrinkThumb }
          data-testid="recipe-photo"
          alt="foto recipe"
          width="100px"
        />
        <h1 data-testid="recipe-title">{recipe.strDrink}</h1>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ () => getUrl(`http://localhost:3000/drinks/${id}`) }
        >
          Share
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ saveFavoriteRecipe }
          src={ favoriteState ? blackFavoriteIcon : whiteFavoriteIcon }
        >
          <img
            src={ favoriteState ? blackFavoriteIcon : whiteFavoriteIcon }
            alt="favorite icon"
          />
        </button>
        <p data-testid="recipe-category">{recipe.strCategory}</p>
        <p data-testid="instructions">{recipe.strInstructions}</p>
        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ ingredient.length !== recipeIngredients.length }
          onClick={ () => { history.push('/done-recipes'); } }
        >
          Finish Recipe
        </button>
        { copyUrl && <span>Link copied!</span>}
      </div>
      {
        recipeIngredients.map((elemIngredients, index) => (
          <p
            data-testid={ `${index}-ingredient-step` }
            key={ index }
          >
            {elemIngredients}
          </p>
        ))
      }
    </div>
  );
}

DrinkInProgress.propTypes = {
  drink: PropTypes.bool.isRequired,
};

export default DrinkInProgress;
