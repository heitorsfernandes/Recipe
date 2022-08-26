import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../Context/Context';

function DetailCardDrink({ pageType }) {
  const { apiData } = useContext(Context);
  const isInProgress = false;
  const history = useHistory();
  console.log(apiData);
  return (
    <section>
      {apiData && (
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
          <div />
          <div />
          <button
            type="button"
            data-testid="start-recipe-btn"
            onClick={ () => history.push(`/drinks/${recipeData.idDrink}/in-progress`) }
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
