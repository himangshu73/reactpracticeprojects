import { useState } from "react";
import "./styles.css";
import { FaBedPulse } from "react-icons/fa6";

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isNext, setIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function checkWinner(newBoard) {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        newBoard[a] &&
        newBoard[a] == newBoard[b] &&
        newBoard[a] == newBoard[c]
      ) {
        setWinner(newBoard[a]);
        return;
      }
    }
    if (newBoard.every((cell) => cell !== "")) {
      setIsDraw(true);
    }
  }

  function handleClick(index) {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isNext ? "X" : "O";

    setBoard(newBoard);
    setIsNext(!isNext);
    checkWinner(newBoard);
  }

  const renderCell = (index) => {
    return (
      <div className="cell" onClick={() => handleClick(index)}>
        {board[index]}
      </div>
    );
  };

  return (
    <div className="container">
      <div className="status">
        {winner
          ? `Player ${winner} wins.`
          : isDraw
          ? "It's a draw!"
          : `Next Player: ${isNext ? "X" : "O"}`}
      </div>
      <div className="row">
        {renderCell(0)}
        {renderCell(1)}
        {renderCell(2)}
      </div>
      <div className="row">
        {renderCell(3)}
        {renderCell(4)}
        {renderCell(5)}
      </div>
      <div className="row">
        {renderCell(6)}
        {renderCell(7)}
        {renderCell(8)}
      </div>
      <button
        className="restart"
        onClick={() => {
          setBoard(Array(9).fill(""));
          setIsNext(true);
          setWinner(null);
          setIsDraw(false);
        }}
      >
        Restart Game
      </button>
    </div>
  );
}
