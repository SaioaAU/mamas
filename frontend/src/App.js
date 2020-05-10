import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './features/NavBar';
import {
  LandingPage, Login, Baby, Diary, Profile,
} from './features';

import ContextProvider from './state/ContextProvider';

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <BrowserRouter>
          <NavBar />
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
