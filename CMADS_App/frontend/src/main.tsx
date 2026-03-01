import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import Login from './pages/Login';
import Picker from './pages/Picker';
import Dashboard from './pages/Dashboard';
import Architecture from './pages/Architecture';
import './index.css';

// We inject this via Vite env vars, configured in the local .env file.
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Login />} />
            <Route path="picker" element={<Picker />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="architecture" element={<Architecture />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
