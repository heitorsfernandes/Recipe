import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from '../../cypress/mocks/fetch';
import App from '../App';

import renderWithRouter from "../renderWithRouter";

beforeEach(()=> {
    global.fetch = jest.fn(fetchMock)
  });
  
    const email_user = 'test@test.com';
    const password_user = '12345678';

describe('Teste da página de receita', () => {
    it('Testa a página de foods ',  () => {
        const {history} = renderWithRouter(<App/>);
        const emailInput = screen.getByTestId('email-input');
        const passWordInput = screen.getByTestId('password-input');
        const loginBtn = screen.getByTestId('login-submit-btn');

        userEvent.type(email_user, emailInput);
        userEvent.type(password_user, passWordInput);
        userEvent.click(loginBtn);
        
        history.push('/foods');

        const pageTitle = screen.getByTestId('page-title');

  

    

    

    });
  });