import React, { useState } from 'react';

export default function Login() {
  const [email, setStateEmail] = useState('');
  const [password, setStatePassword] = useState('');
  const [stateDisabled, setStateDisabled] = useState(true);

  const onLocalStorage = () => {
    // Referência: https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
  };
  // console.log(onLocalStorage);
  const onValidateBtn = () => {
    // Referência: https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const regexValidate = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const number = 6;
    const onValidate = regexValidate.test(email) && password.length >= number
      ? setStateDisabled(false) : setStateDisabled(true);
    return onValidate;
  };

  const onInputChange = ({ target }) => {
    const { value, name } = target;
    onValidateBtn();
    const validate = name === 'email' ? setStateEmail(value) : setStatePassword(value);
    return validate;
  };

  return (
    <div>
      <label htmlFor="label-email">
        Email
        <input
          className="field-email"
          data-testid="email-input"
          value={ email }
          name="email"
          onChange={ onInputChange }
        />
      </label>
      <label htmlFor="label-password">
        Password
        <input
          className="field-password"
          data-testid="password-input"
          value={ password }
          name="password"
          onChange={ onInputChange }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ stateDisabled }
        onClick={ onLocalStorage }
      >
        Enter
      </button>
    </div>
  );
}
