import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../Context/Context';

function DetailCardDrink() {
  const { apiData } = useContext(Context);
  const isInProgress = false;
  const history = useHistory();
  console.log(apiData);
  return (
    <section>
      {apiData && (
        <>
          <div>
            <img src={ apiData[0].strDrinkThumb } alt="Recipe" />
            <h2>{apiData[0].strDrink}</h2>
            <p>{apiData[0].strAlcoholic}</p>
          </div>
          <div />
          <div>
            <h3>Instruções</h3>
            <p data-testid="instructions">{apiData[0].strInstructions}</p>
          </div>
          <div />
          <button
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
