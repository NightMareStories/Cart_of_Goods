import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';

/*======================= Redux =========================*/

import store from './store';
import { Provider } from 'react-redux';

/*=======================================================*/

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
