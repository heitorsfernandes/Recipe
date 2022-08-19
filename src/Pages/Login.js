import React from 'react';

function Login() {
  return (

    <div>
      <form>
        <label htmlFor="email">
          email:
          <input
            data-testid="email-input"
            type="text"
          />
        </label>
        <br />
        <label htmlFor="password">
          senha:
          <input
            data-testid="password-input"
            type="text"
          />
        </label>
        <br />
        <button
          type="button"
          data-testid="login-submit-btn"
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
