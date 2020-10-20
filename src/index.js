let canvas = document.querySelector('#my-canvas')

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