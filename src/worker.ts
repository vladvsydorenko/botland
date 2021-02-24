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

const generateRandoms = () => {
    r = MathTools.lerp(r, 255 - (50 * Math.random()), 0.1);
    g = MathTools.lerp(g, 255 - (100 * Math.random()), 0.1);
    b = MathTools.lerp(b, 255 - (80 * Math.random()), 0.1);
    a = MathTools.lerp(a, 255 - (10 * Math.random()), 0.001);
    return new Array(1000).fill(0).map(v => Math.random());
}

let r = Math.floor(255 * Math.random());
let g = Math.floor(255 * Math.random());
let b = Math.floor(255 * Math.random());
let a = 255;
let randoms = generateRandoms();
let randomIndex = 0;
let randomChange = 0;

let updateCount = 0;
const update = (testTexture: Texture, finalTexture: Texture) => {
    let random = 0;

    for (let i = 0; i < testTexture.pixels.length; i+=4) {
        random = randoms[randomIndex];

        testTexture.pixels[i] = r * random;
        testTexture.pixels[i + 1] = g * random;
        testTexture.pixels[i + 2] = b * random;
        testTexture.pixels[i + 3] = a;

        randomChange++;

        if (randomChange > 10) {
            randomIndex++;
            randomChange = 0;
        }
        if (randomIndex > randoms.length) {
            randomIndex = 0;
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

testTexture = new Texture();
testTexture.size = new Size2D(512, 512);
const length = testTexture.size.width * testTexture.size.height;
testTexture.pixels = new Uint8ClampedArray(new ArrayBuffer(length * Uint8ClampedArray.BYTES_PER_ELEMENT * 4));


self.addEventListener("message", (e) => {
    const data = e.data;
    const finalTexture = new Texture();
    finalTexture.size = new Size2D(data.size.width, data.size.height);
    finalTexture.pixels = new Uint8ClampedArray(data.textureBuffer);

    if (testTexture === null) {
        testTexture = new Texture();
        testTexture.size = finalTexture.size.clone();
        testTexture.size = new Size2D(512, 512);
        const length = testTexture.size.width * testTexture.size.height;
        testTexture.pixels = new Uint8ClampedArray(new ArrayBuffer(length * Uint8ClampedArray.BYTES_PER_ELEMENT * 4));
    }

    update(testTexture, finalTexture);
    (self as any).postMessage({
        textureBuffer: data.textureBuffer
    }, [data.textureBuffer]);
});