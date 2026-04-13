let board;
let context;

// board size
let boardWidth = 500;
let boardHeight = 500;

// left paddle (Player 1)
let playerWidth = 10;
let playerHeight = 80;
let player1X = 10;
let player1Y = boardHeight / 2 - playerHeight / 2;

// right paddle (Player 2)
let player2X = boardWidth - 20;
let player2Y = boardHeight / 2 - playerHeight / 2;

// ball
let ballSize = 10;
let ballX = boardWidth / 2;
let ballY = boardHeight / 2;
let ballSpeedX = 3;
let ballSpeedY = 2;

// score
let player1Score = 0;
let player2Score = 0;

window.onload = function () {
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    document.addEventListener("keydown", movePaddles);

    requestAnimationFrame(update);
};

function update() {
    requestAnimationFrame(update);

    context.clearRect(0, 0, board.width, board.height);

    // draw paddles
    context.fillStyle = "white";
    context.fillRect(player1X, player1Y, playerWidth, playerHeight);
    context.fillRect(player2X, player2Y, playerWidth, playerHeight);

    // move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // bounce top/bottom
    if (ballY <= 0 || ballY >= boardHeight - ballSize) {
        ballSpeedY *= -1;
    }

    // paddle collision (left)
    if (
        ballX <= player1X + playerWidth &&
        ballY >= player1Y &&
        ballY <= player1Y + playerHeight
    ) {
        ballSpeedX *= -1;
    }

    // paddle collision (right)
    if (
        ballX + ballSize >= player2X &&
        ballY >= player2Y &&
        ballY <= player2Y + playerHeight
    ) {
        ballSpeedX *= -1;
    }

    // scoring
    if (ballX <= 0) {
        player2Score++;
        resetBall();
    }

    if (ballX >= boardWidth) {
        player1Score++;
        resetBall();
    }

    // draw ball
    context.fillRect(ballX, ballY, ballSize, ballSize);

    // draw score
    context.font = "20px Courier New";
    context.fillText(player1Score, boardWidth / 4, 30);
    context.fillText(player2Score, (3 * boardWidth) / 4, 30);
}

function movePaddles(e) {
    // Player 1 (W/S)
    if (e.code === "KeyW" && player1Y > 0) {
        player1Y -= 20;
    }
    if (e.code === "KeyS" && player1Y < boardHeight - playerHeight) {
        player1Y += 20;
    }

    // Player 2 (Arrow keys)
    if (e.code === "ArrowUp" && player2Y > 0) {
        player2Y -= 20;
    }
    if (e.code === "ArrowDown" && player2Y < boardHeight - playerHeight) {
        player2Y += 20;
    }
}

function resetBall() {
    ballX = boardWidth / 2;
    ballY = boardHeight / 2;
    ballSpeedX *= -1;
    ballSpeedY = 2 * (Math.random() > 0.5 ? 1 : -1);
}