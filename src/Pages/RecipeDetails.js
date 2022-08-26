import PropTypes from 'prop-types';
import React, { useEffect, useContext } from 'react';
import { fetchApi } from '../Services/fetchApi';
import Context from '../Context/Context';
import DetailCardFood from '../Components/DetailCardFood';

function RecipeDetails({ match }) {
  const { setApiData } = useContext(Context);
  const { id } = match.params;
  const newId = id.replace(':', '');

  useEffect(() => {
    const fetchDetail = async () => {
      const response = await fetchApi('themealdb', 'lookup.php?i', newId);
      setApiData(response.meals);
    };

    fetchDetail();
  }, []);

  return (
    <section>
      <DetailCardFood pageType="Meal" />
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
