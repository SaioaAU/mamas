import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useProfile from '../../hooks/useProfile';

import useAuthentication from '../../hooks/useAuthentication';

const NavBar = () => {
  const {
    isLoggedIn, setIsLoggedIn, setAccessToken, accessToken,
  } = useAuthentication();
  const [userName, setUserName] = useState(null);


  const fetchProfile = useProfile(accessToken);

  const fetchUserName = useCallback(async () => {
    const profile = await fetchProfile();
    setUserName(profile.username);
  }, [fetchProfile]);


  useEffect(() => {
    if (isLoggedIn) {
      fetchUserName();
    } else setUserName(null);
  }, [fetchProfile, fetchUserName, isLoggedIn]);

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
