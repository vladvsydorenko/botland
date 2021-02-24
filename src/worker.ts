import { MathTools } from "./math/MathTools";
import { Rect2D } from "./math/Rect2D";
import { Size2D } from "./math/Size2D";

class Texture {
    public size: Size2D;
    public pixels: Uint8ClampedArray;
}

const renderTextureToTexture = (source: Texture, target: Texture, sourceBounds: Rect2D, targetBounds: Rect2D) => {
    const targetArea = MathTools.cropRect(targetBounds, target.size.toRect2D());
    const sourceArea = MathTools.cropRect(sourceBounds, source.size.toRect2D());
    
    // const scale = targetArea.toSize2D().ratio(sourceArea);

    // let fuckCatched = false;
    // let fuckCatched2 = false;

    for (let y = 0; y < targetArea.height; y++) {
        for (let x = 0; x < targetArea.width; x++) {
        
            const targetX = x + targetArea.x;
            const targetY = y + targetArea.y;

            const sourceX = sourceArea.x + x;
            const sourceY = sourceArea.y + y;

            const targetPixel = (targetY * target.size.width + targetX) * 4;
            const sourcePixel = (sourceY * source.size.width + sourceX) * 4;

            // if (sourcePixel < 0 || sourcePixel >= source.pixels.length) {
            //     if (!fuckCatched) {
            //         console.log("fuck!", x, y, sourcePixel, targetPixel, source.pixels);
            //     }

            //     fuckCatched = true;
            // }

            // if (targetPixel < 0 || targetPixel >= target.pixels.length) {
            //     if (!fuckCatched2) {
            //         console.log("fuck 2!", x, y, sourcePixel, targetPixel);
            //     }

            //     fuckCatched2 = true;
            // }

            target.pixels[targetPixel] = source.pixels[sourcePixel];
            target.pixels[targetPixel + 1] = source.pixels[sourcePixel + 1];
            target.pixels[targetPixel + 2] = source.pixels[sourcePixel + 2];
            target.pixels[targetPixel + 3] = source.pixels[sourcePixel + 3];

            // target.pixels[targetPixel] = 0;
            // target.pixels[targetPixel + 1] = 0;
            // target.pixels[targetPixel + 2] = 0;
            // target.pixels[targetPixel + 3] = 255;
        }            
    }
};

console.log("worker is run");

let randomLerp = 0.1;
let randomChange = 2;
let colorLerp = 0.5;
let pixelLerp = 0.1;

const randomChangeThreashold = 10;
const minRandomLength = 100;
const maxRandomLength = 10000;

const generateRandoms = () => {
    const length = Math.floor(Math.random() * (maxRandomLength - minRandomLength) + minRandomLength);
    return new Array(length).fill(0).map(v => Math.random());
}

const changeColorTargets = () => {
    rTarget = MathTools.lerp(rTarget, 180 * Math.random(), randomLerp);
    gTarget = MathTools.lerp(gTarget, 180 * Math.random(), randomLerp);
    bTarget = MathTools.lerp(bTarget, 180 * Math.random(), randomLerp);
    aTarget = MathTools.lerp(aTarget, 255 - (255 * Math.random() * 0.2), randomLerp);
};

let r = Math.floor(180 * Math.random());
let g = Math.floor(180 * Math.random());
let b = Math.floor(180 * Math.random());
let a = 255;

let rTarget = Math.floor(255 * Math.random());
let gTarget = Math.floor(255 * Math.random());
let bTarget = Math.floor(255 * Math.random());
let aTarget = Math.floor(255 * Math.random());

let randoms = generateRandoms();
let randomIndex = 0;

let updateCount = 0;

changeColorTargets();
const update = (testTexture: Texture, finalTexture: Texture) => {
    let random = 0;
    let random2 = 0;
    let random3 = 0;

    changeColorTargets();

    r = MathTools.lerp(r, rTarget, colorLerp);
    g = MathTools.lerp(g, gTarget, colorLerp);
    b = MathTools.lerp(b, bTarget, colorLerp);
    a = MathTools.lerp(a, aTarget, colorLerp);

    for (let i = 0; i < testTexture.pixels.length; i+=4) {
        testTexture.pixels[i] = MathTools.lerp(testTexture.pixels[i], r * random, pixelLerp);
        testTexture.pixels[i + 1] = MathTools.lerp(testTexture.pixels[i + 1], g * random2, pixelLerp);
        testTexture.pixels[i + 2] = MathTools.lerp(testTexture.pixels[i + 2], b * random3, pixelLerp);
        testTexture.pixels[i + 3] = MathTools.lerp(testTexture.pixels[i + 3], a, pixelLerp);
        // testTexture.pixels[i + 1] = g * random;
        // testTexture.pixels[i + 2] = b * random;
        // testTexture.pixels[i + 3] = a;

        randomChange++;

        if (randomChange > randomChangeThreashold) {
            randomIndex++;
            random = randoms[randomIndex];

            randomIndex++;
            if (randomIndex > randoms.length) {
                randomIndex = 0;
            }
            random2 = randoms[randomIndex];
    
            randomIndex++;
            if (randomIndex > randoms.length) {
                randomIndex = 0;
            }
            random3 = randoms[randomIndex];
                randomChange = 0;
        }
    }

    //console.log("worker", testTexture, finalTexture, testTexture.size.toRect2D());
    for (let i = 0; i < 4; i++) {
        renderTextureToTexture(
            testTexture, 
            finalTexture, 
            testTexture.size.toRect2D(),
            testTexture.size.toRect2D(),
        );
    }

    updateCount++;
    if (updateCount > 100) {
        randoms = generateRandoms();
        updateCount = 0;
   }
};

let testTexture: Texture = null;

// testTexture = new Texture();
// testTexture.size = new Size2D(800, 800);
// const length = testTexture.size.width * testTexture.size.height;
// testTexture.pixels = new Uint8ClampedArray(new ArrayBuffer(length * Uint8ClampedArray.BYTES_PER_ELEMENT * 4));


self.addEventListener("message", (e) => {
    const data = e.data;
    const finalTexture = new Texture();
    finalTexture.size = new Size2D(data.size.width, data.size.height);
    finalTexture.pixels = new Uint8ClampedArray(data.textureBuffer);

    if (testTexture === null) {
        testTexture = new Texture();
        testTexture.size = finalTexture.size.clone();
        const length = testTexture.size.width * testTexture.size.height;
        testTexture.pixels = new Uint8ClampedArray(new ArrayBuffer(length * Uint8ClampedArray.BYTES_PER_ELEMENT * 4));
    }

    update(testTexture, finalTexture);
    (self as any).postMessage({
        textureBuffer: data.textureBuffer
    }, [data.textureBuffer]);
});