window.onbeforeunload = function() {
    window.scrollTo(0, 0);
}



const userUrl = 'http://localhost:3000/users'
let main = document.querySelector('main')
let body = document.querySelector('#div_form')
let form = document.querySelector('#form_id')
let currentUserId
let interval
let gameButton = document.createElement('button')
gameButton.innerText = 'New Game'
gameButton.className = 'start-btn'
let startDiv = document.querySelector('#start-game')
let scoresContainer = document.querySelector('#scores-container')
let winningSound = new Audio('src/sounds/win.wav')
winningSound.volume = 0.7

form.addEventListener('submit', (e) => {
    e.preventDefault()
    checkUser(e)
})

function playMusic() {
    let song = new Audio('src/sounds/test.wav');
    song.loop = true;
    song.volume = 0.25
    song.play()
}

function blockSound () {
    let selector = Math.floor(Math.random() * Math.floor(13));
    let sound1 = new Audio('src/sounds/block1.wav')
    sound1.volume = 0.7
    let sound2 = new Audio('src/sounds/block2.wav')
    sound2.volume = 0.7
    let sound3 = new Audio('src/sounds/block3.wav')
    sound3.volume = 0.7
    let sound4 = new Audio('src/sounds/block4.wav')
    sound4.volume = 0.7
    let sound5 = new Audio('src/sounds/block5.wav')
    sound5.volume = 0.7
    let sound6 = new Audio('src/sounds/block6.wav')
    sound6.volume = 0.7
    let sound7 = new Audio('src/sounds/block7.wav')
    sound7.volume = 0.7
    let sound8 = new Audio('src/sounds/block8.wav')
    sound8.volume = 0.7
    let sound9 = new Audio('src/sounds/block9.wav')
    sound9.volume = 0.7
    let sound10 = new Audio('src/sounds/block10.wav')
    sound10.volume = 0.7
    let sound11 = new Audio('src/sounds/block11.wav')
    sound11.volume = 0.7
    let sound12 = new Audio('src/sounds/block12.wav')
    sound10.volume = 0.7
    let sound13 = new Audio('src/sounds/block13.wav')
    sound11.volume = 0.7
    if (selector == 0) {
        sound1.play()
    } else if (selector == 1) {
        sound2.play()
    } else if (selector == 2) {
        sound3.play()
    } else if (selector == 3) {
        sound4.play()
    } else if (selector == 4) {
        sound5.play()
    } else if (selector == 5) {
        sound6.play()
    } else if (selector == 6) {
        sound7.play()
    } else if (selector == 7) {
        sound8.play()
    } else if (selector == 8) {
        sound9.play()
    } else if (selector == 9) {
        sound10.play()
    } else if (selector == 10) {
        sound11.play()
    } else if (selector == 11) {
        sound12.play()
    } else if (selector == 12) {
        sound13.play()
    }
}

function checkUser(e) {
    let u = 0
    fetch(userUrl)
        .then(res => res.json())
        .then(users => users.forEach(user => {
            if (user.username == e.target[0].value) {
                u++
                currentUserId = user.id
                displayUser(user)
            } else {
                console.log("not this one")
            }
        }))
        .finally(() => {
            if (u == 0) {
                handleSubmit(e)
            }
        })
}



// handle submit
function handleSubmit(e) {
    e.preventDefault()
        // let user = {
        //     username: e.target[0].value
        // }
    fetch(userUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: e.target[0].value
            })
        })
        .then(res => res.json())
        .then(newUser => {
            currentUserId = newUser.id
            displayUser(newUser)
        })
}

function displayUser(newUser) {
    let h3 = document.querySelector('#user-info')
    h3.innerHTML = `Hello, ${newUser.username}!   `
    getUserScores()
    let deleteBtn = document.createElement("button")
    h3.append(deleteBtn)
    startDiv.append(gameButton)
    deleteBtn.innerHTML = "Delete User"
    deleteBtn.addEventListener('click', () => {
        fetch(`http://localhost:3000/users/${currentUserId}`, {
                method: 'DELETE'
            })
            .then(h3.innerHTML = "")
    })
}

