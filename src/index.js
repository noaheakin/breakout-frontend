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
    console.log(grid)
    debugger
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