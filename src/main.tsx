import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';

import App from './App';
import { AdminProvider, AuthProvider, UiProvider } from './contexts';
import { lightTheme } from './themes';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <AdminProvider>
        <UiProvider>
          <ThemeProvider theme={lightTheme}>
            <App />
            <CssBaseline />
          </ThemeProvider>
        </UiProvider>
      </AdminProvider>
    </AuthProvider>
  </React.StrictMode>
);
