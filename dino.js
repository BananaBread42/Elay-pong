//board
let board;
let boardWidth = 750;
let boardHeight = 250;
let context;

//dino
let dinoWidth = 88;
let dinoHeight = 94;
let dinoX = 50;
let dinoY = boardHeight - dinoHeight;
let dinoImg;

let dino = {
    x : dinoX,
    y : dinoY,
    width : dinoWidth,
    height : dinoHeight
}

//cactus
let cactusArray = [];

let cactus1Width = 34;
let cactus2Width = 69;
let cactus3Width = 102;

let cactusHeight = 70;
let cactusX = 700;
let cactusY = boardHeight - cactusHeight;

let cactus1Img;
let cactus2Img;
let cactus3Img;

//physics
let velocityX = -8;
let velocityY = 0;
let gravity = .4;

let gameOver = false;
let score = 0;
let highScore = 0;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d");

    dinoImg = new Image();
    dinoImg.src = "./img/dino.png";

    cactus1Img = new Image();
    cactus1Img.src = "./img/cactus1.png";

    cactus2Img = new Image();
    cactus2Img.src = "./img/cactus2.png";

    cactus3Img = new Image();
    cactus3Img.src = "./img/cactus3.png";

    requestAnimationFrame(update);
    setInterval(placeCactus, 1000);
    document.addEventListener("keydown", moveDino);
}

function update() {
    requestAnimationFrame(update);

    context.clearRect(0, 0, board.width, board.height);

    if (gameOver) {
        // GAME OVER SCREEN
        context.fillStyle = "black";
        context.font = "30px Courier";
        context.fillText("GAME OVER", boardWidth/3, boardHeight/2);

        context.font = "16px Courier";
        context.fillText("Press SPACE to Restart", boardWidth/3, boardHeight/2 + 30);
        context.fillText("Score: " + score, boardWidth/3, boardHeight/2 + 60);
        context.fillText("High Score: " + highScore, boardWidth/3, boardHeight/2 + 90);
        return;
    }

    //dino
    velocityY += gravity;
    dino.y = Math.min(dino.y + velocityY, dinoY);
    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);

    //cactus
    for (let i = 0; i < cactusArray.length; i++) {
        let cactus = cactusArray[i];
        cactus.x += velocityX;
        context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);

        if (detectCollision(dino, cactus)) {
            gameOver = true;
            dinoImg.src = "./img/dino-dead.png";

            // update high score
            if (score > highScore) {
                highScore = score;
            }
        }
    }

    //score
    score++;
    context.fillStyle="black";
    context.font="20px Courier";
    context.fillText("Score: " + score, 10, 20);
    context.fillText("High: " + highScore, 10, 40);
}

function moveDino(e) {

    // RESTART GAME
    if (e.code == "Space" && gameOver) {
        resetGame();
        return;
    }

    if ((e.code == "Space" || e.code == "ArrowUp") && dino.y == dinoY) {
        velocityY = -10;
    }
}

function resetGame() {
    gameOver = false;
    score = 0;

    dino.y = dinoY;
    velocityY = 0;

    cactusArray = [];

    dinoImg.src = "./img/dino.png";
}

function placeCactus() {
    if (gameOver) {
        return;
    }

    let cactus = {
        img : null,
        x : cactusX,
        y : cactusY,
        width : null,
        height: cactusHeight
    }

    let chance = Math.random();

    if (chance > .90) {
        cactus.img = cactus3Img;
        cactus.width = cactus3Width;
    }
    else if (chance > .70) {
        cactus.img = cactus2Img;
        cactus.width = cactus2Width;
    }
    else if (chance > .50) {
        cactus.img = cactus1Img;
        cactus.width = cactus1Width;
    }

    if (cactus.img != null) {
        cactusArray.push(cactus);
    }

    if (cactusArray.length > 5) {
        cactusArray.shift();
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}