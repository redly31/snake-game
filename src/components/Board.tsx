import { memo, useMemo } from "react";
import { BoardType, IApple, ISnake } from "../app/types/types";
import { fillBoard } from "../helpers/fillBoard";

interface BoardProps {
  apple: IApple;
  snake: ISnake[];
}

const Board = memo(({ apple, snake }: BoardProps) => {

  const board: BoardType[] = useMemo(() => fillBoard(), []);

  const getCellClass = useMemo(() => {
    return (cell: BoardType) => {
      let cellClass = "w-full h-[100px] bg-gray-800 border-solid border-2 border-sky-50";
      if (snake.some(segment => segment.x === cell.x && segment.y === cell.y)) {
        cellClass = "bg-fuchsia-800";
      }
      if (apple.x === cell.x && apple.y === cell.y) {
        cellClass = "bg-red-500";
      }
      return `${cellClass} w-full h-[100px] border-solid border-2 border-sky-50`;
    };
  }, [snake, apple]);
  

  return (
    <div className="grid grid-cols-7 grid-rows-7 gap-0 items-stretch w-[700px]">
      {board.map((cell) => (
        <div
          key={`${cell.x}-${cell.y}`}
          className={getCellClass(cell)}
        ></div>
      ))}
    </div>
  );
});

export default Board;
