import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from "../App";
import renderWithRouter from "../renderWithRouter";

describe('Teste da página de detalhes da receita.js', () => {

    it('Teste de renderização dos elementos corretamente na página ', async () => {

        const {history} = renderWithRouter(<App/>);
        const emailInput = screen.getByTestId('email-input');
        const passWordInput = screen.getByTestId('password-input');
        const loginBtn = screen.getByTestId('login-submit-btn');

        userEvent.type('teste@123.com', emailInput);
        userEvent.type('teste123', passWordInput);
        userEvent.click(loginBtn);

        history.push('/foods');
        
        const nameRadioBtn = screen.getByTestId('name-search-radio');
        const showSearchInput = screen.getByTestId('search-top-btn');

        userEvent.click(nameRadioBtn);
        userEvent.click(showSearchInput);

        const searchInput = screen.getByTestId('search-input');
        userEvent.type('Arrabiata',nameRadioBtn);

        const searchBtn = screen.getByTestId('exec-search-btn');
        userEvent.click(searchBtn);

        history.push('/foods/52771');

        
        
        





    });
  });