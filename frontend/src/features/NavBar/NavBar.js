import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useAuthentication from '../../hooks/useAuthentication';

const API_URL = process.env.REACT_APP_API_URL;

const NavBar = () => {
  const { isLoggedIn, accessToken } = useAuthentication();
  const [userName, setUserName] = useState(null);

  const fetchUser = useCallback(async () => {
    const url = `${API_URL}/user/detail/`;
    const headers = { Authorization: `JWT ${accessToken}` };
    const response = await fetch(url, { headers });

    if (response.status !== 200) return;

    const { username } = await response.json();
    setUserName(username);
  }, [accessToken]);

  useEffect(() => {
    if (isLoggedIn) fetchUser();
  }, [fetchUser, isLoggedIn]);

  return (
    <div>
      {!isLoggedIn && <Link to="/login">Log in</Link>}
      {Boolean(userName) && <span>{userName}</span>}
    </div>
  );
};

export default NavBar;
