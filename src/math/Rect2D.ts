import { IPoint2D } from "./Point2D";
import { ISize2D, Size2D } from "./Size2D";

export interface IRect2D extends IPoint2D, ISize2D {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class Rect2D implements IRect2D {
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    public constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public toSize2D() {
        return new Size2D(this.width, this.height);
    }
}

