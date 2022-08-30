import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './Login.css';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const one = 1;
  const minPassword = 6;
  const validEmail = /^\w+([/.-]?\w+)*@\w+([/.-]?\w+)*(\.\w{2,3})+$/;

  const submitForm = () => {
    const emailStorage = {
      email,
    };
    localStorage.setItem('user', JSON.stringify(emailStorage));
    localStorage.setItem('mealsToken', JSON.stringify(one));
    localStorage.setItem('cocktailsToken', JSON.stringify(one));
    history.push('/foods');
  };

  return (
    <div>
      <form className="login-container">
        <h1>
          {'Louro\'s Recipes' }
        </h1>
        <input
          placeholder="email"
          name="name"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
          data-testid="email-input"
          type="email"
        />
        <br />

        <input
          placeholder="senha"
          name="password"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
          data-testid="password-input"
          type="password"
        />

        <br />
        <button
          disabled={ !(email.match(validEmail) && password.length > minPassword) }
          type="button"
          data-testid="login-submit-btn"
          onClick={ () => submitForm() }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
};

export default Login;
