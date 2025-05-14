import { useGame } from "../context/GameContext";

export default function WelcomeScreen() {
  const { startGame, highScore } = useGame();

  return (
    <div className="welcome-screen">
      <h1>Whack a Mole</h1>
      <p>Click the mole as fast as you can to earn points!</p>
      <p>🏆 High Score: {highScore}</p>
      <button onClick={startGame}>Play</button>
    </div>
  );
}
