import { MathTools } from "./math/MathTools";
import { Point2D } from "./math/Point2D";
import { Rect2D } from "./math/Rect2D";
import { Size2D } from "./math/Size2D";

class Texture {
    public size: Size2D;
    public pixels: Uint8ClampedArray;
}

self.addEventListener("DOMContentLoaded", () => {
    const renderSize = new Size2D(800, 600);
    
    const canvas = <HTMLCanvasElement>document.getElementById("app");
    canvas.width = renderSize.width;
    canvas.height = renderSize.height;

    let ctx = canvas.getContext("2d");

    const finalTexture = new Texture();
    finalTexture.size = renderSize.clone();
    let textureBuffer = new ArrayBuffer(finalTexture.size.width * finalTexture.size.height * 4 * Uint8ClampedArray.BYTES_PER_ELEMENT);
    finalTexture.pixels = new Uint8ClampedArray(textureBuffer);

    let fps = 0;
    let lastFps = 0;
    let start = performance.now();
    const update = () => {
        const imageData = new ImageData(finalTexture.pixels, finalTexture.size.width, finalTexture.size.height);
        ctx.putImageData(imageData, 0, 0);

        ctx.globalAlpha = 0.7;
        ctx.fillStyle = "#1a446a";
        ctx.fillRect(renderSize.width - 84, 0, 84, 44);

        ctx.textAlign = "center";

        ctx.globalAlpha = 0.1;
        ctx.fillStyle = "#424242";
        ctx.font = "normal bold 22px sans-serif";
        ctx.fillText(lastFps.toString(), renderSize.width - 16, 34);

        ctx.globalAlpha = 0.2;
        ctx.fillStyle = "#424242";
        ctx.font = "normal bold 23px sans-serif";
        ctx.fillText(lastFps.toString(), renderSize.width - 17, 35);

        ctx.globalAlpha = 1;
        const fpsGreen = 255 * (lastFps / 60);
        const fpsRed = 255 - 255 * (lastFps / 30);
        const fpsBlue = 255 * (lastFps / 300);
        ctx.fillStyle = `rgba(${fpsRed}, ${fpsGreen}, ${fpsBlue}, 1)`;
        ctx.font = "normal bold 20px sans-serif";
        ctx.fillText(lastFps.toString(), renderSize.width - 20, 30);

        ctx.fillStyle = "#d8dfe8";
        ctx.fillText("fps:", renderSize.width - 60, 30);

        // const image = hiddenCtx.getImageData(0, 0, renderSize.width, renderSize.height);
        // ctx.putImageData(image, 0, 0);

        fps++;
        const end = performance.now();
        const diff = end - start;
        if (diff >= 1000) {
            start = end;
            lastFps = fps;
            fps = 0;
        }

        worker.postMessage({
            size: renderSize,
            textureBuffer: finalTexture.pixels.buffer
        }, [finalTexture.pixels.buffer]);
    };

    let available = false;
    const updateTick = () => {
        if (available) {
            available = false;
            update();
        }
        requestAnimationFrame(updateTick);
    };

    const worker = new Worker("./dist/worker.js");

    worker.addEventListener("message", (e) => {
        finalTexture.pixels = new Uint8ClampedArray(e.data.textureBuffer);
        available = true;
        //requestAnimationFrame(update);
        //update();
    });

    worker.postMessage({
        size: renderSize,
        textureBuffer
    }, [textureBuffer]);

    updateTick();
});
