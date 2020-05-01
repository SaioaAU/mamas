import React, { useState } from 'react';

import MamasContext from './context';

const ContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const contextValue = {
    accessToken, setAccessToken, userId, setUserId,
  };

  return (
    <MamasContext.Provider value={contextValue}>
      {children}
    </MamasContext.Provider>
  );
};

export default ContextProvider;
