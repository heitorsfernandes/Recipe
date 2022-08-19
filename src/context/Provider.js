import React from 'react';
import PropTypes from 'prop-types';
import RecipeAppContext from './Context';

export default function RecipeAppProvider({ children }) {
  return (
    <RecipeAppContext.Provider value={ value }>
      {children}
    </RecipeAppContext.Provider>
  );
}

RecipeAppProvider.propTypes = { children: PropTypes.node.isRequired };
