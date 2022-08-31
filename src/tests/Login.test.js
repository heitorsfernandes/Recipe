import { screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
describe('Teste Login.js', () => {
  it('Testa se renderiza os elementos corretamente na página ', () => {
    const { history } = renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const enterBtn = screen.getByTestId('login-submit-btn');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(enterBtn).toBeInTheDocument();
    userEvent.type(emailInput, 'teste@123.com');
    userEvent.type(passwordInput, 'teste123');
    userEvent.click(enterBtn);
  });
});