import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import MamasContext from '../../state/context';

const API_URL = 'http://localhost:8000/api';

const Login = () => {
  const { setAccessToken } = useContext(MamasContext);
  // const history = useHistory()
  // const push = history.push;
  // Same as:
  const { push } = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const onChangeEmail = (event) => {
    const userInput = event.target.value;
    setUsername(userInput);
  };

  const onChangePassword = (event) => {
    const userInput = event.target.value;
    setPassword(userInput);
  };

  const submit = async () => {
    const url = `${API_URL}/token/obtain/`;
    const data = JSON.stringify({ username, password });

    const response = await fetch(url, {
      method: 'POST',
      body: data,
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status !== 200) {
      setError('Could not log in');
      return;
    }

    setError(null);
    const { access, refresh } = await response.json();

    const { localStorage } = window;
    localStorage.setItem('mamas-refresh-token', refresh);
    setAccessToken(access);
    push('/');
  };

  return (
    <div>
      <h1>Login</h1>
      <br />
      <label htmlFor="loginEmailInput">
        User name
        {' '}
        <input value={username} onChange={onChangeEmail} type="username" id="loginEmailInput" />
      </label>
      <br />
      <br />
      <label htmlFor="loginPasswordInput">
        Password
        {' '}
        <input value={password} onChange={onChangePassword} type="password" id="loginPasswordInput" />
      </label>
      {Boolean(error) && (
        <>
          <br />
          <br />
          <span>
            Error:
            {' '}
            {error}
          </span>
        </>
      )}
      <br />
      <br />
      <button type="submit" onClick={submit}>Login</button>
    </div>
  );
};

export default Login;
