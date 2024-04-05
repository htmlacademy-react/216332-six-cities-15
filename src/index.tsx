import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import {store} from './store';
import {HelmetProvider} from 'react-helmet-async';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Provider store = {store}>
          <ToastContainer/>
          <App/>
        </Provider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