function buildForm() {
    main.innerhtml = ''
    let label = document.createElement('label')
    label.textContent = "User Login:     "
    label.style = "font-size: 20px; font-weight: bold"
    let input = document.createElement('input')
    let loginBtn = document.createElement('button')
    loginBtn.innerText = 'Login'
    form.append(label, input, loginBtn)
}
buildForm()

// Get user scores
function postUserScore() {
    fetch('http://localhost:3000/scores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            score: currentScore,
            user_id: currentUserId
        })
    })
}

function getUserScores() {
    fetch(`http://localhost:3000/users/${currentUserId}`)
        .then(res => res.json())
        .then(user => {
            let tempScores = user.scores
            if (tempScores.length > 0) {
                let sortScores = tempScores.sort(compare)
                let topScores = sortScores.slice(0, 3)
                userTopScores(topScores)
            }
        })
}

function compare(a, b) {
    if (a.score > b.score) {
        return -1;
    }
    if (a.score < b.score) {
        return 1;
    }
    return 0;
}

function userTopScores(topScores) {
    let ol = document.querySelector('#user-scores')
    let h4 = document.createElement('h4')
    if (topScores.length > 0) {
        h4.innerText = "Your Top Scores"
        h4.style = "text-decoration: underline;"
        scoresContainer.prepend(h4)
        topScores.forEach(element => {
            let li = document.createElement("li")
            li.className = 'score-li'
            li.innerHTML = `*** ${element.score} ***       `
            let deleteScoreBtn = document.createElement("button")
            li.append(deleteScoreBtn)
            deleteScoreBtn.innerHTML = "X"
            deleteScoreBtn.addEventListener('click', () => deleteScores(element, ol, h4))
            ol.append(li)
        })
    } else {
        h4.innerText = "No User Scores"
        scoresContainer.prepend(h4)
    }
}

function deleteScores(element, ol, h4){
    debugger
    fetch(`http://localhost:3000/scores/${element.id}`, {
        method: 'DELETE'
    })
    .then(() => {
        h4.innerHTML = ""
        ol.innerHTML = ""
        getUserScores()
    }) 
}

///////////////////////// THE FRONTEND ANIMATION STUFFFFFFFFF

let url = 'http://localhost:3000/grids'
let canvas = document.querySelector('#my-canvas')
let ctx = canvas.getContext("2d")
let rightPressed = false
let leftPressed = false
    // let platform = document.getElementById("platform")
let currentScore = 0
let lives = 3
    // let gameButton = document.querySelector('#start-game')

// THIS RUNS THE PROGRAM!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// let interval
// function loggedIn(){
//     if (currentUserId === undefined) {
//         console.log('not signed in')
//     } else {
//         console.log('logged in')
//         interval = setInterval(draw, 1)
//     }
// }

gameButton.addEventListener('click', () => {
    if (currentUserId === undefined) {
        alert("sign in to play")
    } else {
        playMusic()
        interval = setInterval(draw, 1)
    }
})

function showScoreLives() {
    let h2 = document.querySelector('#show-score-lives')
    h2.innerHTML = `SCORE: ${currentScore} LIVES: ${lives}`
}

let platform = { x: (canvas.width - 200) / 2, y: canvas.height - 40, width: 140, height: 10, speed: 2 }

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
    if (e.key == "ArrowRight") {
        rightPressed = true
    } else if (e.key == "ArrowLeft") {
        leftPressed = true
    }
}

function keyUpHandler(e) {
    if (e.key == "ArrowRight") {
        rightPressed = false
    } else if (e.key == "ArrowLeft") {
        leftPressed = false
    }
}

// ball variables
let ball = { x: canvas.width / 2, y: canvas.height - 50, radius: 10, dx: 1, dy: 1, speed: 1 }

