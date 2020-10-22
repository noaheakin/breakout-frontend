// let url = 'http://localhost:3000/grids'
let canvas = document.querySelector('#my-canvas')
let ctx = canvas.getContext("2d")
let rightPressed = false
let leftPressed = false
// let platform = document.getElementById("platform")

// THIS RUNS THE PROGRAM!!!!!!!!!!!!!!!!!!!!!!!!!!!!
setInterval(draw, 1)

let platform = {x: (canvas.width - 200)/2, y: canvas.height - 40, width: 200, height: 10, speed: 8}
// const platformHeight = 10
// const platformWidth = 200
// let platformX = (canvas.width-platformWidth)/2
// let platformY = canvas.height-platformHeight - 30

function drawPlatform() {
    ctx.beginPath()
    ctx.rect(platform.x, platform.y, platform.width, platform.height)
    ctx.fillStyle = "pink"
    ctx.fill()
    ctx.closePath()
}

document.addEventListener("keydown", keyDownHandler, false)
document.addEventListener("keyup", keyUpHandler, false)


function keyDownHandler(e) {
    if(e.key == "ArrowRight") {
        rightPressed = true
    }
    else if(e.key == "ArrowLeft") {
        leftPressed = true
    }
}

function keyUpHandler(e) {
    if(e.key == "ArrowRight") {
        rightPressed = false
    }
    else if(e.key == "ArrowLeft") {
        leftPressed = false
    }
}

// ball variables
let ball = {x: canvas.width/2, y: canvas.height-50, radius: 10, dx: 1, dy: 1}

// ball creation
function drawBall() {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2)
    ctx.fillStyle = "blue"
    ctx.fill()
    ctx.closePath()
}

// block constant variables
const blockRowCount = 4
const blockColumnCount = 10
const blockWidth = 90
const blockHeight = 50
const blockPadding = 10
const blockOffsetTop = 10
const blockOffsetLeft = 10

// array of blocks created for each 
let blocks = [];
for(let c = 0; c < blockColumnCount; c++) {
    blocks[c] = [];
    for(let r = 0; r < blockRowCount; r++) {
        blocks[c][r] = { x: 0, y: 0, show: 1}
    }
}

// draw blocks in rows [r] and columns [c]
function drawBlocks() {
    for(let c = 0; c < blockColumnCount; c++) {
        for(let r = 0; r < blockRowCount; r++) {
            if (blocks[c][r].show == 1) {
                let blockX = (c * (blockWidth + blockPadding)) + blockOffsetLeft
                let blockY = (r * (blockHeight + blockPadding)) + blockOffsetTop
                blocks[c][r].x = blockX
                blocks[c][r].y = blockY
                ctx.beginPath()
                ctx.rect(blockX, blockY, blockWidth, blockHeight)
                ctx.fillStyle = "green"
                ctx.fill()
                ctx.closePath()
            }
        }
    }
}

function collision() {
    for (let c = 0; c < blockColumnCount; c++) {
        for (let r = 0; r < blockRowCount; r++) {
            if (blocks[c][r].show == 1) {
                if (ball.x > blocks[c][r].x && ball.x < blocks[c][r].x + blockWidth && ball.y > blocks[c][r].y && ball.y < blocks[c][r].y + blockHeight) {
                    ball.dy = -ball.dy;
                    blocks[c][r].show = 0;
                }
            }
        }
    }
}

function collisionPlatform(){
    if(ball.x < platform.x + platform.width && ball.x > platform.x && platform.y < platform.y + platform.height && ball.y > platform.y){
        // grabs where the ball hits the platform
        let collidePoint = ball.x - (platform.x + platform.width/2);
        // normalizes the collide point
        collidePoint = collidePoint / (platform.width/2);
        // calculates the angle of the ball that it comes into contact with the platform
        let angle = collidePoint * Math.PI/3;
        // dx and dy change to the hypotenuse of the angle
        ball.dx = Math.sin(angle);
        ball.dy = -Math.cos(angle);
    }
}


// draws ball and barrier
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBlocks()
    drawPlatform()
    drawBall()
    collision()
    collisionPlatform()
    // ball containment
    if (ball.x + ball.dx > canvas.width-ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx
        console.log('ding')
    }
    if (ball.y + ball.dy > canvas.height-ball.radius || ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy
        console.log('dong')
    } 
    // platform movement
    if (rightPressed && platform.x < canvas.width - platform.width) {
        platform.x += platform.speed
    }
    else if (leftPressed && platform.x > 0) {
        platform.x -= platform.speed
    }

    ball.x += ball.dx
    ball.y += ball.dy
}



//runs draw every milisecond to mimic movement
//let interval = setInterval(draw, 1);



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// let rightPressed = false
// let leftPressed = false
// let platformEventListenerAdded = false

