import { check } from 'prettier';
import { createContext, useContext, useState } from 'react';

const GameContext = createContext();

const GameProvider = ({ children }) => {
  const initialState = new Array(9).fill().map((val, idx) => ({ space: idx, content: '' }));
  
  const [currentPlayer, setCurrentPlayer] = useState();
  const [board, setBoard] = useState('X');
  const [message, setMessage] = useState(`${currentPlayer}'s Turn!`);
  const [active, setActive] = useState(true);
  
  const resetGame = () => {
    setBoard(initialState);
    setActive(true);
    setMessage('Play Again');
    setCurrentPlayer('X');
  };

  const updateSpace = (num) => {
    if (!active) return;
    if (board[num].content !== '') return;

    setBoard((prev) =>
      prev.map((box) => (box.space === num ? { space: num, content: currentPlayer } : box))
    );
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
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
    <GameContext.Provider value={{ currentPlayer, setCurrentPlayer }}>
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