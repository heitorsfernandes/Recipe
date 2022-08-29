import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import '../Components/CSS/shareFavBtn.css';
import DetailCardDrink from '../Components/DetailCardDrink';
import DetailCardFood from '../Components/DetailCardFood';
import Context from '../Context/Context';
import { fetchApi } from '../Services/fetchApi';

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
    <div>
      <section>
        { food ? (<DetailCardFood recommendation={ recommendation } />)
          : (<DetailCardDrink recommendation={ recommendation } />) }
      </section>
    </div>

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
