import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

const API_URL = process.env.REACT_APP_API_URL;

const isTokenExpired = (token) => {
  const { exp } = jwtDecode(token);
  return exp < (new Date().getTime()) / 1000 + 10;
};

// Get accessToken and refreshToken from localstorage
// if the accessToken is up to date, return it
// otherwise, get a new one using refresh token and
// set the new access and refresh token in localStorage
const useAccessToken = () => {
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);

  const fetchAccessToken = async () => {
    const { localStorage } = window;
    const refreshTokenFromLocalStorage = localStorage.getItem('mamas-refresh-token');

    if (!refreshTokenFromLocalStorage) {
      setLoading(false);
      return;
    }

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
    localStorage.setItem('mamas-access-token', access);
    setAccessToken(access);
    setLoading(false);
  };

  useEffect(() => {
    const { localStorage } = window;
    const accessTokenFromLocalStorage = localStorage.getItem('mamas-access-token');

    if (accessTokenFromLocalStorage) {
      if (isTokenExpired(accessTokenFromLocalStorage)) {
        fetchAccessToken();
      } else {
        setAccessToken(accessTokenFromLocalStorage);
        setLoading(false);
      }
    } else {
      fetchAccessToken();
    }
  }, []);

  return { loading, accessToken, setAccessToken };
};

export default useAccessToken;
