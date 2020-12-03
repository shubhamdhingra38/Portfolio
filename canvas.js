let img
let imgWidth, imgHeight
imgWidth = 170
imgHeight = 220
function preload() {
    img = loadImage('static/static.jpeg');
}

//by Emily Xie
//modified by Shubham Dhingra

let myAlphabets = 'abcdefghijklmnopqrstuvwxyz'.split('');
myAlphabets.push(...['{', '}', '#', '_', '-', ':', '(', ')'])
console.log(myAlphabets)

let speedUpper, speedLower
speedUpper = 4
speedLower = 5


var streams = [];
var fadeInterval = 1.4;
var symbolSize = 15;

function setup() {
    let cnv = createCanvas(imgWidth, imgHeight)
    cnv.parent('photo')
    // Top-left corner of the img is at (0, 0)
    // Width and height are the img's original width and height
    var x = 0;
    for (var i = 0; i <= width / symbolSize; i++) {
        var stream = new Stream();
        stream.generateSymbols(x, random(-2000, 0));
        streams.push(stream);
        x += symbolSize
    }

    textFont('Consolas');
    textSize(symbolSize);
}


function draw() {
    fill(0, 255, 0, 250)
    rect(0, 0, imgWidth, imgHeight)
    image(img, 5, 5, imgWidth-10, imgHeight-10);

    frameRate(15)
    streams.forEach(function (stream) {
        stream.render();
    });
    // fill('rgba(0,0,0, 0.25)');

    rect(0, 0, 10, imgHeight)
    rect(0, 0, imgWidth, 10)
    rect(imgWidth-10, 0, 10, imgHeight)
    rect(0, imgHeight-10, imgWidth, 10)



}

function Symbol(x, y, speed, first, opacity) {
    this.x = x;
    this.y = y;
    this.value;

    this.speed = speed;
    this.first = first;
    this.opacity = opacity;

    this.switchInterval = round(random(2, 25));

    this.setToRandomSymbol = function () {
        var randomSymbol = myAlphabets[Math.floor(Math.random() * myAlphabets.length)]
        this.value = randomSymbol;
    }

    this.rain = function () {
        this.y = (this.y >= height) ? 0 : this.y += this.speed;
    }

}

function Stream() {
    this.symbols = [];
    this.totalSymbols = round(random(5, 20));
    this.speed = random(speedLower, speedUpper);

    this.generateSymbols = function (x, y) {
        var opacity = 255;
        var first = round(random(0, 4)) == 1;
        for (var i = 0; i <= this.totalSymbols; i++) {
            symbol = new Symbol(
                x,
                y,
                this.speed,
                first,
                opacity
            );
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            opacity -= (255 / this.totalSymbols) / fadeInterval;
            y -= symbolSize;
            first = false;
        }
    }

    this.render = function () {
        this.symbols.forEach(function (symbol) {
            if (symbol.first) {
                fill(140, 255, 170, 200);
            } else {
                fill(0, 255, 70, 100);
            }
            text(symbol.value, symbol.x, symbol.y);
            symbol.rain();
            symbol.setToRandomSymbol();
        });
    }
}
