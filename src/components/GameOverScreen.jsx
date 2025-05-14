import { useGame } from "../context/GameContext";

export default function GameOverScreen() {
  const { score, highScore, startGame } = useGame();

  return (
    <div className="game-over-screen">
      <h1>Game Over</h1>
      <p>Your Score: {score}</p>
      <p>High Score: {highScore}</p>
      <button onClick={startGame}>Play Again?</button>
    </div>
  );
}
