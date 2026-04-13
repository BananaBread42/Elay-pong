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

// computer paddle
let aiWidth = 10;
let aiHeight = 80;
let aiX = boardWidth - aiWidth - 10;
let aiY = boardHeight / 2 - aiHeight / 2;

// ball
let ballSize = 10;
let ballX = boardWidth / 2;
let ballY = boardHeight / 2;
let ballSpeedX = 3;
let ballSpeedY = 2;

// score
let playerScore = 0;
let aiScore = 0;

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

    // clear
    context.clearRect(0, 0, board.width, board.height);

    // draw paddles
    context.fillStyle = "white";
    context.fillRect(playerX, playerY, playerWidth, playerHeight);
    context.fillRect(aiX, aiY, aiWidth, aiHeight);

    // move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // bounce top/bottom
    if (ballY <= 0 || ballY >= boardHeight - ballSize) {
        ballSpeedY *= -1;
    }

    // paddle collision (player)
    if (
        ballX <= playerX + playerWidth &&
        ballY >= playerY &&
        ballY <= playerY + playerHeight
    ) {
        ballSpeedX *= -1;
    }

    // paddle collision (AI)
    if (
        ballX + ballSize >= aiX &&
        ballY >= aiY &&
        ballY <= aiY + aiHeight
    ) {
        ballSpeedX *= -1;
    }

    // score
    if (ballX <= 0) {
        aiScore++;
        resetBall();
    }
    if (ballX >= boardWidth) {
        playerScore++;
        resetBall();
    }

    // simple AI movement
    if (aiY + aiHeight / 2 < ballY) {
        aiY += 2;
    } else {
        aiY -= 2;
    }

    // draw ball
    context.fillRect(ballX, ballY, ballSize, ballSize);

    // draw score
    context.font = "20px Courier New";
    context.fillText(playerScore, boardWidth / 4, 30);
    context.fillText(aiScore, (3 * boardWidth) / 4, 30);
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
    ballSpeedX *= -1;
    ballSpeedY = 2 * (Math.random() > 0.5 ? 1 : -1);
}