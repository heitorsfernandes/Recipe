import React from 'react';
import RecipeAppContext from './Context';

function  RecipeAppProvider({ children }) {

  return (
    <RecipeAppContext.Provider value={value}>
      {children}
    </RecipeAppContext.Provider>
  );
};
