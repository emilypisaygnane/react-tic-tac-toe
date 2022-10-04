import { createContext, useContext, useState } from 'react';

const GameContext = createContext();

const GameProvider = ({ children }) => {
  const initialState = newArray(9).fill().map((val, idx) => ({ space: idx, content: '' }));
  
  const [currentPlayer, setCurrentPlayer] = useState();
  const [board, setBoard] = useState('X');
  const [message, setMessage] = useState(`${currentPlayer}'s Turn!`);
  const [active, setActive] = useState(true);
  

  return (
    <GameContext.Provider value={{ currentPlayer, setCurrentPlayer }}>
      {children}
    </GameContext.Provider>
  );
};

// const useGame = () => {
//   const context = useContext(GameContext);
//   if (context === undefined) {
//     throw new Error('useGame must be contained within a GameProvider');
//   }
//   return context;
// };

export { GameContext, GameProvider };