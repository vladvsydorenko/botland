(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["botcolony"] = factory();
	else
		root["botcolony"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const Size2D_1 = __webpack_require__(/*! ./math/Size2D */ "./src/math/Size2D.ts");
class Texture {
}
self.addEventListener("DOMContentLoaded", () => {
    const renderSize = new Size2D_1.Size2D(800, 600);
    const canvas = document.getElementById("app");
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

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ib3Rjb2xvbnkvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2JvdGNvbG9ueS8uL3NyYy9tYXRoL1BvaW50MkQudHMiLCJ3ZWJwYWNrOi8vYm90Y29sb255Ly4vc3JjL21hdGgvUmVjdDJELnRzIiwid2VicGFjazovL2JvdGNvbG9ueS8uL3NyYy9tYXRoL1NpemUyRC50cyIsIndlYnBhY2s6Ly9ib3Rjb2xvbnkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYm90Y29sb255Ly4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPOzs7Ozs7Ozs7Ozs7O0FDTEEsTUFBYSxPQUFPO0lBSWhCLFlBQW1CLENBQVMsRUFBRSxDQUFTO1FBQ25DLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDZixDQUFDO0NBQ0o7QUFSRCwwQkFRQzs7Ozs7Ozs7Ozs7Ozs7QUNaRCw2RUFBMkM7QUFTM0MsTUFBYSxNQUFNO0lBTWYsWUFBbUIsQ0FBUyxFQUFFLENBQVMsRUFBRSxLQUFhLEVBQUUsTUFBYztRQUNsRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNYLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDekIsQ0FBQztJQUVNLFFBQVE7UUFDWCxPQUFPLElBQUksZUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9DLENBQUM7Q0FDSjtBQWhCRCx3QkFnQkM7Ozs7Ozs7Ozs7Ozs7O0FDMUJELGdGQUFvQztB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WUFBWSxDQUFDLE1BQU0sR0FBRyxJQUFJLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbEUsU0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixnQ0FBZ0M7UUFDaEMsV0FBVztJQUNmLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUNmLElBQUksRUFBRSxVQUFVO1FBQ2hCLGFBQWE7S0FDaEIsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFFcEIsVUFBVSxFQUFFLENBQUM7QUFDakIsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJib3Rjb2xvbnlcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiYm90Y29sb255XCJdID0gZmFjdG9yeSgpO1xufSkoc2VsZiwgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiZXhwb3J0IGludGVyZmFjZSBJUG9pbnQyRCB7XHJcbiAgICB4OiBudW1iZXI7XHJcbiAgICB5OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQb2ludDJEIGltcGxlbWVudHMgSVBvaW50MkQge1xyXG4gICAgcHVibGljIHg6IG51bWJlcjtcclxuICAgIHB1YmxpYyB5OiBudW1iZXI7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IElQb2ludDJEIH0gZnJvbSBcIi4vUG9pbnQyRFwiO1xyXG5pbXBvcnQgeyBJU2l6ZTJELCBTaXplMkQgfSBmcm9tIFwiLi9TaXplMkRcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVJlY3QyRCBleHRlbmRzIElQb2ludDJELCBJU2l6ZTJEIHtcclxuICAgIHg6IG51bWJlcjtcclxuICAgIHk6IG51bWJlcjtcclxuICAgIHdpZHRoOiBudW1iZXI7XHJcbiAgICBoZWlnaHQ6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJlY3QyRCBpbXBsZW1lbnRzIElSZWN0MkQge1xyXG4gICAgcHVibGljIHg6IG51bWJlcjtcclxuICAgIHB1YmxpYyB5OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgd2lkdGg6IG51bWJlcjtcclxuICAgIHB1YmxpYyBoZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdG9TaXplMkQoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBTaXplMkQodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBQb2ludDJEIH0gZnJvbSBcIi4vUG9pbnQyRFwiO1xyXG5pbXBvcnQgeyBSZWN0MkQgfSBmcm9tIFwiLi9SZWN0MkRcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVNpemUyRCB7XHJcbiAgICB3aWR0aDogbnVtYmVyO1xyXG4gICAgaGVpZ2h0OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTaXplMkQgaW1wbGVtZW50cyBJU2l6ZTJEIHtcclxuICAgIHB1YmxpYyB3aWR0aDogbnVtYmVyO1xyXG4gICAgcHVibGljIGhlaWdodDogbnVtYmVyO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcih3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2NhbGUoZmFjdG9yOiBQb2ludDJEKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBTaXplMkQodGhpcy53aWR0aCAqIGZhY3Rvci54LCB0aGlzLmhlaWdodCAqIGZhY3Rvci55KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyByYXRpbyhjb21wYXJhbmQ6IElTaXplMkQpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFBvaW50MkQodGhpcy53aWR0aCAvIGNvbXBhcmFuZC53aWR0aCwgdGhpcy5oZWlnaHQgLyBjb21wYXJhbmQuaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvbmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBTaXplMkQodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b1JlY3QyRCh4OiBudW1iZXIgPSAwLCB5OiBudW1iZXIgPSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZWN0MkQoeCwgeSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgfVxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiaW1wb3J0IHsgTWF0aFRvb2xzIH0gZnJvbSBcIi4vbWF0aC9NYXRoVG9vbHNcIjtcclxuaW1wb3J0IHsgUG9pbnQyRCB9IGZyb20gXCIuL21hdGgvUG9pbnQyRFwiO1xyXG5pbXBvcnQgeyBSZWN0MkQgfSBmcm9tIFwiLi9tYXRoL1JlY3QyRFwiO1xyXG5pbXBvcnQgeyBTaXplMkQgfSBmcm9tIFwiLi9tYXRoL1NpemUyRFwiO1xyXG5cclxuY2xhc3MgVGV4dHVyZSB7XHJcbiAgICBwdWJsaWMgc2l6ZTogU2l6ZTJEO1xyXG4gICAgcHVibGljIHBpeGVsczogVWludDhDbGFtcGVkQXJyYXk7XHJcbn1cclxuXHJcbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xyXG4gICAgY29uc3QgcmVuZGVyU2l6ZSA9IG5ldyBTaXplMkQoODAwLCA2MDApO1xyXG4gICAgXHJcbiAgICBjb25zdCBjYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBcIik7XHJcbiAgICBjYW52YXMud2lkdGggPSByZW5kZXJTaXplLndpZHRoO1xyXG4gICAgY2FudmFzLmhlaWdodCA9IHJlbmRlclNpemUuaGVpZ2h0O1xyXG5cclxuICAgIGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuICAgIGNvbnN0IGZpbmFsVGV4dHVyZSA9IG5ldyBUZXh0dXJlKCk7XHJcbiAgICBmaW5hbFRleHR1cmUuc2l6ZSA9IHJlbmRlclNpemUuY2xvbmUoKTtcclxuICAgIGxldCB0ZXh0dXJlQnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKGZpbmFsVGV4dHVyZS5zaXplLndpZHRoICogZmluYWxUZXh0dXJlLnNpemUuaGVpZ2h0ICogNCAqIFVpbnQ4Q2xhbXBlZEFycmF5LkJZVEVTX1BFUl9FTEVNRU5UKTtcclxuICAgIGZpbmFsVGV4dHVyZS5waXhlbHMgPSBuZXcgVWludDhDbGFtcGVkQXJyYXkodGV4dHVyZUJ1ZmZlcik7XHJcblxyXG4gICAgbGV0IGZwcyA9IDA7XHJcbiAgICBsZXQgbGFzdEZwcyA9IDA7XHJcbiAgICBsZXQgc3RhcnQgPSBwZXJmb3JtYW5jZS5ub3coKTtcclxuICAgIGNvbnN0IHVwZGF0ZSA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBpbWFnZURhdGEgPSBuZXcgSW1hZ2VEYXRhKGZpbmFsVGV4dHVyZS5waXhlbHMsIGZpbmFsVGV4dHVyZS5zaXplLndpZHRoLCBmaW5hbFRleHR1cmUuc2l6ZS5oZWlnaHQpO1xyXG4gICAgICAgIGN0eC5wdXRJbWFnZURhdGEoaW1hZ2VEYXRhLCAwLCAwKTtcclxuXHJcbiAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMC43O1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiMxYTQ0NmFcIjtcclxuICAgICAgICBjdHguZmlsbFJlY3QocmVuZGVyU2l6ZS53aWR0aCAtIDg0LCAwLCA4NCwgNDQpO1xyXG5cclxuICAgICAgICBjdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcclxuXHJcbiAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMC4xO1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiM0MjQyNDJcIjtcclxuICAgICAgICBjdHguZm9udCA9IFwibm9ybWFsIGJvbGQgMjJweCBzYW5zLXNlcmlmXCI7XHJcbiAgICAgICAgY3R4LmZpbGxUZXh0KGxhc3RGcHMudG9TdHJpbmcoKSwgcmVuZGVyU2l6ZS53aWR0aCAtIDE2LCAzNCk7XHJcblxyXG4gICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDAuMjtcclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjNDI0MjQyXCI7XHJcbiAgICAgICAgY3R4LmZvbnQgPSBcIm5vcm1hbCBib2xkIDIzcHggc2Fucy1zZXJpZlwiO1xyXG4gICAgICAgIGN0eC5maWxsVGV4dChsYXN0RnBzLnRvU3RyaW5nKCksIHJlbmRlclNpemUud2lkdGggLSAxNywgMzUpO1xyXG5cclxuICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSAxO1xyXG4gICAgICAgIGNvbnN0IGZwc0dyZWVuID0gMjU1ICogKGxhc3RGcHMgLyA2MCk7XHJcbiAgICAgICAgY29uc3QgZnBzUmVkID0gMjU1IC0gMjU1ICogKGxhc3RGcHMgLyAzMCk7XHJcbiAgICAgICAgY29uc3QgZnBzQmx1ZSA9IDI1NSAqIChsYXN0RnBzIC8gMzAwKTtcclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gYHJnYmEoJHtmcHNSZWR9LCAke2Zwc0dyZWVufSwgJHtmcHNCbHVlfSwgMSlgO1xyXG4gICAgICAgIGN0eC5mb250ID0gXCJub3JtYWwgYm9sZCAyMHB4IHNhbnMtc2VyaWZcIjtcclxuICAgICAgICBjdHguZmlsbFRleHQobGFzdEZwcy50b1N0cmluZygpLCByZW5kZXJTaXplLndpZHRoIC0gMjAsIDMwKTtcclxuXHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiI2Q4ZGZlOFwiO1xyXG4gICAgICAgIGN0eC5maWxsVGV4dChcImZwczpcIiwgcmVuZGVyU2l6ZS53aWR0aCAtIDYwLCAzMCk7XHJcblxyXG4gICAgICAgIC8vIGNvbnN0IGltYWdlID0gaGlkZGVuQ3R4LmdldEltYWdlRGF0YSgwLCAwLCByZW5kZXJTaXplLndpZHRoLCByZW5kZXJTaXplLmhlaWdodCk7XHJcbiAgICAgICAgLy8gY3R4LnB1dEltYWdlRGF0YShpbWFnZSwgMCwgMCk7XHJcblxyXG4gICAgICAgIGZwcysrO1xyXG4gICAgICAgIGNvbnN0IGVuZCA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgICAgIGNvbnN0IGRpZmYgPSBlbmQgLSBzdGFydDtcclxuICAgICAgICBpZiAoZGlmZiA+PSAxMDAwKSB7XHJcbiAgICAgICAgICAgIHN0YXJ0ID0gZW5kO1xyXG4gICAgICAgICAgICBsYXN0RnBzID0gZnBzO1xyXG4gICAgICAgICAgICBmcHMgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKHtcclxuICAgICAgICAgICAgc2l6ZTogcmVuZGVyU2l6ZSxcclxuICAgICAgICAgICAgdGV4dHVyZUJ1ZmZlcjogZmluYWxUZXh0dXJlLnBpeGVscy5idWZmZXJcclxuICAgICAgICB9LCBbZmluYWxUZXh0dXJlLnBpeGVscy5idWZmZXJdKTtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGF2YWlsYWJsZSA9IGZhbHNlO1xyXG4gICAgY29uc3QgdXBkYXRlVGljayA9ICgpID0+IHtcclxuICAgICAgICBpZiAoYXZhaWxhYmxlKSB7XHJcbiAgICAgICAgICAgIGF2YWlsYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB1cGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZVRpY2spO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCB3b3JrZXIgPSBuZXcgV29ya2VyKFwiLi9kaXN0L3dvcmtlci5qc1wiKTtcclxuXHJcbiAgICB3b3JrZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgKGUpID0+IHtcclxuICAgICAgICBmaW5hbFRleHR1cmUucGl4ZWxzID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KGUuZGF0YS50ZXh0dXJlQnVmZmVyKTtcclxuICAgICAgICBhdmFpbGFibGUgPSB0cnVlO1xyXG4gICAgICAgIC8vcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XHJcbiAgICAgICAgLy91cGRhdGUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHdvcmtlci5wb3N0TWVzc2FnZSh7XHJcbiAgICAgICAgc2l6ZTogcmVuZGVyU2l6ZSxcclxuICAgICAgICB0ZXh0dXJlQnVmZmVyXHJcbiAgICB9LCBbdGV4dHVyZUJ1ZmZlcl0pO1xyXG5cclxuICAgIHVwZGF0ZVRpY2soKTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=