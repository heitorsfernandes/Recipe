import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../Context/Context';
import EmbedVideo from './EmbedVideo';

function DetailCardFood({ pageType }) {
  const { apiData } = useContext(Context);
  const history = useHistory();
  const youtubeId = apiData[0].strYoutube.split('=');
  const isInProgress = false;

  const recipeDone = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const isDone = recipeDone.some((element) => element.id === apiData[0].idMeal);

  console.log(youtubeId);
  return (
    <section>
      {apiData[0] && (
        <>
          <div>
            {/* <img src={ `${apiData[0]}.str${pageType}Thumb` } alt="Recipe" />
        <h2>{`${apiData[0]}.str${pageType}`}</h2> */}
            <img src={ apiData[0].strMealThumb } alt="Recipe" />
            <h2>{apiData[0].strMeal}</h2>
            {pageType === 'Meal' ? (<p>{apiData[0].strCategory}</p>)
              : (<p>{apiData[0].strAlcoholic}</p>)}
          </div>
          <div />
          <div>
            <h3>Instruções</h3>
            <p>{apiData[0].strInstructions}</p>
          </div>
          <EmbedVideo embedId={ youtubeId } />
          <div />
          { isDone && (
            <button
              type="button"
              data-testid="start-recipe-btn"
              onClick={ () => history.push(`/foods/${apiData.idMeal}/in-progress`) }
            >
              {isInProgress ? 'Continue Recipe' : 'Start Recipe'}
            </button>
          )}

        </>)}
    </section>

  );
}
// foto, titulo, categoria, ingredientes, instruções, video(comida),recomendadas
DetailCardFood.propTypes = {
  pageType: PropTypes.string,
}.isRequired;

export default DetailCardFood;
