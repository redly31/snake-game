import { boardSize } from "../app/consts/consts";
import { Direction, ISnake } from "../app/types/types";

export const getNewHead = (head: ISnake, direction: Direction): ISnake => {

    switch (direction) {
      case "w":
        return { x: head.x, y: head.y === 0 ? boardSize - 1 : head.y - 1 };
      case "a":
        return { x: head.x === 0 ? boardSize - 1 : head.x - 1, y: head.y };
      case "s":
        return { x: head.x, y: head.y === boardSize - 1 ? 0 : head.y + 1 };
      case "d":
        return { x: head.x === boardSize - 1 ? 0 : head.x + 1, y: head.y };
      default:
        return head;
    }
};