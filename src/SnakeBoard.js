import React, { useState } from 'react';
import "./SnakeBoard.css";

const SnakeBoard = ({ points, setPoints }) => {
  const [ width, setWidth ] = useState(40);
  const [ height, setHeight ] = useState(40);

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
    <div></div>
  )
};

export default SnakeBoard;