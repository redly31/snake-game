import { useState, useEffect, useCallback } from "react";
import { IApple, ISnake } from "./types/types";
import { Direction } from "./types/types";
import { stopKeyCombinations } from "./consts/consts";
import Board from "../components/Board";
import { getNewHead } from "../helpers/getNewHead";
import { generateNewApple } from "../helpers/generateNewApple";
import { hasCollision } from "../helpers/hasCollision";
import Header from "../components/Header";
import axios from "axios";
import { nanoid } from "nanoid";

function App() {
  const [snake, setSnake] = useState<ISnake[]>([
    { x: 2, y: 4 },
    { x: 3, y: 4 },
  ]);
  const [apple, setApple] = useState<IApple>({ x: 3, y: 5 });
  const [direction, setDirection] = useState<Direction>("d");
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isGamePaused, setIsGamePaused] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);

  const restart = () => {
    window.location.reload();
  };

  const move = useCallback(() => {
    if (isGameOver) {
      axios.post("http://localhost:3000/users", {
        score: score,
        name: "bob",
        id: nanoid(),
      });
      return;
    }

    setSnake((prevSnake) => {
      const head = prevSnake[prevSnake.length - 1];
      const newHead = getNewHead(head, direction);

      if (hasCollision(prevSnake, newHead)) {
        setIsGameOver(true);
        axios.post("http://localhost:3000/users", {
          score: score,
          name: "bob",
          id: nanoid(),
        });
        return prevSnake;
      }

      if (apple.x === newHead.x && apple.y === newHead.y) {
        setApple(generateNewApple(prevSnake));
        setScore(score + 1);
        return [...prevSnake, newHead];
      } else {
        return [...prevSnake.slice(1), newHead];
      }
    });
  }, [direction, apple, isGameOver]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const newDirection = event.key as Direction;
      if (["w", "a", "s", "d"].includes(newDirection)) {
        const isOpposite = stopKeyCombinations.some(
          ([a, b]) => a === direction && b === newDirection
        );
        if (!isOpposite) setDirection(newDirection);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  useEffect(() => {
    let timer = null;

    if (!isGamePaused && !isGameOver) {
      timer = setInterval(move, 300);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [move, isGamePaused, isGameOver]);

  return (
    <div className="flex justify-center flex-col items-center">
      <Header
        score={score}
        isGamePaused={isGamePaused}
        setIsGamePaused={setIsGamePaused}
        isGameOver={isGameOver}
        restart={restart}
      />
      <Board apple={apple} snake={snake} />
    </div>
  );
}

export default App;
