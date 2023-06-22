import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css"
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IntlProvider } from 'react-intl';

const root = ReactDOM.createRoot(document.getElementById('root'));

document.title = 'N2D shop'
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <IntlProvider>
      <App />
      </IntlProvider>
     
    </BrowserRouter>
  </React.StrictMode>
);


