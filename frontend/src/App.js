import React from 'react';
// import LandingPage from './features/LandingPage/LandingPage'

import Login from './features/Login/Login';
import useAccessToken from './hooks/useAccessToken';

function App() {
  const { loading, accessToken, setAccessToken } = useAccessToken();

  return (
    <div className="App">
      {loading && <span>Loading...</span>}
      {!loading && !accessToken && <Login setAccessToken={setAccessToken} />}
      {!loading && Boolean(accessToken) && <span>LOGGED IN!!!</span>}
    </div>
  );
}

export default App;
