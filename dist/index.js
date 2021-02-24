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
    const renderSize = new Size2D_1.Size2D(512, 512);
    const canvas = document.getElementById("app");
    canvas.width = renderSize.width;
    canvas.height = renderSize.height;
    const hiddenCanvas = document.createElement("canvas");
    hiddenCanvas.width = renderSize.width;
    hiddenCanvas.height = renderSize.height;
    const ctx = canvas.getContext("2d");
    let hiddenCtx = hiddenCanvas.getContext("2d");
    hiddenCtx = canvas.getContext("2d");
    const finalTexture = new Texture();
    finalTexture.size = renderSize.clone();
    let textureBuffer = new ArrayBuffer(finalTexture.size.width * finalTexture.size.height * 4 * Uint8ClampedArray.BYTES_PER_ELEMENT);
    finalTexture.pixels = new Uint8ClampedArray(textureBuffer);
    let fps = 0;
    let lastFps = 0;
    let start = performance.now();
    const update = () => {
        const imageData = new ImageData(finalTexture.pixels, finalTexture.size.width, finalTexture.size.height);
        hiddenCtx.putImageData(imageData, 0, 0);
        hiddenCtx.globalAlpha = 0.7;
        hiddenCtx.fillStyle = "#1a446a";
        hiddenCtx.fillRect(renderSize.width - 84, 0, 84, 44);
        hiddenCtx.textAlign = "center";
        hiddenCtx.globalAlpha = 0.1;
        hiddenCtx.fillStyle = "#424242";
        hiddenCtx.font = "normal bold 22px sans-serif";
        hiddenCtx.fillText(lastFps.toString(), renderSize.width - 16, 34);
        hiddenCtx.globalAlpha = 0.2;
        hiddenCtx.fillStyle = "#424242";
        hiddenCtx.font = "normal bold 23px sans-serif";
        hiddenCtx.fillText(lastFps.toString(), renderSize.width - 17, 35);
        hiddenCtx.globalAlpha = 1;
        const fpsGreen = 255 * (lastFps / 60);
        const fpsRed = 255 - 255 * (lastFps / 30);
        const fpsBlue = 255 * (lastFps / 300);
        hiddenCtx.fillStyle = `rgba(${fpsRed}, ${fpsGreen}, ${fpsBlue}, 1)`;
        hiddenCtx.font = "normal bold 20px sans-serif";
        hiddenCtx.fillText(lastFps.toString(), renderSize.width - 20, 30);
        hiddenCtx.fillStyle = "#d8dfe8";
        hiddenCtx.fillText("fps:", renderSize.width - 60, 30);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ib3Rjb2xvbnkvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2JvdGNvbG9ueS8uL3NyYy9tYXRoL1BvaW50MkQudHMiLCJ3ZWJwYWNrOi8vYm90Y29sb255Ly4vc3JjL21hdGgvUmVjdDJELnRzIiwid2VicGFjazovL2JvdGNvbG9ueS8uL3NyYy9tYXRoL1NpemUyRC50cyIsIndlYnBhY2s6Ly9ib3Rjb2xvbnkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYm90Y29sb255Ly4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPOzs7Ozs7Ozs7Ozs7O0FDTEEsTUFBYSxPQUFPO0lBSWhCLFlBQW1CLENBQVMsRUFBRSxDQUFTO1FBQ25DLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDZixDQUFDO0NBQ0o7QUFSRCwwQkFRQzs7Ozs7Ozs7Ozs7Ozs7QUNaRCw2RUFBMkM7QUFTM0MsTUFBYSxNQUFNO0lBTWYsWUFBbUIsQ0FBUyxFQUFFLENBQVMsRUFBRSxLQUFhLEVBQUUsTUFBYztRQUNsRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNYLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDekIsQ0FBQztJQUVNLFFBQVE7UUFDWCxPQUFPLElBQUksZUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9DLENBQUM7Q0FDSjtBQWhCRCx3QkFnQkM7Ozs7Ozs7Ozs7Ozs7O0FDMUJELGdGQUFvQztB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VUFBVSxHQUFHLEdBQUcsRUFBRTtRQUNwQixJQUFJLFNBQVMsRUFBRTtZQUNYLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDbEIsTUFBTSxFQUFFLENBQUM7U0FDWjtRQUNELHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQztJQUVGLE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFFOUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ3JDLFlBQVksQ0FBQyxNQUFNLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2xFLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIsZ0NBQWdDO1FBQ2hDLFdBQVc7SUFDZixDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDZixJQUFJLEVBQUUsVUFBVTtRQUNoQixhQUFhO0tBQ2hCLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBRXBCLFVBQVUsRUFBRSxDQUFDO0FBQ2pCLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYm90Y29sb255XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImJvdGNvbG9ueVwiXSA9IGZhY3RvcnkoKTtcbn0pKHNlbGYsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsImV4cG9ydCBpbnRlcmZhY2UgSVBvaW50MkQge1xyXG4gICAgeDogbnVtYmVyO1xyXG4gICAgeTogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUG9pbnQyRCBpbXBsZW1lbnRzIElQb2ludDJEIHtcclxuICAgIHB1YmxpYyB4OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgeTogbnVtYmVyO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJUG9pbnQyRCB9IGZyb20gXCIuL1BvaW50MkRcIjtcclxuaW1wb3J0IHsgSVNpemUyRCwgU2l6ZTJEIH0gZnJvbSBcIi4vU2l6ZTJEXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElSZWN0MkQgZXh0ZW5kcyBJUG9pbnQyRCwgSVNpemUyRCB7XHJcbiAgICB4OiBudW1iZXI7XHJcbiAgICB5OiBudW1iZXI7XHJcbiAgICB3aWR0aDogbnVtYmVyO1xyXG4gICAgaGVpZ2h0OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSZWN0MkQgaW1wbGVtZW50cyBJUmVjdDJEIHtcclxuICAgIHB1YmxpYyB4OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgeTogbnVtYmVyO1xyXG4gICAgcHVibGljIHdpZHRoOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgaGVpZ2h0OiBudW1iZXI7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRvU2l6ZTJEKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgU2l6ZTJEKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHsgUG9pbnQyRCB9IGZyb20gXCIuL1BvaW50MkRcIjtcclxuaW1wb3J0IHsgUmVjdDJEIH0gZnJvbSBcIi4vUmVjdDJEXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTaXplMkQge1xyXG4gICAgd2lkdGg6IG51bWJlcjtcclxuICAgIGhlaWdodDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2l6ZTJEIGltcGxlbWVudHMgSVNpemUyRCB7XHJcbiAgICBwdWJsaWMgd2lkdGg6IG51bWJlcjtcclxuICAgIHB1YmxpYyBoZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3Iod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNjYWxlKGZhY3RvcjogUG9pbnQyRCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgU2l6ZTJEKHRoaXMud2lkdGggKiBmYWN0b3IueCwgdGhpcy5oZWlnaHQgKiBmYWN0b3IueSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmF0aW8oY29tcGFyYW5kOiBJU2l6ZTJEKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQb2ludDJEKHRoaXMud2lkdGggLyBjb21wYXJhbmQud2lkdGgsIHRoaXMuaGVpZ2h0IC8gY29tcGFyYW5kLmhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsb25lKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgU2l6ZTJEKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdG9SZWN0MkQoeDogbnVtYmVyID0gMCwgeTogbnVtYmVyID0gMCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVjdDJEKHgsIHksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgIH1cclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsImltcG9ydCB7IE1hdGhUb29scyB9IGZyb20gXCIuL21hdGgvTWF0aFRvb2xzXCI7XHJcbmltcG9ydCB7IFBvaW50MkQgfSBmcm9tIFwiLi9tYXRoL1BvaW50MkRcIjtcclxuaW1wb3J0IHsgUmVjdDJEIH0gZnJvbSBcIi4vbWF0aC9SZWN0MkRcIjtcclxuaW1wb3J0IHsgU2l6ZTJEIH0gZnJvbSBcIi4vbWF0aC9TaXplMkRcIjtcclxuXHJcbmNsYXNzIFRleHR1cmUge1xyXG4gICAgcHVibGljIHNpemU6IFNpemUyRDtcclxuICAgIHB1YmxpYyBwaXhlbHM6IFVpbnQ4Q2xhbXBlZEFycmF5O1xyXG59XHJcblxyXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuICAgIGNvbnN0IHJlbmRlclNpemUgPSBuZXcgU2l6ZTJEKDUxMiwgNTEyKTtcclxuICAgIFxyXG4gICAgY29uc3QgY2FudmFzID0gPEhUTUxDYW52YXNFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwXCIpO1xyXG4gICAgY2FudmFzLndpZHRoID0gcmVuZGVyU2l6ZS53aWR0aDtcclxuICAgIGNhbnZhcy5oZWlnaHQgPSByZW5kZXJTaXplLmhlaWdodDtcclxuXHJcbiAgICBjb25zdCBoaWRkZW5DYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgIGhpZGRlbkNhbnZhcy53aWR0aCA9IHJlbmRlclNpemUud2lkdGg7XHJcbiAgICBoaWRkZW5DYW52YXMuaGVpZ2h0ID0gcmVuZGVyU2l6ZS5oZWlnaHQ7ICAgIFxyXG5cclxuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICBsZXQgaGlkZGVuQ3R4ID0gaGlkZGVuQ2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgIGhpZGRlbkN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG4gICAgY29uc3QgZmluYWxUZXh0dXJlID0gbmV3IFRleHR1cmUoKTtcclxuICAgIGZpbmFsVGV4dHVyZS5zaXplID0gcmVuZGVyU2l6ZS5jbG9uZSgpO1xyXG4gICAgbGV0IHRleHR1cmVCdWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIoZmluYWxUZXh0dXJlLnNpemUud2lkdGggKiBmaW5hbFRleHR1cmUuc2l6ZS5oZWlnaHQgKiA0ICogVWludDhDbGFtcGVkQXJyYXkuQllURVNfUEVSX0VMRU1FTlQpO1xyXG4gICAgZmluYWxUZXh0dXJlLnBpeGVscyA9IG5ldyBVaW50OENsYW1wZWRBcnJheSh0ZXh0dXJlQnVmZmVyKTtcclxuXHJcbiAgICBsZXQgZnBzID0gMDtcclxuICAgIGxldCBsYXN0RnBzID0gMDtcclxuICAgIGxldCBzdGFydCA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgY29uc3QgdXBkYXRlID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGltYWdlRGF0YSA9IG5ldyBJbWFnZURhdGEoZmluYWxUZXh0dXJlLnBpeGVscywgZmluYWxUZXh0dXJlLnNpemUud2lkdGgsIGZpbmFsVGV4dHVyZS5zaXplLmhlaWdodCk7XHJcbiAgICAgICAgaGlkZGVuQ3R4LnB1dEltYWdlRGF0YShpbWFnZURhdGEsIDAsIDApO1xyXG5cclxuICAgICAgICBoaWRkZW5DdHguZ2xvYmFsQWxwaGEgPSAwLjc7XHJcbiAgICAgICAgaGlkZGVuQ3R4LmZpbGxTdHlsZSA9IFwiIzFhNDQ2YVwiO1xyXG4gICAgICAgIGhpZGRlbkN0eC5maWxsUmVjdChyZW5kZXJTaXplLndpZHRoIC0gODQsIDAsIDg0LCA0NCk7XHJcblxyXG4gICAgICAgIGhpZGRlbkN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG5cclxuICAgICAgICBoaWRkZW5DdHguZ2xvYmFsQWxwaGEgPSAwLjE7XHJcbiAgICAgICAgaGlkZGVuQ3R4LmZpbGxTdHlsZSA9IFwiIzQyNDI0MlwiO1xyXG4gICAgICAgIGhpZGRlbkN0eC5mb250ID0gXCJub3JtYWwgYm9sZCAyMnB4IHNhbnMtc2VyaWZcIjtcclxuICAgICAgICBoaWRkZW5DdHguZmlsbFRleHQobGFzdEZwcy50b1N0cmluZygpLCByZW5kZXJTaXplLndpZHRoIC0gMTYsIDM0KTtcclxuXHJcbiAgICAgICAgaGlkZGVuQ3R4Lmdsb2JhbEFscGhhID0gMC4yO1xyXG4gICAgICAgIGhpZGRlbkN0eC5maWxsU3R5bGUgPSBcIiM0MjQyNDJcIjtcclxuICAgICAgICBoaWRkZW5DdHguZm9udCA9IFwibm9ybWFsIGJvbGQgMjNweCBzYW5zLXNlcmlmXCI7XHJcbiAgICAgICAgaGlkZGVuQ3R4LmZpbGxUZXh0KGxhc3RGcHMudG9TdHJpbmcoKSwgcmVuZGVyU2l6ZS53aWR0aCAtIDE3LCAzNSk7XHJcblxyXG4gICAgICAgIGhpZGRlbkN0eC5nbG9iYWxBbHBoYSA9IDE7XHJcbiAgICAgICAgY29uc3QgZnBzR3JlZW4gPSAyNTUgKiAobGFzdEZwcyAvIDYwKTtcclxuICAgICAgICBjb25zdCBmcHNSZWQgPSAyNTUgLSAyNTUgKiAobGFzdEZwcyAvIDMwKTtcclxuICAgICAgICBjb25zdCBmcHNCbHVlID0gMjU1ICogKGxhc3RGcHMgLyAzMDApO1xyXG4gICAgICAgIGhpZGRlbkN0eC5maWxsU3R5bGUgPSBgcmdiYSgke2Zwc1JlZH0sICR7ZnBzR3JlZW59LCAke2Zwc0JsdWV9LCAxKWA7XHJcbiAgICAgICAgaGlkZGVuQ3R4LmZvbnQgPSBcIm5vcm1hbCBib2xkIDIwcHggc2Fucy1zZXJpZlwiO1xyXG4gICAgICAgIGhpZGRlbkN0eC5maWxsVGV4dChsYXN0RnBzLnRvU3RyaW5nKCksIHJlbmRlclNpemUud2lkdGggLSAyMCwgMzApO1xyXG5cclxuICAgICAgICBoaWRkZW5DdHguZmlsbFN0eWxlID0gXCIjZDhkZmU4XCI7XHJcbiAgICAgICAgaGlkZGVuQ3R4LmZpbGxUZXh0KFwiZnBzOlwiLCByZW5kZXJTaXplLndpZHRoIC0gNjAsIDMwKTtcclxuXHJcbiAgICAgICAgLy8gY29uc3QgaW1hZ2UgPSBoaWRkZW5DdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIHJlbmRlclNpemUud2lkdGgsIHJlbmRlclNpemUuaGVpZ2h0KTtcclxuICAgICAgICAvLyBjdHgucHV0SW1hZ2VEYXRhKGltYWdlLCAwLCAwKTtcclxuXHJcbiAgICAgICAgZnBzKys7XHJcbiAgICAgICAgY29uc3QgZW5kID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICAgICAgY29uc3QgZGlmZiA9IGVuZCAtIHN0YXJ0O1xyXG4gICAgICAgIGlmIChkaWZmID49IDEwMDApIHtcclxuICAgICAgICAgICAgc3RhcnQgPSBlbmQ7XHJcbiAgICAgICAgICAgIGxhc3RGcHMgPSBmcHM7XHJcbiAgICAgICAgICAgIGZwcyA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3b3JrZXIucG9zdE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICBzaXplOiByZW5kZXJTaXplLFxyXG4gICAgICAgICAgICB0ZXh0dXJlQnVmZmVyOiBmaW5hbFRleHR1cmUucGl4ZWxzLmJ1ZmZlclxyXG4gICAgICAgIH0sIFtmaW5hbFRleHR1cmUucGl4ZWxzLmJ1ZmZlcl0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgYXZhaWxhYmxlID0gZmFsc2U7XHJcbiAgICBjb25zdCB1cGRhdGVUaWNrID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChhdmFpbGFibGUpIHtcclxuICAgICAgICAgICAgYXZhaWxhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlVGljayk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHdvcmtlciA9IG5ldyBXb3JrZXIoXCIuL2Rpc3Qvd29ya2VyLmpzXCIpO1xyXG5cclxuICAgIHdvcmtlci5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCAoZSkgPT4ge1xyXG4gICAgICAgIGZpbmFsVGV4dHVyZS5waXhlbHMgPSBuZXcgVWludDhDbGFtcGVkQXJyYXkoZS5kYXRhLnRleHR1cmVCdWZmZXIpO1xyXG4gICAgICAgIGF2YWlsYWJsZSA9IHRydWU7XHJcbiAgICAgICAgLy9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcclxuICAgICAgICAvL3VwZGF0ZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgd29ya2VyLnBvc3RNZXNzYWdlKHtcclxuICAgICAgICBzaXplOiByZW5kZXJTaXplLFxyXG4gICAgICAgIHRleHR1cmVCdWZmZXJcclxuICAgIH0sIFt0ZXh0dXJlQnVmZmVyXSk7XHJcblxyXG4gICAgdXBkYXRlVGljaygpO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==