import React from 'react';

import LandingPage from './features/LandingPage/LandingPage';
import ContextProvider from './state/ContextProvider';

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <LandingPage />
      </ContextProvider>
    </div>
  );
}

export default App;
