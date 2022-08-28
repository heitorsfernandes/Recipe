import PropTypes from 'prop-types';
import React, { useEffect, useContext, useState } from 'react';
import { fetchApi } from '../Services/fetchApi';
import Context from '../Context/Context';
import DetailCardFood from '../Components/DetailCardFood';
import DetailCardDrink from '../Components/DetailCardDrink';

function RecipeDetails({ match, food }) {
  const { setApiData } = useContext(Context);
  const { id } = match.params;
  const [recommendation, setRecommendation] = useState([]);

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
    const fetchRecomendation = async () => {
      if (food) {
        const response = await fetchApi('thecocktaildb', 'search.php?s', '');
        console.log(response);
        setRecommendation(response.drinks);
      } else {
        const response = await fetchApi('themealdb', 'search.php?s', '');
        setRecommendation(response.meals);
      }
    };

    fetchDetail();
    fetchRecomendation();
  }, []);

  return (
    <section>
      { food ? (<DetailCardFood recommendation={ recommendation } />)
        : (<DetailCardDrink recommendation={ recommendation } />) }
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
