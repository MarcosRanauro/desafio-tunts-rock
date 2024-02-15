import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // A tag BorwserRouter é usada para que as rotas funcionem, ela é colocada em apenas 1 arquivo. Optei em colocar no nivel mais alto que é o index.js
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
