import { IPoint2D } from "./Point2D";
import { ISize2D, Size2D } from "./Size2D";
export interface IRect2D extends IPoint2D, ISize2D {
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare class Rect2D implements IRect2D {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x: number, y: number, width: number, height: number);
    toSize2D(): Size2D;
}
