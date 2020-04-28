import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = (event) => {
    const userInput = event.target.value;
    setEmail(userInput);
  };

  const onChangePassword = (event) => {
    const userInput = event.target.value;
    setPassword(userInput);
  };

  const submit = () => {
    console.log('🦊', { email, password });
  };

  return (
    <div>
      <h1>Login</h1>
      <br />
      <label htmlFor="loginEmailInput">
        Email
        {' '}
        <input value={email} onChange={onChangeEmail} type="email" id="loginEmailInput" />
      </label>
      <br />
      <br />
      <label htmlFor="loginPasswordInput">
        Password
        {' '}
        <input value={password} onChange={onChangePassword} type="password" id="loginPasswordInput" />
      </label>
      <br />
      <br />
      <button type="submit" onClick={submit}>Login</button>
    </div>
  );
};

export default Login;
