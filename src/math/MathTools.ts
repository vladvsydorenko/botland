import { Point2D } from "./Point2D";
import { Rect2D } from "./Rect2D";

export class MathTools {
    public static lerp(a: number, b: number, t: number) {
        return a + (b - a) * t;
    }

    public static pointInsideRect({ x, y }: Point2D, rect: Rect2D) {
        return x >= rect.x && x < rect.width &&
                y >= rect.y && y < rect.height;
    }

    public static cropRect(rect: Rect2D, bounds: Rect2D) {
        let x = Math.min(rect.x, bounds.width);
        x = Math.max(rect.x, bounds.x);

        let y = Math.min(rect.y, bounds.height);
        y = Math.max(rect.y, bounds.y);
        
        let width = Math.min(rect.width, bounds.width - x);
        let height = Math.min(rect.height, bounds.height - y);

        if (width === 0 || height === 0) {
            width = 0;
            height = 0;
        }

        const newRect = new Rect2D(x, y, width, height);
        return newRect;
    }
}
