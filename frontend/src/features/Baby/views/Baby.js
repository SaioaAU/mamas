import React from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { capitalize } from 'lodash';
import useBaby from '../../../hooks/useBaby';
import useAuthentication from '../../../hooks/useAuthentication';

const API_URL = process.env.REACT_APP_API_URL;


const Baby = () => {
  const {
    isLoggedIn, accessToken,
  } = useAuthentication();
  const babyResponse = useBaby(accessToken, isLoggedIn);
  const params = useParams();
  const history = useHistory();
  if (!babyResponse) return 'loading';
  const { baby, diary } = babyResponse;
  const deleteBaby = async () => {
    const url = `${API_URL}/babies/delete/${params.id}`;
    const headers = { Authorization: `JWT ${accessToken}`, 'Content-Type': 'application/json' };
    await fetch(url, {
      method: 'DELETE',
      headers,
    });
    history.push('/babies');
  };
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
      <Link to="/babies/create">create a new baby</Link>
      <br />
      <button type="button" onClick={deleteBaby}> delete this baby</button>
    </>
  );
};

export default Baby;
