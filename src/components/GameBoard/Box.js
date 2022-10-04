import { useContext } from 'react';
import { GameContext } from '../../context/GameContext';

export default function Box({ space, content }) {
  const { updateSpace } = useContext(GameContext);
  return (
    <div onClick={() => updateSpace(space)} id={space} className="box">
      {content}
    </div>
  );
}