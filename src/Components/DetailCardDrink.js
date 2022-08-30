import clipboardCopy from 'clipboard-copy';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import Context from '../Context/Context';
import blackFavoriteIcon from '../images/blackHeartIcon.svg';
import whiteFavoriteIcon from '../images/whiteHeartIcon.svg';
import './CSS/startButton.css';

function DetailCardDrink({ recommendation }) {
  const { apiData } = useContext(Context);
  const history = useHistory();
  const { id } = useParams();
  const { location: { pathname } } = useHistory();
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

  const saveFavoriteRecipe = () => {
    const favObj = {
      id: apiData[0]?.idDrink,
      type: 'drink',
      nationality: '',
      alcoholicOrNot: apiData[0]?.strAlcoholic,
      name: apiData[0]?.strDrink,
      image: apiData[0]?.strDrinkThumb,
      category: apiData[0]?.strCategory,
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

  const allIngredients = Object.keys(apiData[0] || []);
  const validIngredients = allIngredients
    .filter((ingredient) => ingredient.includes('Ingredient') && apiData[0][ingredient]);
  const six = 6;
  const sixRecommendations = recommendation.filter((_, index) => index < six);

  const recipeInProgress = JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');
  const recipeKeysStoraged = Object.keys(recipeInProgress);
  const isInProgress = recipeKeysStoraged.some((key) => key === apiData[0]?.idDrink);

  const recipeDone = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const isDone = recipeDone.some((element) => element.id === apiData[0]?.idDrink);

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
          <div className="shareAndFav">
            <button
              type="button"
              data-testid="share-btn"
              onClick={ () => getUrl(`http://localhost:3000${pathname}`) }
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
          {!isDone && (
            <button
              className="start-button"
              type="button"
              data-testid="start-recipe-btn"
              onClick={ () => history.push(`/drinks/${apiData[0].idDrink}/in-progress`) }
            >
              {!isInProgress ? 'Continue Recipe' : 'Start Recipe'}
            </button>
          )}
        </>)}
      { copyUrl && <span>Link copied!</span>}
    </section>

  );
}
// foto, titulo, categoria, ingredientes, instruções, video(comida),recomendadas
DetailCardDrink.propTypes = {
  pageType: PropTypes.string,
}.isRequired;

export default DetailCardDrink;
