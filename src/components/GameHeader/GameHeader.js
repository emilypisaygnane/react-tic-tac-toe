import { useContext } from 'react';
import { GameContext } from '../../context/GameContext';

export default function GameHeader() {
  const { message, active, resetGame } = useContext(GameContext);
  return (
    <div>
      <h3>{message}</h3>
      {!active && <button onClick={resetGame}>Play Again?</button>}
    </div>
  );
}