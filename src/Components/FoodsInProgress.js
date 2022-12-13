import clipboardCopy from 'clipboard-copy';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import blackFavoriteIcon from '../images/blackHeartIcon.svg';
import whiteFavoriteIcon from '../images/whiteHeartIcon.svg';
import { drinkAPI, recipeAPI } from '../Services/fetchApiRecipe';
import LocalStorageIngredients from '../Services/LocalStorageIngredients';
import './CSS/DrinkInProgress.css';
import './CSS/startButton.css';

function FoodsInProgress({ drink = false }) {
  const { id } = useParams(); // para acessar o parâmetro e obter a url
  const [recipe, setRecipe] = useState([]);
  const [ingredient, setIngredient] = useState([]);
  const [copyUrl, setCopyUrl] = useState();
  const [favoriteState, setFavoriteState] = useState(false);
  // const { apiData } = useContext(Context);
  const history = useHistory();

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
      id: recipe?.idMeal,
      type: 'food',
      nationality: recipe?.strArea,
      category: recipe?.strCategory,
      name: recipe?.strMeal,
      image: recipe?.strMealThumb,
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

  const doneRecipe = () => {
    const newD = new Date();
    const date = `${newD.getDate()}/${newD.getMonth() + 1}/${newD.getFullYear()}`;
    const doneObj = {
      id: recipe?.idMeal,
      type: 'food',
      nationality: recipe?.strArea,
      category: recipe?.strCategory,
      alcoholicOrNot: '',
      name: recipe?.strMeal,
      image: recipe?.strMealThumb,
      doneDate: date,
      tags: [recipe?.strTags],
    };
    const doneLocal = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    if (doneLocal === null) {
      localStorage.setItem('doneRecipes', JSON.stringify([doneObj]));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([...doneLocal, doneObj]));
    }

    history.push('/done-recipes');
  };

  const getUrl = async (url) => {
    const interval = 1000;
    await clipboardCopy(url).then(setCopyUrl(true));
    setInterval(() => setCopyUrl(false), interval);
  };

  const mealRecipe = (
    <div>
      <div className="recipe-name">
        <img
          src={ recipe.strMealThumb }
          data-testid="recipe-photo"
          alt="foto recipe"
          width="100px"
        />
        <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
      </div>
      <div className="shareAndFav">
        <button
          type="button"
          data-testid="share-btn"
          onClick={ () => getUrl(`http://localhost:3000/foods/${id}`) }
        >
          share
        </button>
        { copyUrl && <span>Link copied!</span>}
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
        className="start-button"
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ ingredient.length !== recipeIngredients.length }
        onClick={ () => doneRecipe() }
      >
        Finish Recipe
      </button>
      <h3>Ingredients</h3>
    </div>
  );
  return (
    <div className="ingredients-container">
      { drink ? drinkRecipe : mealRecipe }
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
export default FoodsInProgress;

FoodsInProgress.propTypes = {
  drink: PropTypes.bool.isRequired,
};
