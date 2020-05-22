import { Link } from 'react-router-dom';
import React from 'react';
import { capitalize } from 'lodash';
import useBabies from '../../hooks/useBabies';
import useAuthentication from '../../hooks/useAuthentication';
// import { useHistory } from 'react-router-dom';

const Baby = () => {
  const {
    isLoggedIn, accessToken,
  } = useAuthentication();

  const babies = useBabies(accessToken, isLoggedIn);
  if (!babies) return 'loading';
  return (
    <>
      {Boolean(babies) && (
      <ul>
        {babies.map((baby) => (
          <li>
            <Link to={`/baby/${baby.id}`}>{capitalize(baby.name)}</Link>
          </li>
        ))}
      </ul>
      )}
      <Link to="/baby/create">create a baby</Link>
    </>
  );
};

export default Baby;
