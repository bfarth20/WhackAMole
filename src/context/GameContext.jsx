//NOTES//
//useState: track a value and re-render when it changes
//useEffect: Do something after a render, optionally based on the values changing
//useRef: Keep a value across renders, but don't trigger rerenders

import { createContext, useContext, useEffect, useRef, useState } from "react";

const GameContext = createContext(null);

function getRandomHole(prevHole, total = 9) {
  let newHole = prevHole;
  while (newHole === prevHole) {
    newHole = Math.floor(Math.random() * total);
  }
  return newHole;
}

export function GameProvider({ children }) {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [currentHole, setCurrentHole] = useState(getRandomHole(-1));
  const [mode, setMode] = useState("welcome");
  const [timeLeft, setTimeLeft] = useState(15);

  //THIS IS A NEW THING
  //usRef is like a little box where you can store a value, but it wont reset at rerenders
  const timerRef = useRef(null);

  function whackMole() {
    if (mode !== "playing") return;
    setScore((prev) => prev + 1);
    setCurrentHole((prevHole) => getRandomHole(prevHole));
  }

  function startGame() {
    setScore(0);
    setTimeLeft(15);
    setCurrentHole(() => getRandomHole(-1));
    setMode("playing");
  }

  function restartGame() {
    setHighScore((prevHigh) => Math.max(prevHigh, score));
    setMode("welcome");
    if (timerRef.current) clearInterval(timerRef.current);
  }

  //THIS IS A NEW CONCEPT
  //IF MODE IS IN "PLAYING", IT WILL START A TIMER THAT COUNTS DOWN
  //AFTER COMPLETING IT CLEANS UP
  //the 1000 is the interval between the function, basically making the timer work every 1000 milliseconds
  useEffect(() => {
    if (mode !== "playing") return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setHighScore((prevHigh) => Math.max(prevHigh, score));
          setMode("gameover");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [mode]);

  const value = {
    score,
    highScore,
    currentHole,
    mode,
    timeLeft,
    whackMole,
    startGame,
    restartGame,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
