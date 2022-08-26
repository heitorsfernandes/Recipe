import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../Context/Context';

function SearchCards({ pageName }) {
  const doze = 12;
  const { apiData } = useContext(Context);
  return (
    <section>
      { apiData.map(
        (element, index) => {
          const route = pageName === 'foods'
            ? `/foods/${element.idMeal}` : `/drinks/${element.idDrink}`;
          if (element.idMeal) {
            return (
              <Link to={ route }>
                <div
                  data-testid={ `${index}-recipe-card` }
                  className="recipes-items"
                  key={ element.idMeal }
                >
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ element.strMealThumb }
                    alt="Recipe"
                  />
                  <h3 data-testid={ `${index}-card-name` }>{element.strMeal}</h3>
                </div>
              </Link>);
          }

          return (
            <Link to={ route } key={ element.idDrink }>
              <div
                data-testid={ `${index}-recipe-card` }
                className="recipes-items"
                key={ element.idDrink }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ element.strDrinkThumb }
                  alt="Recipe"
                />
                <h3 data-testid={ `${index}-card-name` }>{element.strDrink}</h3>
              </div>
            </Link>);
        },
      ).filter((_, index) => index < doze) }
    </section>
  );
}

SearchCards.propTypes = {
  pageName: PropTypes.string.isRequired,
};

export default SearchCards;
