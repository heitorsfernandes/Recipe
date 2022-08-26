import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import DoneRecipes from './Pages/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import RecipeDetails from './Pages/RecipeDetails';
import RecipeInProgress from './Pages/RecipeInProgress';
import Recipes from './Pages/Recipes';
import RecipesDrinks from './Pages/RecipesDrinks';
import RecipeDetailsDrinks from './Pages/RecipeDetailsDrinks';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Recipes } />
      <Route exact path="/drinks" component={ RecipesDrinks } />
      <Route exact path="/foods/:id" component={ RecipeDetails } />
      <Route exact path="/drinks/:id" component={ RecipeDetailsDrinks } />
      <Route path="/foods/{id-da-receita}/in-progress" component={ RecipeInProgress } />
      <Route
        path="/drinks/{id-da-receita}/in-progress"
        component={ RecipeInProgress }
      />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/profile" component={ Profile } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>

  );
}

export default App;
