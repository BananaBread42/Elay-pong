let board;
let context;

// board size
let boardWidth = 500;
let boardHeight = 500;

// player paddle
let playerWidth = 10;
let playerHeight = 80;
let playerX = 10;
let playerY = boardHeight / 2 - playerHeight / 2;

// ball
let ballSize = 10;
let ballX = boardWidth / 2;
let ballY = boardHeight / 2;
let ballSpeedX = 3;
let ballSpeedY = 2;

// score
let score = 0;

window.onload = function () {
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    document.addEventListener("mousemove", movePlayer);

    requestAnimationFrame(update);
};

function update() {
    requestAnimationFrame(update);

    context.clearRect(0, 0, board.width, board.height);

    // draw paddle
    context.fillStyle = "white";
    context.fillRect(playerX, playerY, playerWidth, playerHeight);

    // move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // bounce top/bottom
    if (ballY <= 0 || ballY >= boardHeight - ballSize) {
        ballSpeedY *= -1;
    }

    // bounce RIGHT WALL ✅
    if (ballX >= boardWidth - ballSize) {
        ballSpeedX *= -1;
    }

    // paddle collision (left)
    if (
        ballX <= playerX + playerWidth &&
        ballY >= playerY &&
        ballY <= playerY + playerHeight
    ) {
        ballSpeedX *= -1;
        score++; // gain a point when you hit it
    }

    // miss = reset
    if (ballX <= 0) {
        score = 0;
        resetBall();
    }

    // draw ball
    context.fillRect(ballX, ballY, ballSize, ballSize);

    // draw score
    context.font = "20px Courier New";
    context.fillText("Score: " + score, 20, 30);
}

function movePlayer(e) {
    let rect = board.getBoundingClientRect();
    playerY = e.clientY - rect.top - playerHeight / 2;

    // keep inside board
    if (playerY < 0) playerY = 0;
    if (playerY > boardHeight - playerHeight) {
        playerY = boardHeight - playerHeight;
    }
}

function resetBall() {
    ballX = boardWidth / 2;
    ballY = boardHeight / 2;
    ballSpeedX = 3;
    ballSpeedY = 2 * (Math.random() > 0.5 ? 1 : -1);
}