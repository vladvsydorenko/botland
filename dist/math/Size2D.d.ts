import { Point2D } from "./Point2D";
import { Rect2D } from "./Rect2D";
export interface ISize2D {
    width: number;
    height: number;
}
export declare class Size2D implements ISize2D {
    width: number;
    height: number;
    constructor(width: number, height: number);
    scale(factor: Point2D): Size2D;
    ratio(comparand: ISize2D): Point2D;
    clone(): Size2D;
    toRect2D(x?: number, y?: number): Rect2D;
}
