import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter} from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Auth0Provider
      domain="dev-2mutvx7d6844il56.us.auth0.com"
      clientId="qKfgF1ISqnxWg3eQXYejQ8CAfZzQ0phQ"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
    <App />
  </Auth0Provider>,
  </BrowserRouter>
);

reportWebVitals();
