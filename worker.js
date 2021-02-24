// const update = () => { 
//     self.postMessage("message");
//     setTimeout(update, 1);
//     //requestAnimationFrame(update);
// };

// update();

self.addEventListener("message", (e) => {
    var buffer = e.data;
    var length = buffer.byteLength / 4;
    var intArray = new Int32Array(buffer, 0, length);
    for (let i = 0; i < length; i++) {
        intArray[i] = intArray[i] + 1;
    }
    self.postMessage(e.data, [e.data]);
});

// while(true) {
//     self.postMessage("message");
// }

