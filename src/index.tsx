import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Homepage from './containers/Homepage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Builder } from './containers/Builder';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/builder" element={<Builder />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);