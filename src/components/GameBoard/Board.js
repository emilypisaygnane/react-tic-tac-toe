import './Board.css';
import { GameContext } from '../../context/GameContext';
import { useContext } from 'react';
import Box from './Box';

export default function Board() {
  const { board } = useContext(GameContext);

  return (
    <div className="board">
      {board.map(({ space, content }) => (
        <Box key={space}
          space={space}
          content={content} />
      ))}
    </div>
  );
}