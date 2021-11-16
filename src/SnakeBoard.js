import React, { useState, useEffect } from 'react';
import "./SnakeBoard.css";

const SnakeBoard = ({ points, setPoints }) => {
  const [ width, setWidth ] = useState(
    parseInt(localStorage.getItem("snake-board-size")) || 40
  );
  const [ height, setHeight ] = useState(
    parseInt(localStorage.getItem("snake-board-size")) || 40
  );
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

  const [ rows, setRows ] = useState(getInitialRows())

  useEffect(() => {
    if (width >= 10 && width <= 100 && height >= 10 && height <= 100) {
      setRows(getInitialRows())
    }
  }, [width, height])

  const displayRows = rows.map((row, i) => (
    <div className="Snake-row" key={i}>
      {row.map((tile, j) => (
        <div className={`tile ${tile}`} key={`${i}-${j}`}/>
      ))}
    </div>
  ))

  const getObstacles = [
    {
      name: "tyhja",
      location: []
    },
    {
      name: "oma",
      location: [{x: 6, y: 15}, {x: 1, y: 10}, {x: 5, y: 5}]
    }
  ]

  console.log('rivit', rows);
  return (
    <div className="Snake-board">
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
      {startGame && displayRows}
    </div>
  )
};

export default SnakeBoard;