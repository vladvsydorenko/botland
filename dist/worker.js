(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["test_worker"] = factory();
	else
		root["test_worker"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/math/MathTools.ts":
/*!*******************************!*\
  !*** ./src/math/MathTools.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MathTools = void 0;
const Rect2D_1 = __webpack_require__(/*! ./Rect2D */ "./src/math/Rect2D.ts");
class MathTools {
    static lerp(a, b, t) {
        return a + (b - a) * t;
    }
    static pointInsideRect({ x, y }, rect) {
        return x >= rect.x && x < rect.width &&
            y >= rect.y && y < rect.height;
    }
    static cropRect(rect, bounds) {
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
        const newRect = new Rect2D_1.Rect2D(x, y, width, height);
        return newRect;
    }
}
exports.MathTools = MathTools;


/***/ }),

/***/ "./src/math/Point2D.ts":
/*!*****************************!*\
  !*** ./src/math/Point2D.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Point2D = void 0;
class Point2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
exports.Point2D = Point2D;


/***/ }),

/***/ "./src/math/Rect2D.ts":
/*!****************************!*\
  !*** ./src/math/Rect2D.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Rect2D = void 0;
const Size2D_1 = __webpack_require__(/*! ./Size2D */ "./src/math/Size2D.ts");
class Rect2D {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    toSize2D() {
        return new Size2D_1.Size2D(this.width, this.height);
    }
}
exports.Rect2D = Rect2D;


/***/ }),

/***/ "./src/math/Size2D.ts":
/*!****************************!*\
  !*** ./src/math/Size2D.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Size2D = void 0;
const Point2D_1 = __webpack_require__(/*! ./Point2D */ "./src/math/Point2D.ts");
const Rect2D_1 = __webpack_require__(/*! ./Rect2D */ "./src/math/Rect2D.ts");
class Size2D {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    scale(factor) {
        return new Size2D(this.width * factor.x, this.height * factor.y);
    }
    ratio(comparand) {
        return new Point2D_1.Point2D(this.width / comparand.width, this.height / comparand.height);
    }
    clone() {
        return new Size2D(this.width, this.height);
    }
    toRect2D(x = 0, y = 0) {
        return new Rect2D_1.Rect2D(x, y, this.width, this.height);
    }
}
exports.Size2D = Size2D;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!***********************!*\
  !*** ./src/worker.ts ***!
  \***********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const MathTools_1 = __webpack_require__(/*! ./math/MathTools */ "./src/math/MathTools.ts");
