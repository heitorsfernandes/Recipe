import PropTypes from 'prop-types';
import React, { useEffect, useContext } from 'react';
import { fetchApi } from '../Services/fetchApi';
import Context from '../Context/Context';
import DetailCardDrink from '../Components/DetailCardDrink';

function RecipeDetails({ match }) {
  const { setApiData } = useContext(Context);
  const { id } = match.params;

  useEffect(() => {
    const fetchDetail = async () => {
      const response = await fetchApi('thecocktaildb', 'lookup.php?i', id);
      setApiData(response.drinks);
    };

    fetchDetail();
  }, []);

  return (
    <section>
      <DetailCardDrink pageType="drinks" />
    </section>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default RecipeDetails;
