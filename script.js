let [current, winner] = ["X", "O"];

const piece = document.getElementById("piece"),
      message = document.getElementById("message"),
      input = document.getElementsByTagName("input"),
      newGame = document.getElementById("new-game"),
      player = document.getElementById("player");

const WINS = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

export default class Game {
    
    constructor () {
        this.squares;
        this.game = document.getElementById("game");
    }
    
    render () {
        const board = new Array(9).fill(`<div class="square"></div>`);
        this.game.innerHTML = board.join("\n");
        piece.innerHTML = current;
        showPlayer(true);
    }
    
    activateBoard () {
        this.squares = document.querySelectorAll(".square");
        this.squares.forEach(square => square.addEventListener("click", handleSquareClick));
    }
    
    startGame () {
        this.game.addEventListener("click", handleTurn);
    }
    
    endGame () {
        [...input].forEach(button => button.addEventListener("click", handleConfirmation));
    }
}

function handleSquareClick () {
    if (!this.innerHTML) {
        this.innerHTML = piece.innerHTML;
        [current, winner] = [winner, current];
        piece.innerHTML = current;
    }
}

function handleTurn () {
    const boardState = [...this.childNodes]
        .filter(n => n.className)
        .map(n => n = n.innerHTML);
    
    if (winCheck(boardState)) {
        endMessage(`${winner} WON!`);
        deactivateBoard();
    } else if (drawCheck(boardState)) {
        endMessage(`Tie Game!`);
    } 
}

function handleConfirmation () {
    if (this.name === "yes") resetGame();
    toggleDialog();
}

const drawCheck = arr => arr.every(n => n);

const winCheck = arr => WINS.filter(w => w.every(c => arr[c] === winner)).length;

const endMessage = str => {
    showPlayer(false);
    message.innerHTML = str;
    toggleDialog();
};

const toggleDialog = () => newGame.classList.toggle("hidden");

const deactivateBoard = () => {
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => square.removeEventListener("click", handleSquareClick));
};

const resetGame = () => {    
    message.innerHTML = "";
    [current, winner] = ["X", "O"];
    piece.innerHTML = current;
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
        square.innerHTML = "";
        square.addEventListener("click", handleSquareClick);
    });
    showPlayer(true);
};

const showPlayer = (bool) => (bool) ? player.classList.remove("hidden") : player.classList.add("hidden");