import { ISnake } from "../app/types/types";

export const hasCollision = (snake: ISnake[], head: ISnake): boolean => 
    snake.some(segment => segment.x === head.x && segment.y === head.y);