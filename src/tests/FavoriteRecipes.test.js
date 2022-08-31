import React from "react";
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoriteRecipes from "../Pages/FavoriteRecipes";
import Provider from '../Context/Provider';

describe("", () => {
  Object.defineProperty(navigator, "clipboard", {
    value: {
      writeText: () => {},
    },
  });

  it("", async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([
      {
      alcoholicOrNot: "",
      category: "Side",
      id: "52977",
      image: "https://www.themealdb.com/images/media/meals/58oia61564916529.jpg",
      name: "Corba",
      nationality: "Turkish",
      type: "food",
    },
    {
      alcoholicOrNot: "Alcoholic",
      category: "Cocktail",
      id: "17225",
      image: "https://www.thecocktaildb.com/images/media/drink/l3cd7f1504818306.jpg",
      name: "Ace",
      nationality: "",
      type: "drink",
    }
  ]));
    renderWithRouter(<Provider><FavoriteRecipes /></Provider>);

    const allFilter = screen.getByTestId("filter-by-all-btn");
    userEvent.click(allFilter);
    const foodFilter = screen.getByTestId("filter-by-food-btn");
    userEvent.click(foodFilter);
    const drinkFilter = screen.getByTestId("filter-by-drink-btn");
    userEvent.click(drinkFilter);

    userEvent.click(screen.getByTestId("0-horizontal-favorite-btn"));
    userEvent.click(screen.getByTestId("0-horizontal-share-btn"));
  });
});
