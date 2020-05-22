import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useAuthentication from '../../../hooks/useAuthentication';

const API_URL = process.env.REACT_APP_API_URL;

const Create = () => {
  const [babyName, setBabyName] = useState('');
  const [dateOfBirth, setdateOfBirth] = useState('');
  const [error, setError] = useState(null);
  const {
    accessToken,
  } = useAuthentication();

  const { push } = useHistory();

  const onChangeBabyname = (event) => {
    const userInput = event.target.value;
    setBabyName(userInput);
  };

  const onChangedateOfBirth = (event) => {
    const userInput = event.target.value;
    setdateOfBirth(userInput);
  };

  const submit = async () => {
    const url = `${API_URL}/babies/create`;
    const headers = { Authorization: `JWT ${accessToken}`, 'Content-Type': 'application/json' };
    const data = JSON.stringify({ name: babyName, date_of_birth: dateOfBirth });

    const response = await fetch(url, {
      method: 'POST',
      body: data,
      headers,
    });

    if (response.status !== 201) {
      setError('Could not create a baby');
    } else {
      push('/baby');
    }
  };

  return (
    <div>
      <h1>create</h1>
      <br />
      <label htmlFor="babyNameInput">
        baby name
        {' '}
        <input value={babyName} onChange={onChangeBabyname} type="babyName" id="babyNameInput" />
      </label>
      <br />
      <br />
      <label htmlFor="dateOfBirthInput">
        dateOfBirth
        {' '}
        <input value={dateOfBirth} onChange={onChangedateOfBirth} type="date" id="dateOfBirthInput" />
      </label>
      {Boolean(error) && (
        <>
          <br />
          <br />
          <span>
            Error:
            {' '}
            {error}
          </span>
        </>
      )}
      <br />
      <br />
      <button type="submit" onClick={submit}>Create a baby</button>
    </div>
  );
};

export default Create;
