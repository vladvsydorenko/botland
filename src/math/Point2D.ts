export interface IPoint2D {
    x: number;
    y: number;
}

export class Point2D implements IPoint2D {
    public x: number;
    public y: number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
