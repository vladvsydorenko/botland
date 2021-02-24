import { Point2D } from "./Point2D";
import { Rect2D } from "./Rect2D";

export interface ISize2D {
    width: number;
    height: number;
}

export class Size2D implements ISize2D {
    public width: number;
    public height: number;

    public constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    public scale(factor: Point2D) {
        return new Size2D(this.width * factor.x, this.height * factor.y);
    }
    public ratio(comparand: ISize2D) {
        return new Point2D(this.width / comparand.width, this.height / comparand.height);
    }

    public clone() {
        return new Size2D(this.width, this.height);
    }

    public toRect2D(x: number = 0, y: number = 0) {
        return new Rect2D(x, y, this.width, this.height);
    }
}
