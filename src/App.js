import React, { useState } from 'react'
import "./App.css";
import Point from './Point';
import SnakeBoard from './SnakeBoard';

const App = () => {
  const [ points, setPoints ] = useState(0)
  return (
    <div className="app">
      <header className="header"> Matopeli </header>
      <Point pisteet={points} />
      <SnakeBoard points={points} setPoints={setPoints} />
    </div>
  )
}

export default App;