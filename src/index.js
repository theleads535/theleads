import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TheLeadsWebsite from './TheLeadsWebsite1';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TheLeadsWebsite />
  </React.StrictMode>
);

reportWebVitals();