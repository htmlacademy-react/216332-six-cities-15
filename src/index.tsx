import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import {store} from './store';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store = {store}>
        <ToastContainer/>
        <App/>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
