// App.js
import React from 'react';
import Routes from './routes/Routes';
import './App.css';

function App() {
  return (
    // Como eu criei um arquivo de rotas, eu posso chamar ele aqui e ele vai funcionar como se fosse um componente, assim não preciso colocar as rotas aqui.
    <div>
        <Routes />
    </div>
  );
}

export default App;
