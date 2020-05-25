import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './features/NavBar';
import {
  LandingPage, Login, Diary, Profile,
} from './features';
import Create from './features/Baby/views/Create';
import Baby from './features/Baby/views/Baby';
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
            <Route path="/babies/create">
              <Create />
            </Route>
            <Route path="/babies/:id">
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
