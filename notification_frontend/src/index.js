import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RootRouter from './RootRouter';
import ToastContainer from './components/ToastContainer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer>
      <RootRouter />
    </ToastContainer>
  </React.StrictMode>
);
