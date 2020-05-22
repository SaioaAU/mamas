import { useCallback, useEffect, useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL;

const useBabies = (accessToken, isLoggedIn) => {
  const [babies, setBabies] = useState(null);
  const fetchBabies = useCallback(async () => {
    const url = `${API_URL}/babies/babies`;
    const headers = { Authorization: `JWT ${accessToken}` };
    const response = await fetch(url, { headers });

    if (response.status !== 200) return;

    const babiesResult = await response.json();
    setBabies(babiesResult);
  }, [accessToken]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchBabies();
    } else setBabies(null);
  }, [fetchBabies, isLoggedIn]);
  return babies;
};

export default useBabies;
