
// Canvas images declaration.
// Modul global variables

var ca = (function(){

var ctx, presets;

function loadImages(set, callback) {
    if(!set) set = {};

    var counter = 0;

   if(set.presets) presets = set.presets;

    for (var i=0; i<set.imgArr.length; i++) {
        set.imgArr[i].img = new Image();
        set.imgArr[i].img.src = set.imgArr[i].src;

        if(!set.imgArr[i].width) set.imgArr[i].width = set.imgArr[i].img.width;
        if(!set.imgArr[i].height) set.imgArr[i].height = set.imgArr[i].img.height;

        set.imgArr[i].img.onload = function() {
            
            counter ++;

            if(counter === set.imgArr.length) {
                console.log("Images are loaded");
                setComps(set.imgArr);
                callback();
            }
        }
    }
}

function setComps(iArr) {
    for(var i=0; i<iArr.length; i++) {
        iArr[i].compW = iArr[i].img.width / iArr[i].width;
        iArr[i].compH = iArr[i].img.height / iArr[i].height;
    }
}

function setCanvas(canvas, w, h, parent) {
    var c;

    if(!document.querySelector('#' + canvas)) {
        console.error('Error! Canvas element not set.\n');
    }

    if(parent) {
        c = document.createElement('canvas');
        c.setAttribute("id", canvas);
        document.getElementById(parent).appendChild(c);
    } else {
        c = document.getElementById(canvas);
    }

    ctx = c.getContext("2d");
    c.width = w || adWidth;
    c.height = h || adHeight;
}

function imgData(arr) {
    this.arr = arr;
    
    for(var i=0; i< this.arr.length; i++) {
        if(!this.arr[i].backgroundPositionX) this.arr[i].backgroundPositionX = 0;
        if(!this.arr[i].backgroundPositionY) this.arr[i].backgroundPositionY = 0;
        if(!this.arr[i].x) this.arr[i].x = 0;
        if(!this.arr[i].y) this.arr[i].y = 0;
        if(!this.arr[i].opacity) this.arr[i].opacity = 1;
        if(!this.arr[i].scale) this.arr[i].scale = 1;
        if(!this.arr[i].origin) this.arr[i].origin = "top left";
        if(!this.arr[i].compW) this.arr[i].compW = null;
        if(!this.arr[i].compH) this.arr[i].compH = null;
        if(!this.arr[i].smooth) this.arr[i].smooth = "medium";
        if(!this.arr[i].isSmooth) this.arr[i].isSmooth = setSmoothVars(this.arr[i]);
    }

    return this.arr;
}

function setSmoothVars(arr) {
    var isSmooth;

    arr.smooth === "none" ? isSmooth = false : isSmooth = true;
    
    if(arr.smooth !== "low" && arr.smooth !== "medium" && arr.smooth !== "high") {
        console.error("ERROR! The smooth properity has wrong value.")
    } else {
        return isSmooth;
    }

}

function drawCanvas() {
    for(var i=0; i<presets.length; i++) {
        presets[i][0](presets[i][1]);
    }
}

function drawArray(imgs) {

    ctx.clearRect(0,0,adWidth, adHeight); // In first clear canvas for drawing a frame.

    for (var i=0; i<imgs.length; i++) {
        ctx.globalAlpha = Math.round(imgs[i].opacity * 100) / 100; // Set global alpha for 1st image.

        ctx.imageSmoothingQuality = imgs[i].smooth;
        ctx.imageSmoothingEnabled = imgs[i].isSmooth;
        ctx.msImageSmoothingEnabled = imgs[i].isSmooth;


        ctx.drawImage(imgs[i].img, // image
            imgs[i].backgroundPositionX, imgs[i].backgroundPositionY, // background position
           imgs[i].img.width - (imgs[i].img.width -(imgs[i].width * imgs[i].compW)), imgs[i].img.height - (imgs[i].img.height -(imgs[i].height * imgs[i].compH)), // dimensions of "original" (it mean croped) image. Usualy the same as th last line of settings.
            scaleOrigin(imgs[i]).x, scaleOrigin(imgs[i]).y,
            imgs[i].width * imgs[i].scale, imgs[i].height * imgs[i].scale
        );
    }
}

function scaleOrigin(elm) {
    let _x, _y;

    if(elm.scale === 1) {
        _x = elm.x; _y = elm.y;
    } else {
        let type = elm.origin.split(" ");

        switch (type[0]) {
            case "left":
            _x = elm.x;
            break;
            case "center":
            _x = (adWidth - (elm.width * elm.scale)) / 2 + elm.x;
            break;
            case "right":
            _x = (adWidth - (elm.width * elm.scale)) + elm.x
            break;
        }

        switch (type[1]) {
            case "top":
            _y = elm.y;
            break;
            case "center":
            _y = (adHeight - (elm.height * elm.scale)) / 2 + elm.y;
            break;
            case "bottom":
            _y = (adHeight - (elm.height * elm.scale)) / 2 + elm.y; 
        }
    }

    newSpecialFunction();
    return { x: _x, y: _y }
}

return {
    loadImages: loadImages, imgData: imgData, setCanvas: setCanvas, drawCanvas: drawCanvas, drawArray: drawArray
}

function newSpecialFunction() {
    return console.log("Hello World")
}
    
})();