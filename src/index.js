import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TheLeadsWebsite from './TheLeadsWebsite1';
import AdminDashboard from './AdminDashboard';
import reportWebVitals from './reportWebVitals';

const isAdmin = window.location.pathname === '/admin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {isAdmin ? <AdminDashboard /> : <TheLeadsWebsite />}
  </React.StrictMode>
);

reportWebVitals();
