import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import DoneRecipes from './Pages/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import RecipeDetails from './Pages/RecipeDetails';
import RecipeInProgress from './Pages/RecipeInProgress';
import Recipes from './Pages/Recipes';

function App() {
  return (
    <switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Recipes } />
      <Route exact path="/drinks" component={ Recipes } />
      <Route path="/foods/{id-da-receita}" component={ RecipeDetails } />
      <Route path="/drinks/{id-da-receita}" component={ RecipeDetails } />
      <Route path="/foods/{id-da-receita}/in-progress" component={ RecipeInProgress } />
      <Route
        path="/drinks/{id-da-receita}/in-progress"
        component={ RecipeInProgress }
      />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
    </switch>

  );
}

export default App;