// ball creation
function drawBall() {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
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
let blockCounter = blockRowCount * blockColumnCount

// array of blocks created for each 
let blocks = [];
for (let c = 0; c < blockColumnCount; c++) {
    blocks[c] = [];
    for (let r = 0; r < blockRowCount; r++) {
        blocks[c][r] = { x: 0, y: 0, show: 1 }
    }
}


// draw blocks in rows [r] and columns [c]
function drawBlocks() {
    for (let c = 0; c < blockColumnCount; c++) {
        for (let r = 0; r < blockRowCount; r++) {
            if (blocks[c][r].show == 1) {
                let blockX = (c * (blockWidth + blockPadding)) + blockOffsetLeft
                let blockY = (r * (blockHeight + blockPadding)) + blockOffsetTop
                blocks[c][r].x = blockX
                blocks[c][r].y = blockY
                ctx.beginPath()
                ctx.rect(blockX, blockY, blockWidth, blockHeight)
                let red = Math.floor(Math.random() * (256 - 50) + 50);
                let green = Math.floor(Math.random() * (256 - 50) + 50);
                let blue = Math.floor(Math.random() * (256 - 50) + 50);
                ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + " )"
                ctx.fill()
                ctx.closePath()
            }
        }
    }
}

// ball collision with blocks
function collision() {
    for (let c = 0; c < blockColumnCount; c++) {
        for (let r = 0; r < blockRowCount; r++) {
            if (blocks[c][r].show == 1) {
                if (ball.x > blocks[c][r].x && ball.x < blocks[c][r].x + blockWidth && ball.y > blocks[c][r].y && ball.y < blocks[c][r].y + blockHeight) {
                    ball.dy = -ball.dy;
                    blocks[c][r].show = 0;
                    currentScore += 10
                    blockCounter--
                    blockSound()
                    console.log(`currentScore = ${currentScore}, ${blockCounter} blocks left`)
                }
            }
        }
    }
}

// ball collision with platform
function collisionPlatform() {
    if (ball.x < platform.x + platform.width && ball.x > platform.x && platform.y < platform.y + platform.height && ball.y > platform.y) {
        platformSound ()
        let collidePoint = ball.x - (platform.x + platform.width / 2)
        collidePoint = collidePoint / (platform.width / 2)
        let angle = collidePoint * Math.PI / 3
        ball.speed *= 1.04
        ball.dx = Math.sin(angle) * ball.speed
        ball.dy = -Math.cos(angle) * ball.speed
    }
}

function platformSound () {
    let selector = Math.floor(Math.random() * Math.floor(5));
    let platform1 = new Audio('src/sounds/platform1.wav')
    platform1.volume = 0.25
    let platform2 = new Audio('src/sounds/platform2.wav')
    platform2.volume = 0.25
    let platform3 = new Audio('src/sounds/platform3.wav')
    platform3.volume = 0.25
    let platform4 = new Audio('src/sounds/platform4.wav')
    platform4.volume = 0.25
    let platform5 = new Audio('src/sounds/platform5.wav')
    platform5.volume = 0.25
    if (selector == 0) {
        platform1.play()
    } else if (selector == 1) {
        platform2.play()
    } else if (selector == 2) {
        platform3.play()
    } else if (selector == 3) {
        platform4.play()
    } else if (selector == 4) {
        platform5.play()
    }
}

// resets the ball after losing life
function resetBall() {
    ball.x = canvas.width / 2
    ball.y = canvas.height - 50
    ball.dx = 1
    ball.dy = 1
    ball.speed = 1
}

// resets the platform after losing life
function resetPlatform() {
    platform.x = (canvas.width - 200) / 2
}

function finalResult() {
    if (lives == 0) {
        postUserScore()
        alert(`You have lost. final score = ${currentScore}`)
            // reloads page and starts game again after alert button pressed. potentially change to canvas
        document.location.reload()
        clearInterval(interval)
    } else if (blockCounter == 0) {
        winningSound.play()
        postUserScore()
        alert(`You Won! lives = ${lives}, score = ${currentScore}`)
            // reloads page and starts game again after alert button pressed
        document.location.reload()
        clearInterval(interval)
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
    showScoreLives()
    finalResult()
        // ball containment
    if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx
    }
    if (ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy
    }
    if (ball.y + ball.dy > canvas.height - ball.radius) {
        lives--
        currentScore -= 50
        console.log(`lives = ${lives} score = ${currentScore}`)
        resetBall()
        resetPlatform()
    }

    // platform movement
    if (rightPressed && platform.x < canvas.width - platform.width) {
        platform.x += platform.speed
    } else if (leftPressed && platform.x > 0) {
        platform.x -= platform.speed
    }

    ball.x += ball.dx
    ball.y += ball.dy
}