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
const generateRandoms = () => {
    r = MathTools_1.MathTools.lerp(r, 255 - (50 * Math.random()), 0.1);
    g = MathTools_1.MathTools.lerp(g, 255 - (100 * Math.random()), 0.1);
    b = MathTools_1.MathTools.lerp(b, 255 - (80 * Math.random()), 0.1);
    a = MathTools_1.MathTools.lerp(a, 255 - (10 * Math.random()), 0.001);
    return new Array(1000).fill(0).map(v => Math.random());
};
let r = Math.floor(255 * Math.random());
let g = Math.floor(255 * Math.random());
let b = Math.floor(255 * Math.random());
let a = 255;
let randoms = generateRandoms();
let randomIndex = 0;
let randomChange = 0;
let updateCount = 0;
const update = (testTexture, finalTexture) => {
    let random = 0;
    for (let i = 0; i < testTexture.pixels.length; i += 4) {
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
        renderTextureToTexture(testTexture, finalTexture, testTexture.size.toRect2D(), testTexture.size.toRect2D());
    }
    updateCount++;
    if (updateCount > 100) {
        randoms = generateRandoms();
        updateCount = 0;
    }
};
let testTexture = null;
testTexture = new Texture();
testTexture.size = new Size2D_1.Size2D(512, 512);
const length = testTexture.size.width * testTexture.size.height;
testTexture.pixels = new Uint8ClampedArray(new ArrayBuffer(length * Uint8ClampedArray.BYTES_PER_ELEMENT * 4));
self.addEventListener("message", (e) => {
    const data = e.data;
    const finalTexture = new Texture();
    finalTexture.size = new Size2D_1.Size2D(data.size.width, data.size.height);
    finalTexture.pixels = new Uint8ClampedArray(data.textureBuffer);
    if (testTexture === null) {
        testTexture = new Texture();
        testTexture.size = finalTexture.size.clone();
        testTexture.size = new Size2D_1.Size2D(512, 512);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZXN0X3dvcmtlci93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vdGVzdF93b3JrZXIvLi9zcmMvbWF0aC9NYXRoVG9vbHMudHMiLCJ3ZWJwYWNrOi8vdGVzdF93b3JrZXIvLi9zcmMvbWF0aC9Qb2ludDJELnRzIiwid2VicGFjazovL3Rlc3Rfd29ya2VyLy4vc3JjL21hdGgvUmVjdDJELnRzIiwid2VicGFjazovL3Rlc3Rfd29ya2VyLy4vc3JjL21hdGgvU2l6ZTJELnRzIiwid2VicGFjazovL3Rlc3Rfd29ya2VyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Rlc3Rfd29ya2VyLy4vc3JjL3dvcmtlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7Ozs7Ozs7OztBQ1RBLDZFQUFrQztBQUVsQyxNQUFhLFNBQVM7SUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUztRQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVNLE1BQU0sQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFXLEVBQUUsSUFBWTtRQUN6RCxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSztZQUM1QixDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUMzQyxDQUFDO0lBRU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFZLEVBQUUsTUFBYztRQUMvQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUs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SSxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdkQsQ0FBQyxHQUFHLHFCQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDeEQsQ0FBQyxHQUFHLHFCQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdkQsQ0FBQyxHQUFHLHFCQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDekQsT0FBTyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFDM0QsQ0FBQztBQUVELElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0FBQ3hDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0FBQ3hDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0FBQ3hDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNaLElBQUksT0FBTyxHQUFHLGVBQWUsRUFBRSxDQUFDO0FBQ2hDLElBQUksV0FBVyxH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QUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0MsV0FBVyxDQUFDLElBQUksR0FBRyxJQUFJLGVBQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDeEMsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDaEUsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLGlCQUFpQixDQUFDLElBQUksV0FBVyxDQUFDLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2pIO0lBRUQsTUFBTSxDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUNqQyxJQUFZLENBQUMsV0FBVyxDQUFDO1FBQ3RCLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYTtLQUNwQyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7QUFDN0IsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoid29ya2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1widGVzdF93b3JrZXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1widGVzdF93b3JrZXJcIl0gPSBmYWN0b3J5KCk7XG59KShzZWxmLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCJpbXBvcnQgeyBQb2ludDJEIH0gZnJvbSBcIi4vUG9pbnQyRFwiO1xyXG5pbXBvcnQgeyBSZWN0MkQgfSBmcm9tIFwiLi9SZWN0MkRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNYXRoVG9vbHMge1xyXG4gICAgcHVibGljIHN0YXRpYyBsZXJwKGE6IG51bWJlciwgYjogbnVtYmVyLCB0OiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gYSArIChiIC0gYSkgKiB0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcG9pbnRJbnNpZGVSZWN0KHsgeCwgeSB9OiBQb2ludDJELCByZWN0OiBSZWN0MkQpIHtcclxuICAgICAgICByZXR1cm4geCA+PSByZWN0LnggJiYgeCA8IHJlY3Qud2lkdGggJiZcclxuICAgICAgICAgICAgICAgIHkgPj0gcmVjdC55ICYmIHkgPCByZWN0LmhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyb3BSZWN0KHJlY3Q6IFJlY3QyRCwgYm91bmRzOiBSZWN0MkQpIHtcclxuICAgICAgICBsZXQgeCA9IE1hdGgubWluKHJlY3QueCwgYm91bmRzLndpZHRoKTtcclxuICAgICAgICB4ID0gTWF0aC5tYXgocmVjdC54LCBib3VuZHMueCk7XHJcblxyXG4gICAgICAgIGxldCB5ID0gTWF0aC5taW4ocmVjdC55LCBib3VuZHMuaGVpZ2h0KTtcclxuICAgICAgICB5ID0gTWF0aC5tYXgocmVjdC55LCBib3VuZHMueSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHdpZHRoID0gTWF0aC5taW4ocmVjdC53aWR0aCwgYm91bmRzLndpZHRoIC0geCk7XHJcbiAgICAgICAgbGV0IGhlaWdodCA9IE1hdGgubWluKHJlY3QuaGVpZ2h0LCBib3VuZHMuaGVpZ2h0IC0geSk7XHJcblxyXG4gICAgICAgIGlmICh3aWR0aCA9PT0gMCB8fCBoZWlnaHQgPT09IDApIHtcclxuICAgICAgICAgICAgd2lkdGggPSAwO1xyXG4gICAgICAgICAgICBoZWlnaHQgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbmV3UmVjdCA9IG5ldyBSZWN0MkQoeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgcmV0dXJuIG5ld1JlY3Q7XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGludGVyZmFjZSBJUG9pbnQyRCB7XHJcbiAgICB4OiBudW1iZXI7XHJcbiAgICB5OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQb2ludDJEIGltcGxlbWVudHMgSVBvaW50MkQge1xyXG4gICAgcHVibGljIHg6IG51bWJlcjtcclxuICAgIHB1YmxpYyB5OiBudW1iZXI7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IElQb2ludDJEIH0gZnJvbSBcIi4vUG9pbnQyRFwiO1xyXG5pbXBvcnQgeyBJU2l6ZTJELCBTaXplMkQgfSBmcm9tIFwiLi9TaXplMkRcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVJlY3QyRCBleHRlbmRzIElQb2ludDJELCBJU2l6ZTJEIHtcclxuICAgIHg6IG51bWJlcjtcclxuICAgIHk6IG51bWJlcjtcclxuICAgIHdpZHRoOiBudW1iZXI7XHJcbiAgICBoZWlnaHQ6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJlY3QyRCBpbXBsZW1lbnRzIElSZWN0MkQge1xyXG4gICAgcHVibGljIHg6IG51bWJlcjtcclxuICAgIHB1YmxpYyB5OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgd2lkdGg6IG51bWJlcjtcclxuICAgIHB1YmxpYyBoZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdG9TaXplMkQoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBTaXplMkQodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBQb2ludDJEIH0gZnJvbSBcIi4vUG9pbnQyRFwiO1xyXG5pbXBvcnQgeyBSZWN0MkQgfSBmcm9tIFwiLi9SZWN0MkRcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVNpemUyRCB7XHJcbiAgICB3aWR0aDogbnVtYmVyO1xyXG4gICAgaGVpZ2h0OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTaXplMkQgaW1wbGVtZW50cyBJU2l6ZTJEIHtcclxuICAgIHB1YmxpYyB3aWR0aDogbnVtYmVyO1xyXG4gICAgcHVibGljIGhlaWdodDogbnVtYmVyO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcih3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2NhbGUoZmFjdG9yOiBQb2ludDJEKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBTaXplMkQodGhpcy53aWR0aCAqIGZhY3Rvci54LCB0aGlzLmhlaWdodCAqIGZhY3Rvci55KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyByYXRpbyhjb21wYXJhbmQ6IElTaXplMkQpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFBvaW50MkQodGhpcy53aWR0aCAvIGNvbXBhcmFuZC53aWR0aCwgdGhpcy5oZWlnaHQgLyBjb21wYXJhbmQuaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvbmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBTaXplMkQodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b1JlY3QyRCh4OiBudW1iZXIgPSAwLCB5OiBudW1iZXIgPSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZWN0MkQoeCwgeSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgfVxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiaW1wb3J0IHsgTWF0aFRvb2xzIH0gZnJvbSBcIi4vbWF0aC9NYXRoVG9vbHNcIjtcclxuaW1wb3J0IHsgUmVjdDJEIH0gZnJvbSBcIi4vbWF0aC9SZWN0MkRcIjtcclxuaW1wb3J0IHsgU2l6ZTJEIH0gZnJvbSBcIi4vbWF0aC9TaXplMkRcIjtcclxuXHJcbmNsYXNzIFRleHR1cmUge1xyXG4gICAgcHVibGljIHNpemU6IFNpemUyRDtcclxuICAgIHB1YmxpYyBwaXhlbHM6IFVpbnQ4Q2xhbXBlZEFycmF5O1xyXG59XHJcblxyXG5jb25zdCByZW5kZXJUZXh0dXJlVG9UZXh0dXJlID0gKHNvdXJjZTogVGV4dHVyZSwgdGFyZ2V0OiBUZXh0dXJlLCBzb3VyY2VCb3VuZHM6IFJlY3QyRCwgdGFyZ2V0Qm91bmRzOiBSZWN0MkQpID0+IHtcclxuICAgIGNvbnN0IHRhcmdldEFyZWEgPSBNYXRoVG9vbHMuY3JvcFJlY3QodGFyZ2V0Qm91bmRzLCB0YXJnZXQuc2l6ZS50b1JlY3QyRCgpKTtcclxuICAgIGNvbnN0IHNvdXJjZUFyZWEgPSBNYXRoVG9vbHMuY3JvcFJlY3Qoc291cmNlQm91bmRzLCBzb3VyY2Uuc2l6ZS50b1JlY3QyRCgpKTtcclxuICAgIFxyXG4gICAgLy8gY29uc3Qgc2NhbGUgPSB0YXJnZXRBcmVhLnRvU2l6ZTJEKCkucmF0aW8oc291cmNlQXJlYSk7XHJcblxyXG4gICAgLy8gbGV0IGZ1Y2tDYXRjaGVkID0gZmFsc2U7XHJcbiAgICAvLyBsZXQgZnVja0NhdGNoZWQyID0gZmFsc2U7XHJcblxyXG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0YXJnZXRBcmVhLmhlaWdodDsgeSsrKSB7XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0YXJnZXRBcmVhLndpZHRoOyB4KyspIHtcclxuICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgdGFyZ2V0WCA9IHggKyB0YXJnZXRBcmVhLng7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldFkgPSB5ICsgdGFyZ2V0QXJlYS55O1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc291cmNlWCA9IHNvdXJjZUFyZWEueCArIHg7XHJcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZVkgPSBzb3VyY2VBcmVhLnkgKyB5O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdGFyZ2V0UGl4ZWwgPSAodGFyZ2V0WSAqIHRhcmdldC5zaXplLndpZHRoICsgdGFyZ2V0WCkgKiA0O1xyXG4gICAgICAgICAgICBjb25zdCBzb3VyY2VQaXhlbCA9IChzb3VyY2VZICogc291cmNlLnNpemUud2lkdGggKyBzb3VyY2VYKSAqIDQ7XHJcblxyXG4gICAgICAgICAgICAvLyBpZiAoc291cmNlUGl4ZWwgPCAwIHx8IHNvdXJjZVBpeGVsID49IHNvdXJjZS5waXhlbHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBpZiAoIWZ1Y2tDYXRjaGVkKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJmdWNrIVwiLCB4LCB5LCBzb3VyY2VQaXhlbCwgdGFyZ2V0UGl4ZWwsIHNvdXJjZS5waXhlbHMpO1xyXG4gICAgICAgICAgICAvLyAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gICAgIGZ1Y2tDYXRjaGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAgICAgLy8gaWYgKHRhcmdldFBpeGVsIDwgMCB8fCB0YXJnZXRQaXhlbCA+PSB0YXJnZXQucGl4ZWxzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAvLyAgICAgaWYgKCFmdWNrQ2F0Y2hlZDIpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcImZ1Y2sgMiFcIiwgeCwgeSwgc291cmNlUGl4ZWwsIHRhcmdldFBpeGVsKTtcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vICAgICBmdWNrQ2F0Y2hlZDIgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgICB0YXJnZXQucGl4ZWxzW3RhcmdldFBpeGVsXSA9IHNvdXJjZS5waXhlbHNbc291cmNlUGl4ZWxdO1xyXG4gICAgICAgICAgICB0YXJnZXQucGl4ZWxzW3RhcmdldFBpeGVsICsgMV0gPSBzb3VyY2UucGl4ZWxzW3NvdXJjZVBpeGVsICsgMV07XHJcbiAgICAgICAgICAgIHRhcmdldC5waXhlbHNbdGFyZ2V0UGl4ZWwgKyAyXSA9IHNvdXJjZS5waXhlbHNbc291cmNlUGl4ZWwgKyAyXTtcclxuICAgICAgICAgICAgdGFyZ2V0LnBpeGVsc1t0YXJnZXRQaXhlbCArIDNdID0gc291cmNlLnBpeGVsc1tzb3VyY2VQaXhlbCArIDNdO1xyXG5cclxuICAgICAgICAgICAgLy8gdGFyZ2V0LnBpeGVsc1t0YXJnZXRQaXhlbF0gPSAwO1xyXG4gICAgICAgICAgICAvLyB0YXJnZXQucGl4ZWxzW3RhcmdldFBpeGVsICsgMV0gPSAwO1xyXG4gICAgICAgICAgICAvLyB0YXJnZXQucGl4ZWxzW3RhcmdldFBpeGVsICsgMl0gPSAwO1xyXG4gICAgICAgICAgICAvLyB0YXJnZXQucGl4ZWxzW3RhcmdldFBpeGVsICsgM10gPSAyNTU7XHJcbiAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc29sZS5sb2coXCJ3b3JrZXIgaXMgcnVuXCIpO1xyXG5cclxuY29uc3QgZ2VuZXJhdGVSYW5kb21zID0gKCkgPT4ge1xyXG4gICAgciA9IE1hdGhUb29scy5sZXJwKHIsIDI1NSAtICg1MCAqIE1hdGgucmFuZG9tKCkpLCAwLjEpO1xyXG4gICAgZyA9IE1hdGhUb29scy5sZXJwKGcsIDI1NSAtICgxMDAgKiBNYXRoLnJhbmRvbSgpKSwgMC4xKTtcclxuICAgIGIgPSBNYXRoVG9vbHMubGVycChiLCAyNTUgLSAoODAgKiBNYXRoLnJhbmRvbSgpKSwgMC4xKTtcclxuICAgIGEgPSBNYXRoVG9vbHMubGVycChhLCAyNTUgLSAoMTAgKiBNYXRoLnJhbmRvbSgpKSwgMC4wMDEpO1xyXG4gICAgcmV0dXJuIG5ldyBBcnJheSgxMDAwKS5maWxsKDApLm1hcCh2ID0+IE1hdGgucmFuZG9tKCkpO1xyXG59XHJcblxyXG5sZXQgciA9IE1hdGguZmxvb3IoMjU1ICogTWF0aC5yYW5kb20oKSk7XHJcbmxldCBnID0gTWF0aC5mbG9vcigyNTUgKiBNYXRoLnJhbmRvbSgpKTtcclxubGV0IGIgPSBNYXRoLmZsb29yKDI1NSAqIE1hdGgucmFuZG9tKCkpO1xyXG5sZXQgYSA9IDI1NTtcclxubGV0IHJhbmRvbXMgPSBnZW5lcmF0ZVJhbmRvbXMoKTtcclxubGV0IHJhbmRvbUluZGV4ID0gMDtcclxubGV0IHJhbmRvbUNoYW5nZSA9IDA7XHJcblxyXG5sZXQgdXBkYXRlQ291bnQgPSAwO1xyXG5jb25zdCB1cGRhdGUgPSAodGVzdFRleHR1cmU6IFRleHR1cmUsIGZpbmFsVGV4dHVyZTogVGV4dHVyZSkgPT4ge1xyXG4gICAgbGV0IHJhbmRvbSA9IDA7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXN0VGV4dHVyZS5waXhlbHMubGVuZ3RoOyBpKz00KSB7XHJcbiAgICAgICAgcmFuZG9tID0gcmFuZG9tc1tyYW5kb21JbmRleF07XHJcblxyXG4gICAgICAgIHRlc3RUZXh0dXJlLnBpeGVsc1tpXSA9IHIgKiByYW5kb207XHJcbiAgICAgICAgdGVzdFRleHR1cmUucGl4ZWxzW2kgKyAxXSA9IGcgKiByYW5kb207XHJcbiAgICAgICAgdGVzdFRleHR1cmUucGl4ZWxzW2kgKyAyXSA9IGIgKiByYW5kb207XHJcbiAgICAgICAgdGVzdFRleHR1cmUucGl4ZWxzW2kgKyAzXSA9IGE7XHJcblxyXG4gICAgICAgIHJhbmRvbUNoYW5nZSsrO1xyXG5cclxuICAgICAgICBpZiAocmFuZG9tQ2hhbmdlID4gMTApIHtcclxuICAgICAgICAgICAgcmFuZG9tSW5kZXgrKztcclxuICAgICAgICAgICAgcmFuZG9tQ2hhbmdlID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJhbmRvbUluZGV4ID4gcmFuZG9tcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmFuZG9tSW5kZXggPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL2NvbnNvbGUubG9nKFwid29ya2VyXCIsIHRlc3RUZXh0dXJlLCBmaW5hbFRleHR1cmUsIHRlc3RUZXh0dXJlLnNpemUudG9SZWN0MkQoKSk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgIHJlbmRlclRleHR1cmVUb1RleHR1cmUoXHJcbiAgICAgICAgICAgIHRlc3RUZXh0dXJlLCBcclxuICAgICAgICAgICAgZmluYWxUZXh0dXJlLCBcclxuICAgICAgICAgICAgdGVzdFRleHR1cmUuc2l6ZS50b1JlY3QyRCgpLFxyXG4gICAgICAgICAgICB0ZXN0VGV4dHVyZS5zaXplLnRvUmVjdDJEKCksXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVDb3VudCsrO1xyXG4gICAgaWYgKHVwZGF0ZUNvdW50ID4gMTAwKSB7XHJcbiAgICAgICAgcmFuZG9tcyA9IGdlbmVyYXRlUmFuZG9tcygpO1xyXG4gICAgICAgIHVwZGF0ZUNvdW50ID0gMDtcclxuICAgfVxyXG59O1xyXG5cclxubGV0IHRlc3RUZXh0dXJlOiBUZXh0dXJlID0gbnVsbDtcclxuXHJcbnRlc3RUZXh0dXJlID0gbmV3IFRleHR1cmUoKTtcclxudGVzdFRleHR1cmUuc2l6ZSA9IG5ldyBTaXplMkQoNTEyLCA1MTIpO1xyXG5jb25zdCBsZW5ndGggPSB0ZXN0VGV4dHVyZS5zaXplLndpZHRoICogdGVzdFRleHR1cmUuc2l6ZS5oZWlnaHQ7XHJcbnRlc3RUZXh0dXJlLnBpeGVscyA9IG5ldyBVaW50OENsYW1wZWRBcnJheShuZXcgQXJyYXlCdWZmZXIobGVuZ3RoICogVWludDhDbGFtcGVkQXJyYXkuQllURVNfUEVSX0VMRU1FTlQgKiA0KSk7XHJcblxyXG5cclxuc2VsZi5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCAoZSkgPT4ge1xyXG4gICAgY29uc3QgZGF0YSA9IGUuZGF0YTtcclxuICAgIGNvbnN0IGZpbmFsVGV4dHVyZSA9IG5ldyBUZXh0dXJlKCk7XHJcbiAgICBmaW5hbFRleHR1cmUuc2l6ZSA9IG5ldyBTaXplMkQoZGF0YS5zaXplLndpZHRoLCBkYXRhLnNpemUuaGVpZ2h0KTtcclxuICAgIGZpbmFsVGV4dHVyZS5waXhlbHMgPSBuZXcgVWludDhDbGFtcGVkQXJyYXkoZGF0YS50ZXh0dXJlQnVmZmVyKTtcclxuXHJcbiAgICBpZiAodGVzdFRleHR1cmUgPT09IG51bGwpIHtcclxuICAgICAgICB0ZXN0VGV4dHVyZSA9IG5ldyBUZXh0dXJlKCk7XHJcbiAgICAgICAgdGVzdFRleHR1cmUuc2l6ZSA9IGZpbmFsVGV4dHVyZS5zaXplLmNsb25lKCk7XHJcbiAgICAgICAgdGVzdFRleHR1cmUuc2l6ZSA9IG5ldyBTaXplMkQoNTEyLCA1MTIpO1xyXG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IHRlc3RUZXh0dXJlLnNpemUud2lkdGggKiB0ZXN0VGV4dHVyZS5zaXplLmhlaWdodDtcclxuICAgICAgICB0ZXN0VGV4dHVyZS5waXhlbHMgPSBuZXcgVWludDhDbGFtcGVkQXJyYXkobmV3IEFycmF5QnVmZmVyKGxlbmd0aCAqIFVpbnQ4Q2xhbXBlZEFycmF5LkJZVEVTX1BFUl9FTEVNRU5UICogNCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSh0ZXN0VGV4dHVyZSwgZmluYWxUZXh0dXJlKTtcclxuICAgIChzZWxmIGFzIGFueSkucG9zdE1lc3NhZ2Uoe1xyXG4gICAgICAgIHRleHR1cmVCdWZmZXI6IGRhdGEudGV4dHVyZUJ1ZmZlclxyXG4gICAgfSwgW2RhdGEudGV4dHVyZUJ1ZmZlcl0pO1xyXG59KTsiXSwic291cmNlUm9vdCI6IiJ9