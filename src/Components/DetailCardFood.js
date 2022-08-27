import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import Context from '../Context/Context';
import EmbedVideo from './EmbedVideo';
import './CSS/startButton.css';

function DetailCardFood() {
  const { apiData } = useContext(Context);
  const history = useHistory();
  const youtubeId = apiData[0]?.strYoutube.split('=') || '';
  console.log(youtubeId);

  const allIngredients = Object.keys(apiData[0] || []);
  const validIngredients = allIngredients
    .filter((ingredient) => ingredient.includes('Ingredient') && apiData[0][ingredient]);

  // const allMeasures = Object.keys(apiData[0] || []);
  // const validMeasures = allMeasures
  //   .filter((measure) => measure.includes('Measure') && apiData[0][measure]);
  const isInProgress = false;

  const recipeDone = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const isDone = recipeDone.some((element) => element.id === apiData[0].idMeal);

  return (
    <section>
      {apiData[0] && (
        <>
          <div>
            <img
              src={
                apiData[0].strMealThumb
              }
              alt="Recipe"
              data-testid="recipe-photo"
            />
            <h2 data-testid="recipe-title">{apiData[0].strMeal}</h2>
            <p data-testid="recipe-category">{apiData[0].strCategory}</p>
          </div>

          <h3>Ingredients</h3>
          { validIngredients.map((each, index) => (
            <div key={ each }>
              <span data-testid={ `${index}-ingredient-name-and-measure` }>
                {apiData[0][each]}
                -
                {apiData[0][`strMeasure${index + 1}`]}
              </span>
              <br />
            </div>
          )) }
          <div>
            <h3>Instruções</h3>
            <p data-testid="instructions">{apiData[0].strInstructions}</p>
          </div>
          <EmbedVideo embedId={ youtubeId } />
          <Swiper>
            <SwiperSlide data-testid="0-recomendation-card" />
          </Swiper>
          { !isDone && (
            <button
              className="start-button"
              type="button"
              data-testid="start-recipe-btn"
              onClick={ () => history.push(`/foods/${apiData[0].idMeal}/in-progress`) }
            >
              {isInProgress ? 'Continue Recipe' : 'Start Recipe'}
            </button>
          )}

        </>)}
    </section>

  );
}

DetailCardFood.propTypes = {
  pageType: PropTypes.string,
}.isRequired;

export default DetailCardFood;
