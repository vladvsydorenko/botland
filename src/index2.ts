// // ----------------------------------------------------
// // Lib
// // ----------------------------------------------------

// class Point2D {
//     public x: number;
//     public y: number;

//     public constructor(x: number, y: number) {
//         this.x = x;
//         this.y = y;
//     }
// }

// class Rect2D {
//     public x: number;
//     public y: number;
//     public width: number;
//     public height: number;

//     public constructor(x: number, y: number, width: number, height: number) {
//         this.x = x;
//         this.y = y;
//         this.width = width;
//         this.height = height;
//     }
// }

// abstract class RenderElement<T> {
//     public bounds: Rect2D;
//     public renderer: CanvasRenderer2;
//     public imageData: ImageData;

//     public constructor(renderer: CanvasRenderer2, bounds: Rect2D) {
//         this.bounds = bounds;
//         this.renderer = renderer;
//         this.imageData = renderer.ctx.getImageData(bounds.x, bounds.y, bounds.width, bounds.height);
//     }

//     public abstract update(params: T): void;
//     public abstract render(): void;
// }

// class CanvasRenderer {
//     public ctx: CanvasRenderingContext2D;
//     public canvas: HTMLCanvasElement;
// }

// // The main class processing rendering
// class CanvasRenderer2 {
//     public ctx: CanvasRenderingContext2D;
//     public bounds: Rect2D;
//     public elements: RenderElement<any>[];

//     public canvas: HTMLCanvasElement;

//     public constructor(canvas: HTMLCanvasElement, bounds: Rect2D) {
//         this.canvas = canvas;
//         this.ctx = canvas.getContext("2d");
//         this.bounds = bounds;
//         this.elements = [];
//     }

//     public addElement(element: RenderElement<any>) {
//         this.elements.push(element);
//     }

//     public render() {
//         const { elements } = this;
//         for (let i = 0; i < elements.length; i++) {
//             const element = elements[i];
//             element.render();
//         }
//     }

//     public apply() {
//         const { elements, ctx, bounds } = this;
//         for (let i = 0; i < elements.length; i++) {
//             const element = elements[i];
//             const { x, y } = element.bounds;
//             ctx.putImageData(element.imageData, x + bounds.x, y + bounds.y);
//         }
//     }

//     public running: boolean = false;
//     public runTick() {
//         if (!this.running) {
//             return;
//         }

//         this.render();
//         this.apply();

//         window.requestAnimationFrame(() => {
//             this.runTick();
//         });
//     }
//     public run() {
//         this.running = true;

//         window.requestAnimationFrame(() => {
//             this.runTick();
//         });
//     }
//     public stop() {
//         this.running = false;
//     }
// }


// // ----------------------------------------------------
// // Game
// // ----------------------------------------------------
// class GameLayoutParams {}
// class GameLayout extends RenderElement<GameLayoutParams> {
//     public update(params: GameLayoutParams): void {
//     }
//     public render(): void {
//         const pixels = this.imageData.data;
//         for (let i = 0; i < pixels.length; i+=4) {
//             pixels[i] = Math.floor(Math.random() * 255);
//             pixels[i + 1] = Math.floor(Math.random() * 255);
//             pixels[i + 2] = Math.floor(Math.random() * 255);
//             pixels[i + 3] = Math.floor(Math.random() * 255);
//         }
//     }

// }

// class GridComponent {
//     public width: number;
//     public height: number;
// }

// class CellsComponent {
//     public mass: Float32Array;
//     public flow: Float32Array;
//     public flowSpeed: number;
//     public flowRatio: number;
// }

// class GameData {
//     grid: GridComponent;
//     cells: CellsComponent = null;
// }

// class FlowSystem {
//     public execute({ cells }: GameData) {
//         const { mass, flow, flowSpeed, flowRatio } = cells;

//         for (let i = 0; i < flow.length; i+=3) {
//             const cellA = flow[i];
//             const cellB = flow[i + 1];
//             const energy = i + 2;

//             const cellAMass = mass[cellA];
//             const cellBMass = mass[cellB];
//             const currentEnergy = flow[energy];
//             const targetEnergy = (cellAMass / cellBMass) * flowRatio;
//             const finalEnergy = MathTools.lerp(currentEnergy, targetEnergy, flowSpeed);

//             mass[cellA] += finalEnergy;
//             mass[cellB] -= finalEnergy;

//             flow[energy] = finalEnergy;
//         }
//     }
// }

// class CellsInitSystem {
//     public execute(data: GameData) {
//         if (data.cells !== null) {
//             return;
//         }

//         const grid = data.grid;

//         const length = grid.width * grid.height;
//         const mass = new Float32Array(length);
        
//         const cells = new CellsComponent();
//         cells.mass = mass;
//         cells.flow = new Float32Array(0);
//         cells.flowSpeed = 0.1;
//         cells.flowRatio = 0.1;

//     }

//     private createFlow(grid: GridComponent) {
//         const siblings: any = {};

//         for (let x = 0; x < grid.width; x++) {
//             for (let y = 0; y < grid.height; y++) {
//                 const siblings = this.findSiblings(grid, x, y);
//             }                
//         }
//     }

//     private findSiblings(grid: GridComponent, x: number, y: number) {
//         const siblings: Point2D[] = [];
//         for (let xAdd = -1; xAdd < 2; xAdd++) {
//             for (let yAdd = -1; yAdd < 2; yAdd++) {
//                 if (xAdd === 0 && yAdd === 0) {
//                     continue;
//                 }

//                 const siblingX = x + xAdd;
//                 const siblingY = y + yAdd;

//                 if (!MathTools.inBounds(siblingX, siblingY, new Rect2D(0, 0, grid.width, grid.height))) {
//                     continue;
//                 }

//                 siblings.push(new Point2D(siblingX, siblingY));
//             }                
//         }
//         return siblings;
//     }
// }

// self.addEventListener("DOMContentLoaded", () => {
//     const canvas = <HTMLCanvasElement>document.getElementById("app");
//     canvas.width = 800;
//     canvas.height = 600;
    
//     const renderer = new CanvasRenderer2(canvas, new Rect2D(0, 0, 800, 600));
//     const layout = new GameLayout(renderer, new Rect2D(0, 0, 800, 600));

//     renderer.addElement(layout);

//     renderer.render();
//     renderer.apply();

//     renderer.run();
// });

// class MathTools {
//     public static lerp(a: number, b: number, t: number) {
//         return a + (b - a) * t;
//     }

//     public static inBounds(x: number, y: number, bounds: Rect2D) {
//         return x >= bounds.x && x <= bounds.width &&
//                 y >= bounds.y && y <= bounds.height;
//     }
// }