import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LandingPage from './features/LandingPage/LandingPage';
import Login from './features/Login/Login';
import Diary from './features/Diary/Diary';
import Profile from './features/Profile/Profile';
import Baby from './features/Baby/Baby';

import ContextProvider from './state/ContextProvider';

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/diary">
              <Diary />
            </Route>
            <Route path="/baby">
              <Baby />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <LandingPage />
            </Route>
          </Switch>
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;
