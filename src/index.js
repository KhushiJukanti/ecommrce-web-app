import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/css/bootstrap.min.css"

import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();









// ecommerce-app/
// ├── public/
// │   ├── index.html
// │   └── ...
// ├── src/
// │   ├── components/
// │   │   ├── ProductList.js
// │   │   ├── ProductItem.js
// │   │   └── Checkout.js
// │   ├── context/
// │   │   └── AuthContext.js
// │   ├── pages/
// │   │   ├── HomePage.js
// │   │   ├── LoginPage.js
// │   │   ├── CartPage.js
// │   │   └── AdminPage.js
// │   ├── App.js
// │   ├── index.js
// │   └── api/
// │       └── api.js
// └── db.json


// ecommerce-app/
// ├── public/
// │   ├── index.html
// ├── src/
// │   ├── components/
// │   │   ├── ProductList.js
// │   │   ├── Checkout.js
// │   │   └── ProductItem.js
// │   ├── context/
// │   │   └── AuthContext.js
// │   ├── pages/
// │   │   ├── HomePage.js
// │   │   ├── LoginPage.js
// │   │   ├── CartPage.js
// │   │   └── AdminPage.js
// │   ├── App.js
// │   ├── index.js
// │   ├── api/
// │   │   └── api.js
// │   └── styles/
// │       └── App.css
// └── db.json


