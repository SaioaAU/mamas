import React from 'react';
import useAuthentication from '../../hooks/useAuthentication';
import useDiaries from '../../hooks/useDiaries';

const Diary = () => {
  const {
    isLoggedIn, accessToken,
  } = useAuthentication();

  const diaries = useDiaries(accessToken, isLoggedIn);

  return (
    <>
      Diary hellloooooo
      {Boolean(diaries && diaries.diary) && <span>{diaries.diary}</span>}
    </>
  );
};

export default Diary;
