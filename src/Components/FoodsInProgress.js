import clipboardCopy from 'clipboard-copy';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Context from '../Context/Context';

import blackFavoriteIcon from '../images/blackHeartIcon.svg';
import whiteFavoriteIcon from '../images/whiteHeartIcon.svg';
import { drinkAPI, recipeAPI } from '../Services/fetchApiRecipe';
import LocalStorageIngredients from '../Services/LocalStorageIngredients';

function FoodsInProgress({ drink = false }) {
  const { id } = useParams(); // para acessar o parâmetro e obter a url
  const [recipe, setRecipe] = useState([]);
  const [ingredient, setIngredient] = useState([]);
  const [copyUrl, setCopyUrl] = useState();
  const [favoriteState, setFavoriteState] = useState(false);
  const { apiData } = useContext(Context);
  const history = useHistory();
  console.log(apiData);

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
          JSON.stringify({ cocktails: {}, meals: {} }));
      }
      const getCheckedDrinks = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (getCheckedDrinks.cocktails[id]) {
        setIngredient(getCheckedDrinks.cocktails[id]);
      }
      return;
    }

    const mealRecipe = async () => {
      const results = await recipeAPI(id);
      setRecipe(results.meals[0]);
    };
    mealRecipe();
    if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      return localStorage.setItem('inProgressRecipes',
        JSON.stringify({ cocktails: {}, meals: {} }));
    }
    const getCheckedMeals = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getCheckedMeals.meals[id]) {
      setIngredient(getCheckedMeals.meals[id]);
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

  const saveFavoriteRecipe = () => {
    const favObj = {
      id: apiData[0]?.idMeal,
      type: 'food',
      nationality: apiData[0]?.strArea,
      category: apiData[0]?.strCategory,
      name: apiData[0]?.strMeal,
      image: apiData[0]?.strMealThumb,
      alcoholicOrNot: '',
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

  const saveFavoriteDrink = () => {
    const favObj = {
      id: apiData[0]?.idDrink,
      type: 'drink',
      nationality: '',
      category: apiData[0]?.strCategory,
      name: apiData[0]?.strDrink,
      image: apiData[0]?.strDrinkThumb,
      alcoholicOrNot: apiData[0].strAlcoholic,
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

  const drinkRecipe = (
    <div>
      <img
        src={ recipe.strDrinkThumb }
        data-testid="recipe-photo"
        alt="foto recipe"
        width="100px"
      />
      <h1 data-testid="recipe-title">{recipe.strDrink}</h1>
      <p data-testid="recipe-category">{recipe.strCategory}</p>
      <div className="shareAndFav">
        <button
          type="button"
          data-testid="share-btn"
          onClick={ () => getUrl(`http://localhost:3000/drinks/${id}`) }
        >
          share

        </button>
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ saveFavoriteDrink }
          src={ favoriteState ? blackFavoriteIcon : whiteFavoriteIcon }
        >

          <img
            src={ favoriteState ? blackFavoriteIcon : whiteFavoriteIcon }
            alt="favorite icon"
          />

        </button>
      </div>
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
  );
  const mealRecipe = (
    <div>
      <img
        src={ recipe.strMealThumb }
        data-testid="recipe-photo"
        alt="foto recipe"
        width="100px"
      />
      <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
      <div className="shareAndFav">
        <button
          type="button"
          data-testid="share-btn"
          onClick={ () => getUrl(`http://localhost:3000/foods/${id}`) }
        >
          share

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
      </div>
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
  );
  return (
    <div>

      {
        drink ? drinkRecipe : mealRecipe
      }
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

FoodsInProgress.propTypes = {
  drink: PropTypes.bool.isRequired,
};

export default FoodsInProgress;
