// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ screens }) => {
  return (
    <div className="sidebar">
      <h2>Flowbit</h2>
      {screens.map((screen, idx) => (
        <Link key={idx} to={`/${screen.screenUrl}`}>
          {screen.screenUrl}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
