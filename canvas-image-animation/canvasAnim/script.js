// Global variables
var tl;
var firstAnim = true;

// Standart ad variables 
var adWidth = 500;
var adHeight = 331;

// Image object

var imgArray = [
    bg1 = {
        src: "../img/zapad_nad_svetem.jpg",
        width: adWidth,
        height: adHeight,
        backgroundPositionX: 0,
        backgroundPositionY: 0,
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        origin: "left top",
        compW: null,
        compH: null,
        smooth: "medium"
    },    
    bg2 = {
        src: "../img/potok_min.jpg",
        width: adWidth, height: adHeight
    }
]

function startAd() {

    ca.loadImages({
        imgArr: new ca.imgData(imgArray),
        canvasLoad: ca.setCanvas("myCanvas", adWidth, adHeight),
        get presets() {
            return [
                [ca.drawArray, this.imgArr]
            ]
        }
    }, function () {
        console.log("callback ");
        ca.drawCanvas();
        animation();
    });
    

    // Ad user controls (click to start animation)
    document.getElementById("wrapper").addEventListener("click", function(){

         firstAnim ? animation() : tl.restart();
     });

    //    drawCanvas();
}

// ANIMATION

function animation() {
    tl = new TimelineMax({onComplete: restart});

    tl.to(bg2, 2, {width: 100, onUpdate: ca.drawCanvas}, 0);
    tl.to(bg2, 6, {x: 300, width: 200, backgroundPositionX: 300 * bg2.compW,  onUpdate: ca.drawCanvas}, 2.5);
    tl.to(bg2, 1, {opacity: 0, onUpdate: ca.drawCanvas}, 10);
    
    tl.to(bg1, 2, {scale: .5, x: 120, y: 100, onUpdate: ca.drawCanvas}, 12);
    tl.to(bg1, 2, {scale: 1, x: 0, y: 0, onUpdate: ca.drawCanvas}, 14);

    tl.to(bg2, 1, {opacity: 1, onUpdate: ca.drawCanvas}, 18);
    tl.to(bg2, 3, {x: 0, width: 500, backgroundPositionX: 0, onUpdate: ca.drawCanvas}, 19);
    tl.to(bg2, 2, {scale: .5, onUpdate: ca.drawCanvas}, 23);
    tl.to(bg2, 2, {x: -125, y: -83, onUpdate: ca.drawCanvas}, 25);
    tl.set(bg2, {origin: "left top", x: 0, y: 0},28);
    tl.to(bg2, 2, {scale: 1, onUpdate: ca.drawCanvas}, 28);
}

function restart() {
    firstAnim = false;
}