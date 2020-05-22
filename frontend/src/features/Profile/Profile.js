import React from 'react';
import { capitalize } from 'lodash';
import useAuthentication from '../../hooks/useAuthentication';
import useProfile from '../../hooks/useProfile';

const Profile = () => {
  const {
    isLoggedIn, accessToken,
  } = useAuthentication();

  const profile = useProfile(accessToken, isLoggedIn);

  return (
    <>
      Profile
      <br />
      {Boolean(profile && profile.username) && <span>{capitalize(profile.username)}</span>}
    </>
  );
};


export default Profile;
