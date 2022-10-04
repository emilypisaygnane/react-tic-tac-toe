import { useContext } from 'react';
import { GameContext } from '../../context/GameContext';

export default function GameHeader() {
  const { message } = useContext(GameContext);
  return (
    <div>
      <h3>{message}</h3>
      {/* {!active && } */}
    </div>
  );
}