import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { drinkAPI, recipeAPI } from '../Services/fetchApiRecipe';
import { localStorageIngredients } from '../Services/LocalStorageIngredients';

const copy = require('clipboard-copy');

function FoodsInProgress({ drink = false }) {
  const { id } = useParams(); // para acessar o parâmetro e obter a url
  const [recipe, setRecipe] = useState([]);
  const [ingredient, setIngredient] = useState([]);
  const [share, setShare] = useState([]);
  const history = useHistory();

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

  const checkIngredient = (e) => {
    if (ingredient.includes(e.target.id)) {
      const filterIngred = ingredient
        .filter((markedIngredient) => markedIngredient !== e.target.id);
      localStorageIngredients(drink, { [id]: filterIngred });
      return setIngredient(filterIngred);
    }
    setIngredient([...ingredient, e.target.id]);
    const ingredientId = { [id]: [...ingredient, e.target.id] };
    localStorageIngredients(drink, ingredientId);
  };

  const recipeIngredients = Object.keys(recipe || {})
    .filter((elem) => elem.includes('strIngredient') && (recipe[elem]))
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

  const linkCopied = (
    <span>Link copied!</span>
  );

  const drinkRecipe = (
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
        onClick={ () => {
          setShare(true);
          copy(`http://localhost:3000/drinks/${id}`);
        } }
      >
        Share Recipe
      </button>
      {
        share ? linkCopied : ''
      }
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favorite Recipe
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
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => {
          setShare(true);
          copy(`http://localhost:3000/foods/${id}`);
        } }
      >
        Share Recipe
      </button>
      {
        share ? linkCopied : ''
      }
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favorite Recipe
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
    </div>
  );
  return (
    <div>

      {
        drink ? drinkRecipe : mealRecipe
      }
      {
        recipeIngredients.map((ingredients, index) => (
          <p
            data-testid={ `${index}-ingredient-step` }
            key={ index }
          >
            {ingredients}
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
