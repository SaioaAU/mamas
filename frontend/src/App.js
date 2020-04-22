import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const SuperCrazyComponent = ({ text, numberOfCrazies }) => {
  const [hasBeenClicked, setHasBeenClicked] = useState(false);

  const onClickFunction = () => setHasBeenClicked(true);

  useEffect(() => {
    if (hasBeenClicked) setTimeout(() => setHasBeenClicked(false), 1000)
  }, [hasBeenClicked]) // Whenever hasBeenClicked changes, useEffect will run the function in the 1st argument

  return (
    <div style={{ position: 'fixed', bottom: 0, color: 'white'}}>
      {[...Array(numberOfCrazies)].map((_, index) =>
        <div key={`element-${index}`} >{text}</div>
      )}
      <button onClick={onClickFunction}>Clicked: {hasBeenClicked.toString()}</button>
    </div>
  )
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <SuperCrazyComponent text={'not so crazy'} numberOfCrazies={3}/>
    </div>
  );
}

export default App;
