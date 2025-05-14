import { useGame } from "../context/GameContext";
import Hole from "./hole";

export default function GameBoard() {
  const { score, timeLeft, currentHole, whackMole, restartGame } = useGame();

  const NUM_HOLES = 9; //CHANGE THIS IF YOU WANT MORE HOLES

  const handleHoleClick = (index) => {
    if (index === currentHole) {
      whackMole();
    }
  };
  const holes = Array.from({ length: NUM_HOLES }, (_, i) => (
    <Hole
      key={i}
      isActive={i === currentHole}
      onClick={() => handleHoleClick(i)}
    />
  ));

  return (
    <div className="game-board">
      <h2>Score: {score}</h2>
      <h2>Time Left: {timeLeft}</h2>
      <div className="holes-grid">{holes}</div>
      <button onClick={restartGame}>restart</button>
    </div>
  );
}