const Size2D_1 = __webpack_require__(/*! ./math/Size2D */ "./src/math/Size2D.ts");
class Texture {
}
const renderTextureToTexture = (source, target, sourceBounds, targetBounds) => {
    const targetArea = MathTools_1.MathTools.cropRect(targetBounds, target.size.toRect2D());
    const sourceArea = MathTools_1.MathTools.cropRect(sourceBounds, source.size.toRect2D());
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
};
const changeColorTargets = () => {
    rTarget = MathTools_1.MathTools.lerp(rTarget, 180 * Math.random(), randomLerp);
    gTarget = MathTools_1.MathTools.lerp(gTarget, 180 * Math.random(), randomLerp);
    bTarget = MathTools_1.MathTools.lerp(bTarget, 180 * Math.random(), randomLerp);
    aTarget = MathTools_1.MathTools.lerp(aTarget, 255 - (255 * Math.random() * 0.2), randomLerp);
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
const update = (testTexture, finalTexture) => {
    let random = 0;
    let random2 = 0;
    let random3 = 0;
    changeColorTargets();
    r = MathTools_1.MathTools.lerp(r, rTarget, colorLerp);
    g = MathTools_1.MathTools.lerp(g, gTarget, colorLerp);
    b = MathTools_1.MathTools.lerp(b, bTarget, colorLerp);
    a = MathTools_1.MathTools.lerp(a, aTarget, colorLerp);
    for (let i = 0; i < testTexture.pixels.length; i += 4) {
        testTexture.pixels[i] = MathTools_1.MathTools.lerp(testTexture.pixels[i], r * random, pixelLerp);
        testTexture.pixels[i + 1] = MathTools_1.MathTools.lerp(testTexture.pixels[i + 1], g * random2, pixelLerp);
        testTexture.pixels[i + 2] = MathTools_1.MathTools.lerp(testTexture.pixels[i + 2], b * random3, pixelLerp);
        testTexture.pixels[i + 3] = MathTools_1.MathTools.lerp(testTexture.pixels[i + 3], a, pixelLerp);
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
        renderTextureToTexture(testTexture, finalTexture, testTexture.size.toRect2D(), testTexture.size.toRect2D());
    }
    updateCount++;
    if (updateCount > 100) {
        randoms = generateRandoms();
        updateCount = 0;
    }
};
let testTexture = null;
// testTexture = new Texture();
// testTexture.size = new Size2D(800, 800);
// const length = testTexture.size.width * testTexture.size.height;
// testTexture.pixels = new Uint8ClampedArray(new ArrayBuffer(length * Uint8ClampedArray.BYTES_PER_ELEMENT * 4));
self.addEventListener("message", (e) => {
    const data = e.data;
    const finalTexture = new Texture();
    finalTexture.size = new Size2D_1.Size2D(data.size.width, data.size.height);
    finalTexture.pixels = new Uint8ClampedArray(data.textureBuffer);
    if (testTexture === null) {
        testTexture = new Texture();
        testTexture.size = finalTexture.size.clone();
        const length = testTexture.size.width * testTexture.size.height;
        testTexture.pixels = new Uint8ClampedArray(new ArrayBuffer(length * Uint8ClampedArray.BYTES_PER_ELEMENT * 4));
    }
    update(testTexture, finalTexture);
    self.postMessage({
        textureBuffer: data.textureBuffer
    }, [data.textureBuffer]);
});

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZXN0X3dvcmtlci93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vdGVzdF93b3JrZXIvLi9zcmMvbWF0aC9NYXRoVG9vbHMudHMiLCJ3ZWJwYWNrOi8vdGVzdF93b3JrZXIvLi9zcmMvbWF0aC9Qb2ludDJELnRzIiwid2VicGFjazovL3Rlc3Rfd29ya2VyLy4vc3JjL21hdGgvUmVjdDJELnRzIiwid2VicGFjazovL3Rlc3Rfd29ya2VyLy4vc3JjL21hdGgvU2l6ZTJELnRzIiwid2VicGFjazovL3Rlc3Rfd29ya2VyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Rlc3Rfd29ya2VyLy4vc3JjL3dvcmtlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7Ozs7Ozs7OztBQ1RBLDZFQUFrQztBQUVsQyxNQUFhLFNBQVM7SUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUztRQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVNLE1BQU0sQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFXLEVBQUUsSUFBWTtRQUN6RCxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSztZQUM1QixDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUMzQyxDQUFDO0lBRU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFZLEVBQUUsTUFBYztRQUMvQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUs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QUFHLHFCQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDMUMsQ0FBQyxHQUFHLHFCQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDMUMsQ0FBQyxHQUFHLHFCQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDMUMsQ0FBQyxHQUFHLHFCQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFFMUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBRSxDQUFDLEVBQUU7UUFDakQsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxxQkFBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDckYsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcscUJBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUM5RixXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxxQkFBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzlGLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLHFCQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNwRiwwQ0FBMEM7UUFDMUMsMENBQTBDO1FBQzFDLGlDQUFpQztRQUVqQyxZQUFZLEVBQUUsQ0FBQztRQUVmLElBQUksWUFBWSxHQUFHLHNCQUFzQixFQUFFO1lBQ3ZDLFdBQVcsRUFBRSxDQUFDO1lBQ2QsTUFBTSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUU5QixXQUFXLEVBQUUsQ0FBQztZQUNkLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUU7Z0JBQzlCLFdBQVcsR0FBRyxDQUFDLENBQUM7YUFDbkI7WUFDRCxPQUFPLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRS9CLFdBQVcsRUFBRSxDQUFDO1lBQ2QsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRTtnQkFDOUIsV0FBVyxHQUFHLENBQUMsQ0FBQzthQUNuQjtZQUNELE9BQU8sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDM0IsWUFBWSxHQUFHLENBQUMsQ0FBQztTQUN4QjtLQUNKO0lBRUQsZ0ZBQWdGO0lBQ2hGLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDeEIsc0JBQXNCLENBQ2xCLFdBQVcsRUFDWCxZQUFZLEVBQ1osV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFDM0IsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FDOUIsQ0FBQztLQUNMO0lBRUQsV0FBVyxFQUFFLENBQUM7SUFDZCxJQUFJLFdBQVcsR0FBRyxHQUFHLEVBQUU7UUFDbkIsT0FBTyxHQUFHLGVBQWUsRUFBRSxDQUFDO1FBQzVCLFdBQVcsR0FBRyxDQUFDLENBQUM7S0FDcEI7QUFDSixDQUFDLENBQUM7QUFFRixJQUFJLFdBQVcsR0FBWSxJQUFJLENBQUM7QUFFaEMsK0JBQStCO0FBQy9CLDJDQUEyQztBQUMzQyxtRUFBbUU7QUFDbkUsaUhBQWlIO0FBR2pILElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUNuQyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3BCLE1BQU0sWUFBWSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFDbkMsWUFBWSxDQUFDLElBQUksR0FBRyxJQUFJLGVBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xFLFlBQVksQ0FBQyxNQUFNLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFFaEUsSUFBSSxXQUFXLEtBQUssSUFBSSxFQUFFO1FBQ3RCLFdBQVcsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQzVCLFdBQVcsQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM3QyxNQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNoRSxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksaUJBQWlCLENBQUMsSUFBSSxXQUFXLENBQUMsTUFBTSxHQUFHLGlCQUFpQixDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDakg7SUFFRCxNQUFNLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ2pDLElBQVksQ0FBQyxXQUFXLENBQUM7UUFDdEIsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhO0tBQ3BDLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztBQUM3QixDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJ3b3JrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJ0ZXN0X3dvcmtlclwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJ0ZXN0X3dvcmtlclwiXSA9IGZhY3RvcnkoKTtcbn0pKHNlbGYsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsImltcG9ydCB7IFBvaW50MkQgfSBmcm9tIFwiLi9Qb2ludDJEXCI7XHJcbmltcG9ydCB7IFJlY3QyRCB9IGZyb20gXCIuL1JlY3QyRFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1hdGhUb29scyB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGxlcnAoYTogbnVtYmVyLCBiOiBudW1iZXIsIHQ6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBhICsgKGIgLSBhKSAqIHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBwb2ludEluc2lkZVJlY3QoeyB4LCB5IH06IFBvaW50MkQsIHJlY3Q6IFJlY3QyRCkge1xyXG4gICAgICAgIHJldHVybiB4ID49IHJlY3QueCAmJiB4IDwgcmVjdC53aWR0aCAmJlxyXG4gICAgICAgICAgICAgICAgeSA+PSByZWN0LnkgJiYgeSA8IHJlY3QuaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JvcFJlY3QocmVjdDogUmVjdDJELCBib3VuZHM6IFJlY3QyRCkge1xyXG4gICAgICAgIGxldCB4ID0gTWF0aC5taW4ocmVjdC54LCBib3VuZHMud2lkdGgpO1xyXG4gICAgICAgIHggPSBNYXRoLm1heChyZWN0LngsIGJvdW5kcy54KTtcclxuXHJcbiAgICAgICAgbGV0IHkgPSBNYXRoLm1pbihyZWN0LnksIGJvdW5kcy5oZWlnaHQpO1xyXG4gICAgICAgIHkgPSBNYXRoLm1heChyZWN0LnksIGJvdW5kcy55KTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgd2lkdGggPSBNYXRoLm1pbihyZWN0LndpZHRoLCBib3VuZHMud2lkdGggLSB4KTtcclxuICAgICAgICBsZXQgaGVpZ2h0ID0gTWF0aC5taW4ocmVjdC5oZWlnaHQsIGJvdW5kcy5oZWlnaHQgLSB5KTtcclxuXHJcbiAgICAgICAgaWYgKHdpZHRoID09PSAwIHx8IGhlaWdodCA9PT0gMCkge1xyXG4gICAgICAgICAgICB3aWR0aCA9IDA7XHJcbiAgICAgICAgICAgIGhlaWdodCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBuZXdSZWN0ID0gbmV3IFJlY3QyRCh4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICByZXR1cm4gbmV3UmVjdDtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgaW50ZXJmYWNlIElQb2ludDJEIHtcclxuICAgIHg6IG51bWJlcjtcclxuICAgIHk6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBvaW50MkQgaW1wbGVtZW50cyBJUG9pbnQyRCB7XHJcbiAgICBwdWJsaWMgeDogbnVtYmVyO1xyXG4gICAgcHVibGljIHk6IG51bWJlcjtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSVBvaW50MkQgfSBmcm9tIFwiLi9Qb2ludDJEXCI7XHJcbmltcG9ydCB7IElTaXplMkQsIFNpemUyRCB9IGZyb20gXCIuL1NpemUyRFwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUmVjdDJEIGV4dGVuZHMgSVBvaW50MkQsIElTaXplMkQge1xyXG4gICAgeDogbnVtYmVyO1xyXG4gICAgeTogbnVtYmVyO1xyXG4gICAgd2lkdGg6IG51bWJlcjtcclxuICAgIGhlaWdodDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUmVjdDJEIGltcGxlbWVudHMgSVJlY3QyRCB7XHJcbiAgICBwdWJsaWMgeDogbnVtYmVyO1xyXG4gICAgcHVibGljIHk6IG51bWJlcjtcclxuICAgIHB1YmxpYyB3aWR0aDogbnVtYmVyO1xyXG4gICAgcHVibGljIGhlaWdodDogbnVtYmVyO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b1NpemUyRCgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFNpemUyRCh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7IFBvaW50MkQgfSBmcm9tIFwiLi9Qb2ludDJEXCI7XHJcbmltcG9ydCB7IFJlY3QyRCB9IGZyb20gXCIuL1JlY3QyRFwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU2l6ZTJEIHtcclxuICAgIHdpZHRoOiBudW1iZXI7XHJcbiAgICBoZWlnaHQ6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNpemUyRCBpbXBsZW1lbnRzIElTaXplMkQge1xyXG4gICAgcHVibGljIHdpZHRoOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgaGVpZ2h0OiBudW1iZXI7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzY2FsZShmYWN0b3I6IFBvaW50MkQpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFNpemUyRCh0aGlzLndpZHRoICogZmFjdG9yLngsIHRoaXMuaGVpZ2h0ICogZmFjdG9yLnkpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHJhdGlvKGNvbXBhcmFuZDogSVNpemUyRCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUG9pbnQyRCh0aGlzLndpZHRoIC8gY29tcGFyYW5kLndpZHRoLCB0aGlzLmhlaWdodCAvIGNvbXBhcmFuZC5oZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbG9uZSgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFNpemUyRCh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRvUmVjdDJEKHg6IG51bWJlciA9IDAsIHk6IG51bWJlciA9IDApIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJlY3QyRCh4LCB5LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICB9XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJpbXBvcnQgeyBNYXRoVG9vbHMgfSBmcm9tIFwiLi9tYXRoL01hdGhUb29sc1wiO1xyXG5pbXBvcnQgeyBSZWN0MkQgfSBmcm9tIFwiLi9tYXRoL1JlY3QyRFwiO1xyXG5pbXBvcnQgeyBTaXplMkQgfSBmcm9tIFwiLi9tYXRoL1NpemUyRFwiO1xyXG5cclxuY2xhc3MgVGV4dHVyZSB7XHJcbiAgICBwdWJsaWMgc2l6ZTogU2l6ZTJEO1xyXG4gICAgcHVibGljIHBpeGVsczogVWludDhDbGFtcGVkQXJyYXk7XHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlclRleHR1cmVUb1RleHR1cmUgPSAoc291cmNlOiBUZXh0dXJlLCB0YXJnZXQ6IFRleHR1cmUsIHNvdXJjZUJvdW5kczogUmVjdDJELCB0YXJnZXRCb3VuZHM6IFJlY3QyRCkgPT4ge1xyXG4gICAgY29uc3QgdGFyZ2V0QXJlYSA9IE1hdGhUb29scy5jcm9wUmVjdCh0YXJnZXRCb3VuZHMsIHRhcmdldC5zaXplLnRvUmVjdDJEKCkpO1xyXG4gICAgY29uc3Qgc291cmNlQXJlYSA9IE1hdGhUb29scy5jcm9wUmVjdChzb3VyY2VCb3VuZHMsIHNvdXJjZS5zaXplLnRvUmVjdDJEKCkpO1xyXG4gICAgXHJcbiAgICAvLyBjb25zdCBzY2FsZSA9IHRhcmdldEFyZWEudG9TaXplMkQoKS5yYXRpbyhzb3VyY2VBcmVhKTtcclxuXHJcbiAgICAvLyBsZXQgZnVja0NhdGNoZWQgPSBmYWxzZTtcclxuICAgIC8vIGxldCBmdWNrQ2F0Y2hlZDIgPSBmYWxzZTtcclxuXHJcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRhcmdldEFyZWEuaGVpZ2h0OyB5KyspIHtcclxuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRhcmdldEFyZWEud2lkdGg7IHgrKykge1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCB0YXJnZXRYID0geCArIHRhcmdldEFyZWEueDtcclxuICAgICAgICAgICAgY29uc3QgdGFyZ2V0WSA9IHkgKyB0YXJnZXRBcmVhLnk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzb3VyY2VYID0gc291cmNlQXJlYS54ICsgeDtcclxuICAgICAgICAgICAgY29uc3Qgc291cmNlWSA9IHNvdXJjZUFyZWEueSArIHk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0YXJnZXRQaXhlbCA9ICh0YXJnZXRZICogdGFyZ2V0LnNpemUud2lkdGggKyB0YXJnZXRYKSAqIDQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZVBpeGVsID0gKHNvdXJjZVkgKiBzb3VyY2Uuc2l6ZS53aWR0aCArIHNvdXJjZVgpICogNDtcclxuXHJcbiAgICAgICAgICAgIC8vIGlmIChzb3VyY2VQaXhlbCA8IDAgfHwgc291cmNlUGl4ZWwgPj0gc291cmNlLnBpeGVscy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgLy8gICAgIGlmICghZnVja0NhdGNoZWQpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcImZ1Y2shXCIsIHgsIHksIHNvdXJjZVBpeGVsLCB0YXJnZXRQaXhlbCwgc291cmNlLnBpeGVscyk7XHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgZnVja0NhdGNoZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgICAvLyBpZiAodGFyZ2V0UGl4ZWwgPCAwIHx8IHRhcmdldFBpeGVsID49IHRhcmdldC5waXhlbHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBpZiAoIWZ1Y2tDYXRjaGVkMikge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwiZnVjayAyIVwiLCB4LCB5LCBzb3VyY2VQaXhlbCwgdGFyZ2V0UGl4ZWwpO1xyXG4gICAgICAgICAgICAvLyAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gICAgIGZ1Y2tDYXRjaGVkMiA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgICAgIHRhcmdldC5waXhlbHNbdGFyZ2V0UGl4ZWxdID0gc291cmNlLnBpeGVsc1tzb3VyY2VQaXhlbF07XHJcbiAgICAgICAgICAgIHRhcmdldC5waXhlbHNbdGFyZ2V0UGl4ZWwgKyAxXSA9IHNvdXJjZS5waXhlbHNbc291cmNlUGl4ZWwgKyAxXTtcclxuICAgICAgICAgICAgdGFyZ2V0LnBpeGVsc1t0YXJnZXRQaXhlbCArIDJdID0gc291cmNlLnBpeGVsc1tzb3VyY2VQaXhlbCArIDJdO1xyXG4gICAgICAgICAgICB0YXJnZXQucGl4ZWxzW3RhcmdldFBpeGVsICsgM10gPSBzb3VyY2UucGl4ZWxzW3NvdXJjZVBpeGVsICsgM107XHJcblxyXG4gICAgICAgICAgICAvLyB0YXJnZXQucGl4ZWxzW3RhcmdldFBpeGVsXSA9IDA7XHJcbiAgICAgICAgICAgIC8vIHRhcmdldC5waXhlbHNbdGFyZ2V0UGl4ZWwgKyAxXSA9IDA7XHJcbiAgICAgICAgICAgIC8vIHRhcmdldC5waXhlbHNbdGFyZ2V0UGl4ZWwgKyAyXSA9IDA7XHJcbiAgICAgICAgICAgIC8vIHRhcmdldC5waXhlbHNbdGFyZ2V0UGl4ZWwgKyAzXSA9IDI1NTtcclxuICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zb2xlLmxvZyhcIndvcmtlciBpcyBydW5cIik7XHJcblxyXG5sZXQgcmFuZG9tTGVycCA9IDAuMTtcclxubGV0IHJhbmRvbUNoYW5nZSA9IDI7XHJcbmxldCBjb2xvckxlcnAgPSAwLjU7XHJcbmxldCBwaXhlbExlcnAgPSAwLjE7XHJcblxyXG5jb25zdCByYW5kb21DaGFuZ2VUaHJlYXNob2xkID0gMTA7XHJcbmNvbnN0IG1pblJhbmRvbUxlbmd0aCA9IDEwMDtcclxuY29uc3QgbWF4UmFuZG9tTGVuZ3RoID0gMTAwMDA7XHJcblxyXG5jb25zdCBnZW5lcmF0ZVJhbmRvbXMgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBsZW5ndGggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4UmFuZG9tTGVuZ3RoIC0gbWluUmFuZG9tTGVuZ3RoKSArIG1pblJhbmRvbUxlbmd0aCk7XHJcbiAgICByZXR1cm4gbmV3IEFycmF5KGxlbmd0aCkuZmlsbCgwKS5tYXAodiA9PiBNYXRoLnJhbmRvbSgpKTtcclxufVxyXG5cclxuY29uc3QgY2hhbmdlQ29sb3JUYXJnZXRzID0gKCkgPT4ge1xyXG4gICAgclRhcmdldCA9IE1hdGhUb29scy5sZXJwKHJUYXJnZXQsIDE4MCAqIE1hdGgucmFuZG9tKCksIHJhbmRvbUxlcnApO1xyXG4gICAgZ1RhcmdldCA9IE1hdGhUb29scy5sZXJwKGdUYXJnZXQsIDE4MCAqIE1hdGgucmFuZG9tKCksIHJhbmRvbUxlcnApO1xyXG4gICAgYlRhcmdldCA9IE1hdGhUb29scy5sZXJwKGJUYXJnZXQsIDE4MCAqIE1hdGgucmFuZG9tKCksIHJhbmRvbUxlcnApO1xyXG4gICAgYVRhcmdldCA9IE1hdGhUb29scy5sZXJwKGFUYXJnZXQsIDI1NSAtICgyNTUgKiBNYXRoLnJhbmRvbSgpICogMC4yKSwgcmFuZG9tTGVycCk7XHJcbn07XHJcblxyXG5sZXQgciA9IE1hdGguZmxvb3IoMTgwICogTWF0aC5yYW5kb20oKSk7XHJcbmxldCBnID0gTWF0aC5mbG9vcigxODAgKiBNYXRoLnJhbmRvbSgpKTtcclxubGV0IGIgPSBNYXRoLmZsb29yKDE4MCAqIE1hdGgucmFuZG9tKCkpO1xyXG5sZXQgYSA9IDI1NTtcclxuXHJcbmxldCByVGFyZ2V0ID0gTWF0aC5mbG9vcigyNTUgKiBNYXRoLnJhbmRvbSgpKTtcclxubGV0IGdUYXJnZXQgPSBNYXRoLmZsb29yKDI1NSAqIE1hdGgucmFuZG9tKCkpO1xyXG5sZXQgYlRhcmdldCA9IE1hdGguZmxvb3IoMjU1ICogTWF0aC5yYW5kb20oKSk7XHJcbmxldCBhVGFyZ2V0ID0gTWF0aC5mbG9vcigyNTUgKiBNYXRoLnJhbmRvbSgpKTtcclxuXHJcbmxldCByYW5kb21zID0gZ2VuZXJhdGVSYW5kb21zKCk7XHJcbmxldCByYW5kb21JbmRleCA9IDA7XHJcblxyXG5sZXQgdXBkYXRlQ291bnQgPSAwO1xyXG5cclxuY2hhbmdlQ29sb3JUYXJnZXRzKCk7XHJcbmNvbnN0IHVwZGF0ZSA9ICh0ZXN0VGV4dHVyZTogVGV4dHVyZSwgZmluYWxUZXh0dXJlOiBUZXh0dXJlKSA9PiB7XHJcbiAgICBsZXQgcmFuZG9tID0gMDtcclxuICAgIGxldCByYW5kb20yID0gMDtcclxuICAgIGxldCByYW5kb20zID0gMDtcclxuXHJcbiAgICBjaGFuZ2VDb2xvclRhcmdldHMoKTtcclxuXHJcbiAgICByID0gTWF0aFRvb2xzLmxlcnAociwgclRhcmdldCwgY29sb3JMZXJwKTtcclxuICAgIGcgPSBNYXRoVG9vbHMubGVycChnLCBnVGFyZ2V0LCBjb2xvckxlcnApO1xyXG4gICAgYiA9IE1hdGhUb29scy5sZXJwKGIsIGJUYXJnZXQsIGNvbG9yTGVycCk7XHJcbiAgICBhID0gTWF0aFRvb2xzLmxlcnAoYSwgYVRhcmdldCwgY29sb3JMZXJwKTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRlc3RUZXh0dXJlLnBpeGVscy5sZW5ndGg7IGkrPTQpIHtcclxuICAgICAgICB0ZXN0VGV4dHVyZS5waXhlbHNbaV0gPSBNYXRoVG9vbHMubGVycCh0ZXN0VGV4dHVyZS5waXhlbHNbaV0sIHIgKiByYW5kb20sIHBpeGVsTGVycCk7XHJcbiAgICAgICAgdGVzdFRleHR1cmUucGl4ZWxzW2kgKyAxXSA9IE1hdGhUb29scy5sZXJwKHRlc3RUZXh0dXJlLnBpeGVsc1tpICsgMV0sIGcgKiByYW5kb20yLCBwaXhlbExlcnApO1xyXG4gICAgICAgIHRlc3RUZXh0dXJlLnBpeGVsc1tpICsgMl0gPSBNYXRoVG9vbHMubGVycCh0ZXN0VGV4dHVyZS5waXhlbHNbaSArIDJdLCBiICogcmFuZG9tMywgcGl4ZWxMZXJwKTtcclxuICAgICAgICB0ZXN0VGV4dHVyZS5waXhlbHNbaSArIDNdID0gTWF0aFRvb2xzLmxlcnAodGVzdFRleHR1cmUucGl4ZWxzW2kgKyAzXSwgYSwgcGl4ZWxMZXJwKTtcclxuICAgICAgICAvLyB0ZXN0VGV4dHVyZS5waXhlbHNbaSArIDFdID0gZyAqIHJhbmRvbTtcclxuICAgICAgICAvLyB0ZXN0VGV4dHVyZS5waXhlbHNbaSArIDJdID0gYiAqIHJhbmRvbTtcclxuICAgICAgICAvLyB0ZXN0VGV4dHVyZS5waXhlbHNbaSArIDNdID0gYTtcclxuXHJcbiAgICAgICAgcmFuZG9tQ2hhbmdlKys7XHJcblxyXG4gICAgICAgIGlmIChyYW5kb21DaGFuZ2UgPiByYW5kb21DaGFuZ2VUaHJlYXNob2xkKSB7XHJcbiAgICAgICAgICAgIHJhbmRvbUluZGV4Kys7XHJcbiAgICAgICAgICAgIHJhbmRvbSA9IHJhbmRvbXNbcmFuZG9tSW5kZXhdO1xyXG5cclxuICAgICAgICAgICAgcmFuZG9tSW5kZXgrKztcclxuICAgICAgICAgICAgaWYgKHJhbmRvbUluZGV4ID4gcmFuZG9tcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHJhbmRvbUluZGV4ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByYW5kb20yID0gcmFuZG9tc1tyYW5kb21JbmRleF07XHJcbiAgICBcclxuICAgICAgICAgICAgcmFuZG9tSW5kZXgrKztcclxuICAgICAgICAgICAgaWYgKHJhbmRvbUluZGV4ID4gcmFuZG9tcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHJhbmRvbUluZGV4ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByYW5kb20zID0gcmFuZG9tc1tyYW5kb21JbmRleF07XHJcbiAgICAgICAgICAgICAgICByYW5kb21DaGFuZ2UgPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL2NvbnNvbGUubG9nKFwid29ya2VyXCIsIHRlc3RUZXh0dXJlLCBmaW5hbFRleHR1cmUsIHRlc3RUZXh0dXJlLnNpemUudG9SZWN0MkQoKSk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgIHJlbmRlclRleHR1cmVUb1RleHR1cmUoXHJcbiAgICAgICAgICAgIHRlc3RUZXh0dXJlLCBcclxuICAgICAgICAgICAgZmluYWxUZXh0dXJlLCBcclxuICAgICAgICAgICAgdGVzdFRleHR1cmUuc2l6ZS50b1JlY3QyRCgpLFxyXG4gICAgICAgICAgICB0ZXN0VGV4dHVyZS5zaXplLnRvUmVjdDJEKCksXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVDb3VudCsrO1xyXG4gICAgaWYgKHVwZGF0ZUNvdW50ID4gMTAwKSB7XHJcbiAgICAgICAgcmFuZG9tcyA9IGdlbmVyYXRlUmFuZG9tcygpO1xyXG4gICAgICAgIHVwZGF0ZUNvdW50ID0gMDtcclxuICAgfVxyXG59O1xyXG5cclxubGV0IHRlc3RUZXh0dXJlOiBUZXh0dXJlID0gbnVsbDtcclxuXHJcbi8vIHRlc3RUZXh0dXJlID0gbmV3IFRleHR1cmUoKTtcclxuLy8gdGVzdFRleHR1cmUuc2l6ZSA9IG5ldyBTaXplMkQoODAwLCA4MDApO1xyXG4vLyBjb25zdCBsZW5ndGggPSB0ZXN0VGV4dHVyZS5zaXplLndpZHRoICogdGVzdFRleHR1cmUuc2l6ZS5oZWlnaHQ7XHJcbi8vIHRlc3RUZXh0dXJlLnBpeGVscyA9IG5ldyBVaW50OENsYW1wZWRBcnJheShuZXcgQXJyYXlCdWZmZXIobGVuZ3RoICogVWludDhDbGFtcGVkQXJyYXkuQllURVNfUEVSX0VMRU1FTlQgKiA0KSk7XHJcblxyXG5cclxuc2VsZi5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCAoZSkgPT4ge1xyXG4gICAgY29uc3QgZGF0YSA9IGUuZGF0YTtcclxuICAgIGNvbnN0IGZpbmFsVGV4dHVyZSA9IG5ldyBUZXh0dXJlKCk7XHJcbiAgICBmaW5hbFRleHR1cmUuc2l6ZSA9IG5ldyBTaXplMkQoZGF0YS5zaXplLndpZHRoLCBkYXRhLnNpemUuaGVpZ2h0KTtcclxuICAgIGZpbmFsVGV4dHVyZS5waXhlbHMgPSBuZXcgVWludDhDbGFtcGVkQXJyYXkoZGF0YS50ZXh0dXJlQnVmZmVyKTtcclxuXHJcbiAgICBpZiAodGVzdFRleHR1cmUgPT09IG51bGwpIHtcclxuICAgICAgICB0ZXN0VGV4dHVyZSA9IG5ldyBUZXh0dXJlKCk7XHJcbiAgICAgICAgdGVzdFRleHR1cmUuc2l6ZSA9IGZpbmFsVGV4dHVyZS5zaXplLmNsb25lKCk7XHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGVzdFRleHR1cmUuc2l6ZS53aWR0aCAqIHRlc3RUZXh0dXJlLnNpemUuaGVpZ2h0O1xyXG4gICAgICAgIHRlc3RUZXh0dXJlLnBpeGVscyA9IG5ldyBVaW50OENsYW1wZWRBcnJheShuZXcgQXJyYXlCdWZmZXIobGVuZ3RoICogVWludDhDbGFtcGVkQXJyYXkuQllURVNfUEVSX0VMRU1FTlQgKiA0KSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKHRlc3RUZXh0dXJlLCBmaW5hbFRleHR1cmUpO1xyXG4gICAgKHNlbGYgYXMgYW55KS5wb3N0TWVzc2FnZSh7XHJcbiAgICAgICAgdGV4dHVyZUJ1ZmZlcjogZGF0YS50ZXh0dXJlQnVmZmVyXHJcbiAgICB9LCBbZGF0YS50ZXh0dXJlQnVmZmVyXSk7XHJcbn0pOyJdLCJzb3VyY2VSb290IjoiIn0=