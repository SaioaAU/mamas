import {
  useCallback, useContext, useEffect, useState,
} from 'react';
import jwtDecode from 'jwt-decode';

import MamasContext from '../state/context';

const API_URL = process.env.REACT_APP_API_URL;

const isTokenExpired = (token) => {
  const { exp } = jwtDecode(token);
  return exp < (new Date().getTime()) / 1000 + 10;
};

const getUserId = (token) => {
  const { user_id } = jwtDecode(token); // eslint-disable-line camelcase
  return user_id; // eslint-disable-line camelcase
};

// 1. Look for access token in context (i.e. global state)
// 2. If the token is not expired, return it and the user id
// 3: If it is expired, try to get the refresh token from localStorage
// 4. If the refresh token is expired or not in localStorage, indicate that a login is necessary
// 5. Otherwise, get a new access token and return it
const useAuthentication = () => {
  // const context = useContext(MamasContext)
  // const accessToken = context.accessToken
  // Same as:
  const { accessToken, setAccessToken } = useContext(MamasContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFetchingToken, setIsFetchingToken] = useState(false); // TODO
  const [userId, setUserId] = useState(null);

  const fetchAccessToken = useCallback(async () => {
    // const localStorage = window.localStorage;
    // Same as:
    const { localStorage } = window;
    const refreshTokenFromLocalStorage = localStorage.getItem('mamas-refresh-token');

    if (!refreshTokenFromLocalStorage) return;

    setIsFetchingToken(true);
    const url = `${API_URL}/token/refresh/`;
    const data = JSON.stringify({ refresh: refreshTokenFromLocalStorage });

    const response = await fetch(url, {
      method: 'POST',
      body: data,
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status !== 200) return;

    const { access, refresh } = await response.json();

    localStorage.setItem('mamas-refresh-token', refresh);
    setAccessToken(access);
    setIsFetchingToken(false);
  }, [setAccessToken]);

  useEffect(() => {
    if (!accessToken) fetchAccessToken();
    else if (isTokenExpired(accessToken)) {
      setAccessToken(null);
      fetchAccessToken();
    } else {
      setIsLoggedIn(true);
      const userIdFromAccessToken = getUserId(accessToken);
      setUserId(userIdFromAccessToken);
    }
  }, [accessToken, fetchAccessToken, setAccessToken]);

  return {
    isLoggedIn, isFetchingToken, accessToken, userId, setIsLoggedIn, setAccessToken,
  };
};

export default useAuthentication;
