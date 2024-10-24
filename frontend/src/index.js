import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import './bootstrap.min.css';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container); // Create a root.
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
