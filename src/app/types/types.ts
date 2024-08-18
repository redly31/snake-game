export interface ISnake {
    x: number;
    y: number;
}

export interface IApple {
    x: number;
    y: number;
}

export type BoardType = {
    x: number;
    y: number;
}

export type Direction = 'w' | 'a' | 's' | 'd';