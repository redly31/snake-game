import { useState, useEffect } from "react";

interface ISnake {
  x: number;
  y: number;
}

type Direction = 'w' | 'a' | 's' | 'd';

function App() {
  const [snake, setSnake] = useState<ISnake[]>([{ x: 2, y: 4 }, { x: 3, y: 4 }]);
  const [apple, setApple] = useState<{ x: number; y: number }>({ x: 3, y: 5 });
  const [direction, setDirection] = useState<Direction>('d');
  const [isGameOver, setIsGameOver] = useState(false);
  const boardSize = 7;
  const board = [];
  const stopKeyCombinations = [
    ['w', 's'],
    ['s', 'w'],
    ['a', 'd'],
    ['d', 'a'],
  ];

  for (let y = 0; y < boardSize; y++) {
    for (let x = 0; x < boardSize; x++) {
      board.push({ x, y });
    }
  }

  const move = () => {
    if (isGameOver) return;

    setSnake(prevSnake => {
      const head = prevSnake[prevSnake.length - 1];
      let newHead: ISnake;

      switch (direction) {
        case 'w':
          newHead = { x: head.x, y: head.y === 0 ? boardSize - 1 : head.y - 1 };
          break;
        case 'a':
          newHead = { x: head.x === 0 ? boardSize - 1 : head.x - 1, y: head.y };
          break;
        case 's':
          newHead = { x: head.x, y: head.y === boardSize - 1 ? 0 : head.y + 1 };
          break;
        case 'd':
          newHead = { x: head.x === boardSize - 1 ? 0 : head.x + 1, y: head.y };
          break;
        default:
          newHead = head;
          break;
      }

      const hasEatenApple = apple.x === newHead.x && apple.y === newHead.y;
      let newSnake: ISnake[];

      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setIsGameOver(true);
        return prevSnake;
      }

      if (hasEatenApple) {
        let newApple: { x: number; y: number };
        do {
          newApple = {
            x: Math.floor(Math.random() * boardSize),
            y: Math.floor(Math.random() * boardSize),
          };
        } while (prevSnake.some(segment => segment.x === newApple.x && segment.y === newApple.y));

        setApple(newApple);

        newSnake = [...prevSnake, newHead];
      } else {
        newSnake = [...prevSnake.slice(1), newHead];
      }

      return newSnake;
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const newDirection = event.key as Direction;

      if (['w', 'a', 's', 'd'].includes(newDirection)) {
        const currentOpposite = stopKeyCombinations.find(([a, b]) =>
          a === direction && b === newDirection
        );

        if (!currentOpposite) {
          setDirection(newDirection);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    const timer = setInterval(() => {
      move();
    }, 300);

    return () => clearInterval(timer);
  }, [direction, isGameOver]);

  return (
    <div className="flex justify-center flex-col items-center">
      <h1 className="text-3xl">HELLO WROT</h1>
      {isGameOver && <h2 className="text-2xl text-red-500">Game Over!</h2>}
      <div className="grid grid-cols-7 grid-rows-7 gap-0 mt-10 items-stretch w-[700px]">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`w-full h-[100px] bg-gray-800 border-solid border-2 border-sky-50 ${
              snake.some(segment => segment.x === cell.x && segment.y === cell.y) ? 'bg-fuchsia-800' : ''
            } ${
              apple.x === cell.x && apple.y === cell.y ? 'bg-red-500' : ''
            }`}
          >
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
