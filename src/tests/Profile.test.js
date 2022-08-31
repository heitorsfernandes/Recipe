import { screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import React from 'react';
import renderWithRouter from '../renderWithRouter';
import Profile from '../Pages/Profile';
import Provider from '../Context/Provider';

describe('Teste Profile.js', () => {

    it('Teste Local Storage', () => {
        localStorage.clear();
        JSON.parse(localStorage.getItem('user')) || {};  
        jest.spyOn(global.localStorage, 'setItem')
    })
    
    it('Teste de renderização dos elementos corretamente na página ', () => {
      renderWithRouter(<Provider><Profile /></Provider>);
      const p = screen.getByText(/email/i);
      const btnDone = screen.getByText(/done recipes/i)
      const btnFavorite = screen.getByTestId('profile-favorite-btn');
      const btnLogout = screen.getByTestId('profile-logout-btn');

      expect(p).toBeInTheDocument();

      userEvent.click(btnDone);
      expect(btnDone).toBeInTheDocument();

      userEvent.click(btnFavorite);
      expect(btnFavorite).toBeInTheDocument();
 
      userEvent.click(btnLogout);
      expect(btnLogout).toBeInTheDocument();
    });
  });
  