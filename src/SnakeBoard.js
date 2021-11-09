import React, { useState } from 'react';
import "./SnakeBoard.css";

const SnakeBoard = ({ points, setPoints }) => {
  const [ width, setWidth ] = useState(40);
  const [ height, setHeight ] = useState(40);
  const [ startGame, setStartGame ] = useState(false);
  const [ error, setError ] = useState(null);

  const getInitialRows = () => {
    let initialRows = []
    for (let y = 0; y < height; y++) {
      initialRows[y] = []
      for (let x = 0; x < width; x++) {
        initialRows[y][x] = "blank"
      }
    }
    return initialRows;
  }

  return (
    <div>
      {!startGame && (
        <div>
          <div> Pelilaudan koko on nyt {width} ruutua. </div>
          <div> Muuta halutessasi ruudun kokoa </div>
          <input 
            placeholder="Koko 10-100"
            type="number"
            onChange={e => {
              const size = parseInt(e.target.value);
              console.log('size', size);
              if (size <= 100 && size >= 10) {
                setWidth(size)
                setHeight(size)
                localStorage.setItem("snake-board-size", size)
                setError(null)
              } else {
                setError(`Pelilaudan koko on liian ${size > 100 ? "suuri" : "pieni"}`)
              }
            }}
          />
          {error && <div className="Error"> {error} </div> }
          {!error && 
            <button onClick={() => setStartGame(!startGame)}>
              Aloita peli
            </button>
          }
          
        </div>
      )}
    </div>
  )
};

export default SnakeBoard;