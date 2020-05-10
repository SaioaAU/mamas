import React from 'react';
import useAuthentication from '../../hooks/useAuthentication';
import useProfile from '../../hooks/useProfile';

const Diary = () => {
  const {
    isLoggedIn, accessToken,
  } = useAuthentication();

  const profile = useProfile(accessToken, isLoggedIn);

  return (
    <>
      Diary
      {Boolean(profile && profile.diary) && <span>{profile.diary}</span>}
    </>
  );
};

export default Diary;