// function getGrids () {
//     fetch(url)
//     .then(res => res.json())
//     .then(grids=> {
//         gridRoute = grids[0].ball.grid_id
//         fetch(`http://localhost:3000/grids/${gridRoute}`)
//         .then(res => res.json())
//         .then(grid => displayGrid(grid))
//     })
// }
    

// getGrids()

// function displayGrid(grid) {
//    displayBlocks(grid)
//    // displayBall(grid)
//     displayPlatform(grid)
//     if(collision(ball, grid.platform)){
//         dy = -dy
//     }
// }

// function displayBlocks(grid) {
//     console.log(grid.blocks)
//     grid.blocks.forEach(block => {
//         firstRow(block)
//         secondRow(block)
//         thirdRow(block)
//         fourthRow(block)
//         fifthRow(block)
        
//         // let span = document.createElement('span')
//         // span.className = `block-unit`
//         // span.style.width = `${block.width}px`
//         // span.style.height = `${block.height}px`
//         // span.style.color = 'orange'
//         // canvas.append(span)
//         // // let test = document.createElement('div')
//         // // var ctx = test.getContext("2d")
//         // // ctx.fillRect(100, 100, 100, 100)
//         // // ctx.fillStyle = "orange"
//         // // ctx.className = "block-unit"
//         // // canvas.append(ctx)
//     })
    
// }

// function displayPlatform(grid){
//     console.log(grid)
//     ctx.beginPath()
//     ctx.lineWidth = "4"
//     ctx.strokeStyle = "pink"
//     ctx.fillStyle = "pink"
//     ctx.fillRect(grid.platform.x, grid.platform.y, grid.platform.width+200, grid.platform.height)
//     ctx.stroke()
//     if (platformEventListenerAdded == false) {
//         addEventListenerToPlatform(grid)
//     }
// }

// function addEventListenerToPlatform(grid){
//     document.addEventListener("keydown", (e) => keyDownHandler(e, grid), false);
//     document.addEventListener("keyup", keyUpHandler, false);
//     platformEventListenerAdded = true
// }

// function keyDownHandler(e, grid) {
//     if(e.key === "ArrowRight") {
//         rightPressed = true;
//     }
//     else if(e.key === "ArrowLeft") {
//         leftPressed = true;
//     }
//     pressButtons(grid)
// }

// function keyUpHandler(e) {
//     if(e.key === "ArrowRight") {
//         rightPressed = false;
//     }
//     else if(e.key === "ArrowLeft") {
//         leftPressed = false;
//     }
// }

// function pressButtons(grid){
// if(rightPressed) {
//     console.log(grid.platform)
//     grid.platform.x += grid.platform.speed + 10
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     displayPlatform(grid)
//     displayBlocks(grid)
//     console.log("going right")
//     if (grid.platform.x + grid.platform.width > canvas.width){
//         grid.platform.x = canvas.width - grid.platform.width
//     }
// }
// else if(leftPressed) {
//     console.log(grid.platform)
//     grid.platform.x -= grid.platform.speed + 10
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     displayPlatform(grid)
//     displayBlocks(grid)
//     console.log("going left")
//     if (grid.platform.x < 0){
//         grid.platform.x = 0;
//     }
// } 
// }



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


// // Red rectangle
// function firstRow(block) {
// ctx.beginPath();
// ctx.lineWidth = "4";
// ctx.strokeStyle = "blue";
// ctx.fillStyle = "blue";
// ctx.fillRect(block.x, block.y, block.width, block.height);
// ctx.stroke();
// }

// // Green rectangle
// function secondRow(block) {
// ctx.beginPath();
// ctx.lineWidth = "4";
// ctx.strokeStyle = "#00ffa7";
// ctx.fillStyle = "#00ffa7";
// ctx.fillRect(block.x, block.y + 60, block.width, block.height);
// ctx.stroke();
// }

// // Blue rectangle
// function thirdRow(block) {
// ctx.beginPath();
// ctx.lineWidth = "4";
// ctx.strokeStyle = "limegreen";
// ctx.fillStyle = "limegreen";
// ctx.fillRect(block.x, block.y + 120, block.width, block.height);
// ctx.stroke();
// }

// function fourthRow(block) {
//     ctx.beginPath();
//     ctx.lineWidth = "4";
//     ctx.strokeStyle = "yellow";
//     ctx.fillStyle = "yellow";
//     ctx.fillRect(block.x, block.y + 180, block.width, block.height);
//     ctx.stroke();
// }

// function fifthRow(block) {
//     ctx.beginPath();
//     ctx.lineWidth = "4";
//     ctx.strokeStyle = "orange";
//     ctx.fillStyle = "orange";
//     ctx.fillRect(block.x, block.y + 240, block.width, block.height);
//     ctx.stroke();
// }


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

// let collision = function(obj1, obj2){
//     if (obj1.x +obj1.w > obj2.x && obj1.x < obj2.x + obj2.w && obj2.y + obj2.h > obj1.y && obj2.y < obj1.y + obj1.h) {
//         console.log(collision)
//         return true
//     } else {
//         return false
//     }
// }