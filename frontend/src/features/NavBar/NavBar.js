import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import useAuthentication from '../../hooks/useAuthentication';

const API_URL = process.env.REACT_APP_API_URL;

const NavBar = () => {
  const {
    isLoggedIn, setIsLoggedIn, setAccessToken, accessToken,
  } = useAuthentication();
  const [userName, setUserName] = useState(null);

  const fetchUser = useCallback(async () => {
    const url = `${API_URL}/user/detail/`;
    const headers = { Authorization: `JWT ${accessToken}` };
    const response = await fetch(url, { headers });

    if (response.status !== 200) return;

    const { username } = await response.json();
    setUserName(username);
  }, [accessToken]);

  useEffect(() => {
    if (isLoggedIn) fetchUser();
    else setUserName(null);
  }, [fetchUser, isLoggedIn]);

  const { push } = useHistory();
  const logOut = () => {
    localStorage.clear();
    setAccessToken(null);
    setIsLoggedIn(false);
    push('/');
  };

  return (
    <div>
      {!isLoggedIn && <Link to="/login">Log in</Link>}
      {Boolean(userName) && <span>{userName}</span>}
      {Boolean(isLoggedIn) && (
      <>
        <button type="button" onClick={logOut}>Log out</button>
        <Link to="/Diary">diary</Link>
        <Link to="/Baby">BABY</Link>
        <Link to="/Profile">profile</Link>
        <Link to="/">Home</Link>
      </>
      )}
    </div>
  );
};

export default NavBar;
