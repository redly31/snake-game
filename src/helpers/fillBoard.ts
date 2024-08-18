import { BoardType } from "../app/types/types";

export const fillBoard = () => {
  const b: BoardType[] = [];
  for (let y = 0; y < 7; y++) {
    for (let x = 0; x < 7; x++) {
      b.push({ x, y });
    }
  }
  return b
}