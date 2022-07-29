import React from 'react';
import { Outlet } from "react-router-dom";
import Breadcrumb from 'modules/Shared/components/breadcrumb';
import './index.css';

const links = [
  { name: 'Page 2', url: '/page2' },
  { name: 'Page 3', url: '/page3' }
];

function App() {
  return (
    <div className="App">
      <Breadcrumb links={links} />
      <div><Outlet /></div>
    </div>
  );
}

export default App;
