let url = 'http://localhost:3000/grids'
let canvas = document.querySelector('#my-canvas')
var ctx = canvas.getContext("2d");
let platform = document.getElementById("platform")
let rightPressed = false
let leftPressed = false
let platformEventListenerAdded = false

function getGrids () {
    fetch(url)
    .then(res => res.json())
    .then(grids=> {
        gridRoute = grids[0].ball.grid_id
        fetch(`http://localhost:3000/grids/${gridRoute}`)
        .then(res => res.json())
        .then(grid => displayGrid(grid))
    })
}

getGrids()

function displayGrid(grid) {
   displayBlocks(grid)
   // displayBall(grid)
    displayPlatform(grid)
}

function displayBlocks(grid) {
    // console.log(grid.blocks)
    grid.blocks.forEach(block => {
        firstRow(block)
        secondRow(block)
        thirdRow(block)
        fourthRow(block)
        fifthRow(block)
        
        // let span = document.createElement('span')
        // span.className = `block-unit`
        // span.style.width = `${block.width}px`
        // span.style.height = `${block.height}px`
        // span.style.color = 'orange'
        // canvas.append(span)
        // // let test = document.createElement('div')
        // // var ctx = test.getContext("2d")
        // // ctx.fillRect(100, 100, 100, 100)
        // // ctx.fillStyle = "orange"
        // // ctx.className = "block-unit"
        // // canvas.append(ctx)
    })
    
}

function displayPlatform(grid){
    console.log(grid)
    ctx.beginPath()
    ctx.lineWidth = "4"
    ctx.strokeStyle = "pink"
    ctx.fillStyle = "pink"
    ctx.fillRect(grid.platform.x, grid.platform.y, grid.platform.width, grid.platform.height)
    ctx.stroke()
    if (platformEventListenerAdded == false) {
        addEventListenerToPlatform(grid)
    }
}

function addEventListenerToPlatform(grid){
    document.addEventListener("keydown", (e) => keyDownHandler(e, grid), false);
    document.addEventListener("keyup", keyUpHandler, false);
    platformEventListenerAdded = true
}

function keyDownHandler(e, grid) {
    if(e.key === "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key === "ArrowLeft") {
        leftPressed = true;
    }
    pressButtons(grid)
}

function keyUpHandler(e) {
    if(e.key === "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

function pressButtons(grid){
if(rightPressed) {
    console.log(grid.platform)
    grid.platform.x += grid.platform.speed + 10
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    displayPlatform(grid)
    displayBlocks(grid)
    console.log("going right")
    if (grid.platform.x + grid.platform.width > canvas.width){
        grid.platform.x = canvas.width - grid.platform.width
    }
}
else if(leftPressed) {
    console.log(grid.platform)
    grid.platform.x -= grid.platform.speed + 10
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    displayPlatform(grid)
    console.log("going left")
    if (grid.platform.x < 0){
        grid.platform.x = 0;
    }
} 
}

// function movePlatformLeft() {
//     let leftNumbers = platform.style.left.replace("px", "");
//     let left = parseInt(leftNumbers, 10);
//     if (left > 20) {
//       platform.style.left = `${left - 10}px`;
//     }
// }

// document.addEventListener("keydown", function(e) {
//     if (e.key === "ArrowLeft") {
//       movePlatformLeft();
//     }
// });

// function movePlatformRight() {
//     let rightNumbers = platform.style.left.replace("px", "");
//     let right = parseInt(rightNumbers, 10);
//     if (right < 880) {
//       platform.style.left = `${right + 10}px`;
//     }
// }
// document.addEventListener("keydown", function(e) {
//     if (e.key === "ArrowRight") {
//       movePlatformRight();
//     }
// })

// function displayBall(grid) {
//     // c.beginPath()
//     // c.arc(grid.ball.x, grid.ball.y, grid.ball.width/2, 0, Math.PI*2, false)
//     // c.fillStyle = "green"
//     // c.fill()
//     // c.closePath()
//     console.log(grid.ball)
//     ctx.beginPath()
//     ctx.strokeStyle = "#00ffa7";
//     ctx.arc(grid.ball.x, grid.ball.y, grid.ball.width/2, 0, Math.PI*2)
//     ctx.stroke();
//     if (grid.ball.x + grid.ball.width < 0 || grid.ball.x + grid.ball.width > canvas.width) {
//         dx = -dx
//     } else if (grid.ball.y + grid.ball.height < 0 || grid.ball.y + grid.ball.height > canvas.height) {
//         dy = -dy
//     }
// }

// function animate() {
//     requestAnimationFrame(animate)
//     ctx.clearRect(0, 0, grid.width, grid.height)
//     displayBall(grid)
//     x += grid.ball.speed
//     y += grid.ball.speed
// }


// Red rectangle
function firstRow(block) {
ctx.beginPath();
ctx.lineWidth = "4";
ctx.strokeStyle = "blue";
ctx.fillStyle = "blue";
ctx.fillRect(block.x, block.y, block.width, block.height);
ctx.stroke();
}

// Green rectangle
function secondRow(block) {
ctx.beginPath();
ctx.lineWidth = "4";
ctx.strokeStyle = "#00ffa7";
ctx.fillStyle = "#00ffa7";
ctx.fillRect(block.x, block.y + 60, block.width, block.height);
ctx.stroke();
}

// Blue rectangle
function thirdRow(block) {
ctx.beginPath();
ctx.lineWidth = "4";
ctx.strokeStyle = "limegreen";
ctx.fillStyle = "limegreen";
ctx.fillRect(block.x, block.y + 120, block.width, block.height);
ctx.stroke();
}

function fourthRow(block) {
    ctx.beginPath();
    ctx.lineWidth = "4";
    ctx.strokeStyle = "yellow";
    ctx.fillStyle = "yellow";
    ctx.fillRect(block.x, block.y + 180, block.width, block.height);
    ctx.stroke();
}

function fifthRow(block) {
    ctx.beginPath();
    ctx.lineWidth = "4";
    ctx.strokeStyle = "orange";
    ctx.fillStyle = "orange";
    ctx.fillRect(block.x, block.y + 240, block.width, block.height);
    ctx.stroke();
}

let x = canvas.width/2
let y = canvas.height-30
let ballRadius = 10
let dx = 1
let dy = -1
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
        console.log('ding')
    }
    if (y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
        console.log('dong')
    }
    x += dx;
    y += dy;
}
setInterval(draw, 1);