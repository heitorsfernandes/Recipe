import React from 'react';

function Login() {
  return (
    <div>
      <label htmlFor="label-email">
        Email
        <input className="field-email" data-testid="email-input" />
      </label>
      <label htmlFor="label-password">
        Password
        <input className="field-password" data-testid="password-input" />
      </label>
      <button type="button" data-testid="login-submit-btn">Enter</button>
    </div>
  );
}

export default Login;
