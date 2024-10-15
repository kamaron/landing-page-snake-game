import React from 'react';
import './App.css';
import SnakeGame from './SnakeGame';

function App() {
  return (
    <div className="App">
      <div className="content">
        <h1>Pausa creativa</h1>
        <p className='description'>Trabajando en una versión mejorada de nuestros servicios</p>
        <div className="game">
          <h2>Mientras esperas, juega a Snake</h2>
          <SnakeGame />
        </div>
      </div>
    </div>
  );
}

export default App;
