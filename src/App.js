import './App.css';
import Board from './components/GameBoard/Board';
import GameHeader from './components/GameHeader/GameHeader';

function App() {
  return (
    <div className="App">
      <h1>TIC TAC TOE</h1>
      <GameHeader />
      <Board />
    </div>
  );
}

export default App;
