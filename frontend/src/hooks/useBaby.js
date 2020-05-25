import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

const useBaby = (accessToken, isLoggedIn) => {
  const [baby, setBaby] = useState(null);
  const params = useParams();
  const fetchBaby = useCallback(async () => {
    const url = `${API_URL}/babies/${params.id}`;
    const headers = { Authorization: `JWT ${accessToken}` };
    const response = await fetch(url, { headers });

    if (response.status !== 200) return;

    const babiesResult = await response.json();
    setBaby(babiesResult);
  }, [accessToken, params.id]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchBaby();
    } else setBaby(null);
  }, [fetchBaby, isLoggedIn]);
  return baby;
};

export default useBaby;
