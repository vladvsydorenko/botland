import { Point2D } from "./Point2D";
import { Rect2D } from "./Rect2D";
export declare class MathTools {
    static lerp(a: number, b: number, t: number): number;
    static pointInsideRect({ x, y }: Point2D, rect: Rect2D): boolean;
    static cropRect(rect: Rect2D, bounds: Rect2D): Rect2D;
}
