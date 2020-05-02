import { useCallback } from 'react';

const API_URL = process.env.REACT_APP_API_URL;

const useProfile = (accessToken) => {
  const fetchUser = useCallback(async () => {
    const url = `${API_URL}/user/detail/`;
    const headers = { Authorization: `JWT ${accessToken}` };
    const response = await fetch(url, { headers });

    if (response.status !== 200) return null;

    const profile = await response.json();
    return profile;
  }, [accessToken]);
  return fetchUser;
};

export default useProfile;
