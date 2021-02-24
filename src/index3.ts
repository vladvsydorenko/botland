// import { MathTools } from "./math/MathTools";
// import { Point2D } from "./math/Point2D";
// import { Rect2D } from "./math/Rect2D";
// import { ISize2D, Size2D } from "./math/Size2D";

// // class TerrainViewData {
// //     public size: Size2D;
// //     public cells: Float32Array;

// //     public constructor(size: Size2D, cells: Float32Array) {
// //         this.size = size;
// //         this.cells = cells;
// //     }
// // }

// // class TerrainView {
// //     public data: TerrainViewData;

// //     public constructor(data: TerrainViewData) {
// //         this.data = data;
// //     }

// //     public render(image: RenderTexture) {
// //         const cursor = image.getCursor();
// //         const pixels = image.image.data;
// //         const { start, height, width, skip } = cursor;

// //         for (let i = start, y = 0; y < height; y++, i+=skip) {
// //             for (let x = 0; x < width; x++, i++) {
// //                 const pixel = i * 4;
// //                 pixels[pixel] = 0;
// //                 pixels[pixel + 1] = 0;
// //                 pixels[pixel + 2] = 0;
// //                 pixels[pixel + 3] = 255;
// //             }
// //         }
// //     }
// // }

// // class RenderData {
// //     public size: Size2D;
// //     public pixels: Uint8ClampedArray;
// //     public image: ImageData;

// //     public constructor(size: Size2D, image: ImageData) {
// //         this.size = size;
// //         this.pixels = image.data;
// //         this.image = image;
// //     }
// // }
// // class RenderCursor {
// //     public start: number;
// //     public height: number;
// //     public width: number;
// //     public skip: number;

// //     public constructor(start: number, width: number, height: number, skip: number) {
// //         this.start = start;
// //         this.width = width;
// //         this.height = height;
// //         this.skip = skip;
// //     }
// // }
// // class RenderTexture {
// //     public image: ImageData;

// //     private bounds: Rect2D = null;
// //     private cursor: RenderCursor = null;

// //     public constructor(texture: ImageData, bounds: Rect2D) {
// //         this.image = texture;
// //         this.setBounds(bounds);
// //     }

// //     public setBounds(bounds: Rect2D) {
// //         const textureWidth = this.image.width;
// //         const textureHeight = this.image.height;
// //         let start = bounds.y * textureWidth + bounds.x;
// //         const skip = textureWidth - bounds.width;

// //         let x = Math.min(bounds.x, 0);
// //         let y = Math.min(bounds.y, 0);
        
// //         x = Math.max(x, bounds.width - 1);
// //         y = Math.max(y, bounds.height - 1);

// //         let cursorWidth = bounds.width - x;
// //         let cursorHeight = bounds.height - y;

// //         if (cursorHeight + bounds.y >= textureHeight) {
// //             cursorHeight = 0;
// //         }

// //         this.cursor = new RenderCursor(start, bounds.height, bounds.width, skip);
// //         this.bounds = bounds;
// //     }
// //     public getBounds() {
// //         return this.bounds;
// //     }

// //     // get cursor for this.data
// //     public getCursor() {
// //         const { cursor } = this;
// //         return new RenderCursor(cursor.start, cursor.height, cursor.width, cursor.skip);
// //     }
// // }

// /// ----------------------------------------------------------------------------------------------
// /// Test
// /// ----------------------------------------------------------------------------------------------
// self.addEventListener("DOMContentLoaded", () => {
//     const canvas = <HTMLCanvasElement>document.getElementById("app");
//     const ctx = canvas.getContext("2d");
    
//     const renderSize = new Size2D(800, 600);
//     canvas.width = renderSize.width;
//     canvas.height = renderSize.height;

//     const image = ctx.getImageData(0, 0, renderSize.width, renderSize.height);
//     const renderData: RenderData = new RenderData(renderSize, image);
//     const renderImage = new RenderTexture(image, new Rect2D(0, 0, 200, 40));
//     const terrainViewData = new TerrainViewData(new Size2D(0, 0), new Float32Array());
//     const terrainView = new TerrainView(terrainViewData);
//     terrainView.render(renderImage);

