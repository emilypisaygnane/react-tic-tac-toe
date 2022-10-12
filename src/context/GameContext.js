import { createContext, useContext, useState } from 'react';

const GameContext = createContext();

const GameProvider = ({ children }) => {
  const initialState = new Array(9)
    .fill()
    .map((val, idx) => ({ space: idx, content: '' }));
  
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [board, setBoard] = useState(initialState);
  const [message, setMessage] = useState(`${currentPlayer}'s Turn!`);
  const [active, setActive] = useState(true);
  
  const resetGame = () => {
    setBoard(initialState);
    setActive(true);
    setMessage(`${currentPlayer}'s Turn`);
  };

  const updateSpace = (num) => {
    if (!active) return;
    if (board[num].content !== '') return;

    setBoard((prev) =>
      prev.map((box) => (box.space === num ? { space: num, content: currentPlayer } : box))
    );
    const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
    setCurrentPlayer(nextPlayer);
    setMessage(`Your Turn ${nextPlayer}`);
  };

  const checkWinner = () => {
    if (
      board[0].content !== '' &&
      board[0].content === board[1].content &&
      board[1].content === board[2].content
    ) {
      return board[2].content;
    } else if (
      board[3].content !== '' &&
      board[3].content === board[4].content &&
      board[4].content === board[5].content
    ) {
      return board[5].content;
    } else if (
      board[6].content !== '' &&
      board[6].content === board[7].content &&
      board[7].content === board[8].content
    ) {
      return board[8].content;
    } else if (
      board[0].content !== '' &&
      board[0].content === board[3].content &&
      board[3].content === board[6].content
    ) {
      return board[6].content;
    } else if (
      board[1].content !== '' &&
      board[1].content === board[4].content &&
      board[4].content === board[7].content
    ) {
      return board[7].content;
    } else if (
      board[2].content !== '' &&
      board[2].content === board[5].content &&
      board[5].content === board[8].content
    ) {
      return board[8].content;
    } else if (
      board[0].content !== '' &&
      board[0].content === board[4].content &&
      board[4].content === board[8].content
    ) {
      return board[8].content;
    } else if (
      board[2].content !== '' &&
      board[2].content === board[4].content &&
      board[4].content === board[6].content
    ) {
      return board[6].content;
    } else {
      return false;
    }
  };

  const isCatsGame = () => {
    return board.filter((space) => space.content === '').length === 0;
  };

  const checkGameStatus = () => {
    if (!active) return;
    const winner = checkWinner();
    if (winner) {
      setMessage(`${winner} is the WINNER!`);
      setActive(false);
    } else if (isCatsGame()) {
      setMessage('Meow, Cats Game!');
      setActive(false);
    }
  };

  checkGameStatus();

  return (
    <GameContext.Provider value={{ board, currentPlayer, updateSpace, message, resetGame, active }}>
      {children}
    </GameContext.Provider>
  );
};

const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be contained within a GameProvider');
  }
  return context;
};

export { GameContext, GameProvider, useGame };