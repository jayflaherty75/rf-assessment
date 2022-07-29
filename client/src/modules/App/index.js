import React from 'react';
import { Outlet } from "react-router-dom";
import Breadcrumb from 'modules/Shared/flowbite/breadcrumb';
import './index.css';

const links = [
  { name: 'Lists', url: '/lists' },
  { name: 'Tasks', url: '/tasks' }
];

function App() {
  return (
    <div className="App">
      <Breadcrumb links={links} />
      <br/>
      <div><Outlet /></div>
    </div>
  );
}

export default App;
