import { Link } from 'react-router-dom';
import React from 'react';
import { capitalize } from 'lodash';
import useBabies from '../../hooks/useBabies';
import useAuthentication from '../../hooks/useAuthentication';
// import { useHistory } from 'react-router-dom';

const Babies = () => {
  const {
    isLoggedIn, accessToken,
  } = useAuthentication();

  const babies = useBabies(accessToken, isLoggedIn);
  console.log(babies);
  if (!babies) return 'loading';
  return (
    <>
      {Boolean(babies) && (
      <ul>
        {babies.map((baby) => (
          <li>
            <Link to={`/babies/${baby.id}`}>{capitalize(baby.name)}</Link>
          </li>
        ))}
      </ul>
      )}
      <Link to="/babies/create">create a baby</Link>
    </>
  );
};

export default Babies;
