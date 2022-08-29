import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Provider from './Context/Provider';
import DoneRecipes from './Pages/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import RecipeDetails from './Pages/RecipeDetails';
import RecipeInProgress from './Pages/RecipeInProgress';
import Recipes from './Pages/Recipes';
import RecipesDrinks from './Pages/RecipesDrinks';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/foods" component={ Recipes } />
          <Route exact path="/drinks" component={ RecipesDrinks } />
          <Route
            exact
            path="/foods/:id"
            render={
              (props) => <RecipeDetails { ...props } food />
            }
          />
          <Route
            exact
            path="/drinks/:id"
            render={
              (props) => <RecipeDetails { ...props } food={ false } />
            }
          />
          <Route
            path="/foods/:id/in-progress"
            render={
              (props) => <RecipeInProgress { ...props } foodInProgress />
            }
            // component={ RecipeInProgress }
          />
          <Route
            path="/drinks/:id/in-progress"
            render={
              (props) => <RecipeInProgress { ...props } foodInProgress={ false } />
            }
            // component={ RecipeInProgress }
          />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/profile" component={ Profile } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
