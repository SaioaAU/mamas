import React from 'react';
import { Link } from 'react-router-dom';
import { capitalize } from 'lodash';
import useBaby from '../../../hooks/useBaby';
import useAuthentication from '../../../hooks/useAuthentication';


const Baby = () => {
  const {
    isLoggedIn, accessToken,
  } = useAuthentication();
  const baby_response = useBaby(accessToken, isLoggedIn);
  if (!baby_response) return 'loading';
  const { baby, diary } = baby_response;

  return (

    <>
      {Boolean(baby) && (
      <ul>
        <li>
          {capitalize(baby.name)}
        </li>
        <li>
          {capitalize(diary.id)}
        </li>
      </ul>
      )}
      <Link to="/babies/create">create a baby</Link>
    </>
  );
};

export default Baby;
