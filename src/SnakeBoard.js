import React, { useState, useEffect } from 'react';
import "./SnakeBoard.css";
import { range, useInterval } from './utils';

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

  const getObstacles = [
    {
      name: "tyhja",
      location: []
    },
    {
      name: "oma",
      location: [{x: 6, y: 15}, {x: 1, y: 10}, {x: 5, y: 5}]
    },
    {
      name: "keski",
      location: range(width * 0.6).map(y => ({
        x: Math.round(height / 2),
        y: y + Math.ceil(width * 0.2)
      }))
    },
    {
      name: "reunat",
      location: [
        ...range(width).map(x => ({x, y: 0})),
        ...range(width).map(x => ({x, y: width -1})),
        ...range(height).map(y => ({x: 0, y})),
        ...range(height).map(y => ({x: height -1, y}))
      ]
    }
  ]

  const randomObstacle = () => getObstacles[Math.floor(Math.random() * getObstacles.length)]

  const randomPosition = () => {
    const position = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height)
    }
    if (obstacle.location.some(({x, y}) => position.x === x && position.y === y)) {
      return randomPosition();
    }
    return position;
  }

  const [ rows, setRows ] = useState(getInitialRows())
  const [ snake, setSnake ] = useState([{x:1, y:1}])
  const [ obstacle, setObstacle ] = useState(randomObstacle())
  const [ direction, setDirection ] = useState("right")
  const [ food, setFood ] = useState(randomPosition())
  const [ intervalId, setIntervalId ] = useState()

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

  const displaySnake = () => {
    const newRows = getInitialRows();
    snake.forEach(tile => {
      newRows[tile.x][tile.y] = "snake"
    })
    newRows[food.x][food.y] = "food"
    obstacle.location.forEach(tile => {
      newRows[tile.x][tile.y] = "obstacle"
    })
    setRows(newRows)
  }

  const changeDirection = (e) => {
    const { key } = e
    switch (key) {
      case "ArrowLeft":
        setDirection("left")
        break;
      case "ArrowUp":
        setDirection("up")
        break;
      case "ArrowRight":
        setDirection("right")
        break;
      case "ArrowDown":
        setDirection("down")
        break;
      default:
        break;
    }
  }
  document.addEventListener("keydown", changeDirection)

  const checkGameOver = () => {
    const head = snake[0]
    const body = snake.slice(1, -1)
    const hitSnake = body.find(b => b.x === head.x && b.y === head.y)
    const hitWall = obstacle.location.some(({x,y}) => head.x === x && head.y === y)
    return hitSnake || hitWall
  }

  const moveSnake = () => {
    if (!startGame) return;
    const newSnake = []

    switch(direction) {
      case "right":
        newSnake.push({ x: snake[0].x, y: (snake[0].y + 1) % width })
        break;
      case "left":
        newSnake.push({x: snake[0].x, y: (snake[0].y - 1 + width) % width })
        break;
      case "up":
        newSnake.push({x: (snake[0].x -1 + height) % height, y: snake[0].y  })
        break;
      case "down":
        newSnake.push({x: (snake[0].x + 1) % height, y: snake[0].y})
        break;
      default:
        break;
    }

    if (checkGameOver()) {
      clearInterval(intervalId)
    }

    snake.forEach(tile => {
      newSnake.push(tile)
    })
    const madonPaa = snake[0]
    if (madonPaa.x === food.x && madonPaa.y === food.y) {
      setFood(randomPosition)
    } else {
      newSnake.pop()
    }

    setSnake(newSnake)
    displaySnake();
  }

  useInterval(moveSnake, 150, setIntervalId)
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