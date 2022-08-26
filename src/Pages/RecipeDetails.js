import PropTypes from 'prop-types';
import React, { useEffect, useContext } from 'react';
import { fetchApi } from '../Services/fetchApi';
import Context from '../Context/Context';
import DetailCardFood from '../Components/DetailCardFood';
import DetailCardDrink from '../Components/DetailCardDrink';

function RecipeDetails({ match, food }) {
  const { setApiData } = useContext(Context);
  const { id } = match.params;

  useEffect(() => {
    const fetchDetail = async () => {
      if (food) {
        const response = await fetchApi('themealdb', 'lookup.php?i', id);
        console.log(response);
        setApiData(response.meals);
      } else {
        const response = await fetchApi('thecocktaildb', 'lookup.php?i', id);
        setApiData(response.drinks);
      }
    };

    fetchDetail();
  }, []);

  return (
    <section>
      { food ? (<DetailCardFood />) : (<DetailCardDrink />) }
    </section>

  );
}

RecipeDetails.propTypes = {
  food: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.shape({
        replace: PropTypes.func,
      }),
    }),
  }),
}.isRequired;

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default RecipeDetails;
