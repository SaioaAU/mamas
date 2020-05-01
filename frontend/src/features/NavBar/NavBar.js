import React from 'react';

import useAuthentication from '../../hooks/useAuthentication';

const NavBar = () => {
  const { isLoggedIn, accessToken, userId } = useAuthentication();
  console.log('😱', { isLoggedIn, accessToken, userId });

  return (
    <div>
      {!isLoggedIn && <button type="button">Log in</button>}
    </div>
  );
};

export default NavBar;
