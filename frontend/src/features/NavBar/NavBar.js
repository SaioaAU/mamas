import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import useProfile from '../../hooks/useProfile';

import useAuthentication from '../../hooks/useAuthentication';

const NavBar = () => {
  const {
    isLoggedIn, setIsLoggedIn, setAccessToken, accessToken,
  } = useAuthentication();

  const profile = useProfile(accessToken, isLoggedIn);

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
      {Boolean(profile && profile.username) && <span>{profile.username}</span>}
      {Boolean(isLoggedIn) && (
      <>
        <button type="button" onClick={logOut}>Log out</button>
        <Link to="/diary">diary</Link>
        <Link to="/babies">BABY</Link>
        <Link to="/profile">profile</Link>
        <Link to="/">Home</Link>
      </>
      )}
    </div>
  );
};

export default NavBar;
