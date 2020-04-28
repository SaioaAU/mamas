import { useEffect, useState } from 'react';
import jwt from 'jwt-simple';


const API_URL = 'http://localhost:8000/api';

const SECRET_KEY = ''; // TODO: Get new secret key from env


// Get accessToken and refreshToken from localstorage
// if the accessToken is up to date, return it
// otherwise, get a new one using refresh token and
// set the new access and refresh token in localStorage
const useAccessToken = () => {
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);

  const fetchAccessToken = async (refreshToken) => {
    const { localStorage } = window;
    const refreshTokenFromLocalStorage = localStorage.getItem('mamas-refresh-token');

    if (!refreshTokenFromLocalStorage) {
      setLoading(false);
      return;
    }

    const url = `${API_URL}/token/refresh/`;
    const data = JSON.stringify({ refresh: refreshToken });

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
      try {
        jwt.decode(accessTokenFromLocalStorage, SECRET_KEY);
        setAccessToken(accessTokenFromLocalStorage);
        setLoading(false);
      } catch (error) {
        fetchAccessToken();
      }
    } else {
      fetchAccessToken();
    }
  }, []);

  return { loading, accessToken, setAccessToken };
};

export default useAccessToken;
