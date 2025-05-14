import { GameProvider } from "./context/GameContext";
import Game from "./components/Game";

export default function App() {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
}