//     ctx.putImageData(renderImage.image, 0, 0);
// });


// // class GridCursor {
// //     public start: number;
// //     public end: number;
// //     public step: number;

// //     public constructor(start: number, end: number, step: number) {
// //         this.start = start;
// //         this.end = end;
// //         this.step = step;
// //     }
// // }

// // class GridRegion {
// //     private width: number = 0;
// //     private bounds: Rect2D = null;
// //     private cursor: GridCursor = null;

// //     public constructor(width: number, bounds: Rect2D) {
// //         this.width = width;
// //         this.setBounds(bounds);
// //     }

// //     public setBounds(bounds: Rect2D) {
// //         const { width } = this;
// //         const start = bounds.y * width + bounds.x;
// //         const end = (bounds.y + bounds.height) * width + (bounds.x + bounds.width);
// //         const step = width - bounds.width;

// //         this.cursor = new GridCursor(start, end, step);
// //         this.bounds = bounds;
// //     }
// //     public getBounds() {
// //         return this.bounds;
// //     }

// //     public getCursor() {
// //         const { cursor } = this;
// //         return new GridCursor(cursor.start, cursor.end, cursor.step);
// //     }
// // }

// // self.addEventListener("DOMContentLoaded", () => {
// //     const canvas = <HTMLCanvasElement>document.getElementById("app");
// //     const ctx = canvas.getContext("2d");
    
// //     const renderSize = new Size2D(800, 600);
// //     canvas.width = renderSize.width;
// //     canvas.height = renderSize.height;


// //     const gridRegion = new GridRegion(renderSize.width, new Rect2D(100, 10, 100, 100));
// //     const image = ctx.getImageData(0, 0, renderSize.width, renderSize.height);
// //     const pixels = image.data;

// //     const cursor = gridRegion.getCursor();
// //     let i = cursor.start;
// //     const step = cursor.step;
// //     const bounds = gridRegion.getBounds();

// //     for (let y = 0; y < bounds.height; y++) {
// //         const length = i + bounds.width;
// //         for (; i < length; i++) {
// //             const pixel = i * 4;
// //             pixels[pixel] = 0;
// //             pixels[pixel + 1] = 0;
// //             pixels[pixel + 2] = 0;
// //             pixels[pixel + 3] = 255;
// //         }            
// //         i += step;
// //     }
// //     ctx.putImageData(image, 0, 0);

// //     console.log(gridRegion.getCursor(), pixels.length);
// // });

// // self.addEventListener("DOMContentLoaded", () => {
// //     const canvas = <HTMLCanvasElement>document.getElementById("app");
// //     const ctx = canvas.getContext("2d");
    
// //     const renderSize = new Size2D(800, 600);
// //     canvas.width = renderSize.width;
// //     canvas.height = renderSize.height;

// //     const grid = {
// //         width: 3,
// //         height: 3,
// //         cells: [255, 200, 150, 100, 60, 60, 70, 120, 130]
// //     };

// //     const image = ctx.getImageData(0, 0, renderSize.width, renderSize.height);
// //     const pixels = image.data;

// //     const offset = new Point2D(0, 0);
// //     const scale = new Point2D(20, 20);

// //     for (let pixel = 0, i = 0; pixel < pixels.length; pixel+=4, i++) {
// //         const localX = i % renderSize.width;
// //         const localY = Math.floor(i / renderSize.width);
// //         const gridX = Math.floor((localX + offset.x) / scale.x);
// //         const gridY = Math.floor((localY + offset.y) / scale.y);
// //         const cell = gridY * grid.width + gridX;
        
// //         if (gridX < 0 || gridY < 0 || gridX >= grid.width || gridY >= grid.height) {
// //             continue;
// //         }

// //         if (cell > grid.cells.length) {
// //             continue;
// //         }

// //         pixels[pixel] = 0;
// //         pixels[pixel + 1] = 0;
// //         pixels[pixel + 2] = 0;
// //         pixels[pixel + 3] = grid.cells[cell];
// //     }

// //     ctx.putImageData(image, 0, 0);
// // });
