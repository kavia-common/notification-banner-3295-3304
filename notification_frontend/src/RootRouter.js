import React from 'react';
import App from './App';
import ToastShowcase from './pages/ToastShowcase';

/**
 * PUBLIC_INTERFACE
 * RootRouter
 * Minimal client-side router without external dependencies.
 * - If path is '/toast-showcase' renders the ToastShowcase page
 * - Else renders the default App
 * 
 * This approach avoids adding new dependencies and works with simple anchor navigation.
 */
export default function RootRouter() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  if (path === '/toast-showcase') {
    return <ToastShowcase />;
  }
  return <App />;
}
