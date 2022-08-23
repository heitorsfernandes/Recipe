import React, { useContext } from 'react';
import Context from '../Context/Context';

function SearchCards() {
  const doze = 12;
  const { apiData } = useContext(Context);
  return (
    <section>
      { apiData.map(
        (element, index) => {
          if (element.idMeal) {
            return (
              <div data-testid={ `${index}-recipe-card` } key={ element.idMeal }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ element.strMealThumb }
                  alt="Recipe"
                />
                <h3 data-testid={ `${index}-card-name` }>{element.strMeal}</h3>
              </div>);
          }

          return (
            <div data-testid={ `${index}-recipe-card` } key={ element.idDrink }>
              <img
                data-testid={ `${index}-card-img` }
                src={ element.strDrinkThumb }
                alt="Recipe"
              />
              <h3 data-testid={ `${index}-card-name` }>{element.strDrink}</h3>
            </div>
          );
        },
      ).filter((_, index) => index < doze) }
    </section>
  );
}

export default SearchCards;
