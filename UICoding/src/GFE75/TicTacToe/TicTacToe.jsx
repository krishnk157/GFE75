import { useState } from "react";

function checkWinner(board, size) {
  //check for rows
  for (let i = 0; i < size; i++) {
    const symbol = board[i][0];
    if (symbol) {
      let winner = true;
      for (let j = 1; j < size; j++) {
        if (symbol !== board[i][j]) {
          winner = false;
          break;
        }
      }
      if (winner) {
        return symbol;
      }
    }
  }

  // Check for cols
  for (let j = 0; j < size; j++) {
    const symbol = board[0][j];
    if (symbol) {
      let winner = true;
      for (let i = 1; i < size; i++) {
        if (symbol !== board[i][j]) {
          winner = false;
          break;
        }
      }
      if (winner) {
        return symbol;
      }
    }
  }

  //check for main diagonal
  let symbol = board[0][0];
  let winner = true;
  if (symbol) {
    for (let i = 1; i < size; i++) {
      if (symbol != board[i][i]) {
        winner = false;
        break;
      }
    }
    if (winner) {
      return symbol;
    }
  }

  // check for anti-diagonal
  symbol = board[0][size - 1];
  winner = true;
  if (symbol) {
    for (let i = 1; i < size; i++) {
      if (symbol != board[i][size - 1 - i]) {
        winner = false;
        break;
      }
    }
    if (winner) {
      return symbol;
    }
  }

  return null;
}

function initialState(size) {
  return Array.from({ length: size }, () => new Array(size).fill(null));
}

function Board({ size, board, handleClick }) {
  return (
    <div
      className="board"
      style={{ gridTemplateColumns: `repeat(${size},50px)` }}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            className="cell"
            key={`${rowIndex + colIndex}`}
            onClick={() => handleClick(rowIndex, colIndex)}
          >
            {cell}
          </div>
        ))
      )}
    </div>
  );
}

function TicTacToe({ size = 3 }) {
  const [board, setBoard] = useState(initialState(size));
  const [turnX, setTurnX] = useState(true);
  const winner = checkWinner(board, size);
  const turn = turnX ? "Player X turn" : "Player O turn";

  const handleClick = (rowIndex, colIndex) => {
    if (board[rowIndex][colIndex] || winner) return;
    let boardCopy = structuredClone(board);
    boardCopy[rowIndex][colIndex] = turnX ? "X" : "O";
    setBoard(boardCopy);
    setTurnX((prev) => !prev);
  };

  const handleReset = () => {
    setBoard(initialState(size));
  };

  return (
    <div className="container">
      <Board size={size} board={board} handleClick={handleClick} />
      <div className="status">{winner ? `Winner is ${winner}` : turn}</div>
      <button onClick={handleReset} className="btn-reset">
        Reset
      </button>
    </div>
  );
}

export default function App() {
  return <TicTacToe size={4} />;
}
