import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import Context from '../Context/Context';
import './CSS/swiper-bundle.css';
import './CSS/startButton.css';

function DetailCardDrink({ recommendation }) {
  const { apiData } = useContext(Context);
  const isInProgress = false;
  const history = useHistory();

  const allIngredients = Object.keys(apiData[0] || []);
  const validIngredients = allIngredients
    .filter((ingredient) => ingredient.includes('Ingredient') && apiData[0][ingredient]);
  const six = 6;
  const sixRecommendations = recommendation.filter((_, index) => index < six);
  return (
    <section>
      {apiData[0] && (
        <>
          <div>
            <img
              src={ apiData[0]?.strDrinkThumb || '' }
              alt="Recipe"
              data-testid="recipe-photo"
            />
            <h2 data-testid="recipe-title">{apiData[0].strDrink}</h2>
            <p data-testid="recipe-category">{apiData[0].strAlcoholic}</p>
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
          <Swiper slidesPerView={ 1 }>
            {sixRecommendations.map((rec, index) => (
              <SwiperSlide key={ rec } data-testid={ `${index}-recomendation-card` }>
                <img src={ rec.strMealThumb } alt={ rec.strMeal } />
                <span
                  data-testid={ `${index}-recomendation-title` }
                >
                  {rec.strMeal}
                </span>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            className="start-button"
            type="button"
            data-testid="start-recipe-btn"
            onClick={ () => history.push(`/drinks/${apiData[0].idDrink}/in-progress`) }
          >
            {isInProgress ? 'Continue Recipe' : 'Start Recipe'}
          </button>
        </>)}
    </section>

  );
}
// foto, titulo, categoria, ingredientes, instruções, video(comida),recomendadas
DetailCardDrink.propTypes = {
  pageType: PropTypes.string,
}.isRequired;

export default DetailCardDrink;
