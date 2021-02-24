// import { MathTools } from "./math/MathTools";
// import { Point2D } from "./math/Point2D";
// import { Rect2D } from "./math/Rect2D";
// import { Size2D } from "./math/Size2D";

// class GridViewData {
//     public size: Size2D;
//     public scale: Point2D;
//     public offset: Point2D;
//     public cells: Float32Array;
// }

// class GridView {
//     public bounds: Rect2D;
//     public data: GridViewData;
    
//     public render(texture: RenderTexture) {
//         const { pixels } = texture;
//         const renderArea = MathTools.cropRect(this.bounds, texture.bounds);
//         const data = this.data;
//         const fullMapSize = this.data.size.scale(this.data.scale);
        
//         let mapRenderRect = new Rect2D(data.offset.x, data.offset.y, fullMapSize.width, fullMapSize.height);
//         mapRenderRect = MathTools.cropRect(mapRenderRect, this.bounds);

//         let pixel;
//         let mapPoint;
//         for (let y = renderArea.y; y < y + renderArea.height; y++) {
//             for (let x = renderArea.x; x < x + renderArea.width; x++) {
//                 pixel = y * renderArea.width + x;
                
//             }
//         }
//     }
// }

// class RenderTexture {
//     public pixels: Uint8ClampedArray;
//     public bounds: Rect2D;

//     private _imageData: ImageData = null;
//     public get imageData(): ImageData {
//         return this._imageData;
//     }
//     public set imageData(imageData: ImageData) {
//         this._imageData = imageData;
//     }

//     public constructor(imageData: ImageData, bounds: Rect2D) {
//         this.imageData = imageData;
//         this.pixels = imageData.data;
//         this.bounds = bounds;
//     }
// }

// self.addEventListener("DOMContentLoaded", () => {
//     const renderSize = new Size2D(800, 600);
    
//     const canvas = <HTMLCanvasElement>document.getElementById("app");
//     canvas.width = renderSize.width;
//     canvas.height = renderSize.height;

//     const ctx = canvas.getContext("2d");

//     const rect = new Rect2D(20, 20, 100, 100);
//     const rect2 = new Rect2D(10, 10, 100, 100);
//     console.log(MathTools.cropRect(rect2, rect));
// });
