let canvas = document.querySelector('#my-canvas')
var c = canvas.getContext("2d");
let platform = document.getElementById("platform")

function getGrid () {
    fetch(`http://localhost:3000/grids/1`)
    .then(res => res.json())
    .then(grid => displayGrid(grid))
}

getGrid()

function displayGrid(grid) {
    displayBlocks(grid)
}

function displayBlocks(grid) {
    console.log(grid.blocks)
    grid.blocks.forEach(block => {
        
        let span = document.createElement('span')
        span.className = `block-unit`
        span.style.width = `${block.width}px`
        span.style.height = `${block.height}px`
        span.style.color = 'orange'
        canvas.append(span)
        // let test = document.createElement('div')
        // var ctx = test.getContext("2d")
        // ctx.fillRect(100, 100, 100, 100)
        // ctx.fillStyle = "orange"
        // ctx.className = "block-unit"
        // canvas.append(ctx)
    })
    
}

function movePlatformLeft() {
    let leftNumbers = platform.style.left.replace("px", "");
    let left = parseInt(leftNumbers, 10);
    if (left > 0) {
      platform.style.left = `${left - 1}px`;
    }
}

document.addEventListener("keydown", function(e) {
    if (e.key === "ArrowLeft") {
      movePlatformLeft();
    }
});

function movePlatformRight() {
    let rightNumbers = platform.style.left.replace("px", "");
    let right = parseInt(rightNumbers, 10);
    if (right < 900) {
      platform.style.left = `${right + 1}px`;
    }
}
document.addEventListener("keydown", function(e) {
    if (e.key === "ArrowRight") {
      movePlatformRight();
    }
})

function displayBall(grid) {
    c.beginPath()
    c.arc(grid.ball.x, grid.ball.y, grid.ball.width/2, 0, Math.PI*2, false)
    c.fillStyle = "green"
    c.fill()
    c.closePath()
}

var x = grid.ball.x
var y = grid.ball.y

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, grid.width, grid.height)
    displayBall(grid)
    x += grid.ball.speed
    y += grid.ball.speed
}

//// creating grid for box
//grid width and height
var bw = 900;
var bh = 800;
//padding around grid
var p = 10;
//size of canvas
let cw = bw + (p*2) + 1;
let ch = bh + (p*2) + 1;

let theCanvas = $('<canvas/>').css({width: cw, height: ch}).appendTo('body');

let context = theCanvas.get(0).getContext("2d");

function drawBoard(){
    for (let x = 0; x <= bw; x += 40) {
        context.moveTo(0.5 + x + p, p);
        context.lineTo(0.5 + x + p, bh + p);
    }


    for (let x = 0; x <= bh; x += 40) {
        context.moveTo(p, 0.5 + x + p);
        context.lineTo(bw + p, 0.5 + x + p);
    }

    context.strokeStyle = "black";
    context.stroke();
}

drawBoard();