import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Main from './react-hooks/Main';
import AuthContextProvider from './context/auth-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
      <Main />
    </AuthContextProvider>
  </React.StrictMode>
);
