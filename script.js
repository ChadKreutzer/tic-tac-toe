let squares, [current, winner] = ["X", "O"];

const piece = document.getElementById("piece"),
    message = document.getElementById("message"),
    newGame = document.getElementById("new-game"),
    player = document.getElementById("player"),
    game = document.getElementById("game");

const WINS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
];

export default class Game {
    
    constructor () {
        this.buttons = document.getElementsByTagName("input");
    }

    render() {
        const board = new Array(9).fill(`<div class="square"></div>`);
        game.innerHTML = board.join("\n");
        squares = document.querySelectorAll(".square");
        piece.innerHTML = current;
        showPlayer(true);
    }

    activateBoard() {
        squares.forEach(square => square.addEventListener("click", handleSquareClick));
    }

    startGame() {
        game.addEventListener("click", handleTurn);
    }

    endGame() {
        [...this.buttons].forEach(button => button.addEventListener("click", handleConfirmation));
    }
}

function handleConfirmation() {
    (this.name === "yes") ? resetGame(): game.removeEventListener("click", handleTurn);
    showDialog(false);
}

function handleTurn() {
    const boardState = [...this.childNodes]
        .filter(n => n.className)
        .map(n => n = n.innerHTML);

    if (winCheck(boardState)) {
        endMessage(`${winner} WON!`);
        squares.forEach(square => square.removeEventListener("click", handleSquareClick));
    }
    else if (drawCheck(boardState)) {
        endMessage(`Tie Game!`);
    }
}

function handleSquareClick() {
    if (!this.innerHTML) {
        this.innerHTML = piece.innerHTML;
        [current, winner] = [winner, current];
        piece.innerHTML = current;
    }
}

const resetGame = () => {
    message.innerHTML = "";
    [current, winner] = ["X", "O"];
    piece.innerHTML = current;
    squares.forEach(square => {
        square.innerHTML = "";
        square.addEventListener("click", handleSquareClick);
    });
    showPlayer(true);
};

const endMessage = str => {
    showPlayer(false);
    message.innerHTML = str;
    showDialog(true);
};

const drawCheck = arr => arr.every(n => n);

const showDialog = (bool) => (bool) ? newGame.classList.remove("hidden") : newGame.classList.add("hidden");

const showPlayer = (bool) => (bool) ? player.classList.remove("hidden") : player.classList.add("hidden");

const winCheck = arr => WINS.filter(w => w.every(c => arr[c] === winner)).length;
