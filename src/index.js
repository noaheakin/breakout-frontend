let canvas = document.querySelector('#my-canvas')
var ctx = canvas.getContext("2d");
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
        testFunction(block)
        anotherTest(block)
        lastTest(block)
        
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

function movePlatformLeft() {
    let leftNumbers = platform.style.left.replace("px", "");
    let left = parseInt(leftNumbers, 10);
    if (left > 20) {
      platform.style.left = `${left - 10}px`;
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
    if (right < 990) {
      platform.style.left = `${right + 10}px`;
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

// var x = grid.ball.x
// var y = grid.ball.y

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, grid.width, grid.height)
    displayBall(grid)
    x += grid.ball.speed
    y += grid.ball.speed
}





// Red rectangle
function testFunction(block) {
ctx.beginPath();
ctx.lineWidth = "4";
ctx.strokeStyle = "blue";
ctx.rect(block.x, block.y, block.width, block.height);
ctx.stroke();
}

// Green rectangle
function anotherTest(block) {
ctx.beginPath();
ctx.lineWidth = "4";
ctx.strokeStyle = "green";
ctx.rect(block.x, block.y + 60, block.width, block.height);
ctx.stroke();
}

// Blue rectangle
function lastTest(block) {
ctx.beginPath();
ctx.lineWidth = "4";
ctx.strokeStyle = "orange";
ctx.rect(block.x, block.y + 120, block.width, block.height);
ctx.stroke();
}