import { boardSize } from "../app/consts/consts";
import { IApple, ISnake } from "../app/types/types";

export const generateNewApple = (snake: ISnake[]): IApple => {
    let newApple: IApple;
    do {
      newApple = {
        x: Math.floor(Math.random() * boardSize),
        y: Math.floor(Math.random() * boardSize),
      };
    } while (snake.some(segment => segment.x === newApple.x && segment.y === newApple.y));
    return newApple;
  };