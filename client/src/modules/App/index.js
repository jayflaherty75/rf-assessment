import React from 'react';
import logo from './images/logo.svg';
import { Outlet, Link } from "react-router-dom";
import './index.css';

function App({ children }) {
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
        <Outlet />
        <Link to="/">Home</Link>
        <Link to="page2">Page 2</Link>
        <Link to="page3">Page 3</Link>
      </header>
    </div>
  );
}

export default App;
