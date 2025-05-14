// components/Game.jsx
import { useGame } from "../context/GameContext";
import WelcomeScreen from "./WelcomeScreen";
import GameBoard from "./GameBoard";
import GameOverScreen from "./GameOverScreen";

export default function Game() {
  const { mode, startGame } = useGame();

  return (
    <div className="wrapper">
      {mode === "welcome" && <WelcomeScreen onStart={startGame} />}
      {mode === "playing" && <GameBoard />}
      {mode === "gameover" && <GameOverScreen />}
    </div>
  );
}
