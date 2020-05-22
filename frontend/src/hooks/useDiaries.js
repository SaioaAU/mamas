import { useCallback, useEffect, useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL;

const useDiaries = (accessToken, isLoggedIn) => {
  const [diaries, setDiaries] = useState(null);
  const fetchDiaries = useCallback(async () => {
    const url = `${API_URL}/diaries/diaries`;
    const headers = { Authorization: `JWT ${accessToken}` };
    const response = await fetch(url, { headers });

    if (response.status !== 200) return;

    const diariesResult = await response.json();
    setDiaries(diariesResult);
  }, [accessToken]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchDiaries();
    } else setDiaries(null);
  }, [fetchDiaries, isLoggedIn]);
  return diaries;
};

export default useDiaries;
