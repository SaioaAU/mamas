import { useCallback, useEffect, useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL;

const useProfile = (accessToken, isLoggedIn) => {
  const [profile, setProfile] = useState(null);
  const fetchProfile = useCallback(async () => {
    const url = `${API_URL}/user/detail/`;
    const headers = { Authorization: `JWT ${accessToken}` };
    const response = await fetch(url, { headers });

    if (response.status !== 200) return;

    const profileResult = await response.json();
    setProfile(profileResult);
  }, [accessToken]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchProfile();
    } else setProfile(null);
  }, [fetchProfile, isLoggedIn]);
  return profile;
};

export default useProfile;
