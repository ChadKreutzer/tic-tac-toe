let [current, next] = ["X", "O"],
    piece = document.getElementById("piece"),
    message = document.getElementById("message");

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
        showPlayerMessage();
    }
    
    activateBoard () {
        this.squares = document.querySelectorAll(".square");
        this.squares.forEach(square => square.addEventListener("click", handleSquareClick));
    }
    
    startGame () {
        this.game.addEventListener("click", handleTurn);
    }
    
    endGame () {
        // window.addEventListener("click", function (){
        //     if(message.innerHTML) {
        //         var timeout = window.setTimeout(resetGame(), 1000);
        //         //window.clearTimeout(timeout);
        //     }
        // });
    }
}

function handleSquareClick () {
    if (!this.innerHTML) {
        this.innerHTML = piece.innerHTML;
        [current, next] = [next, current];
        piece.innerHTML = current;
    }
}

function handleTurn () {
    const boardState = [...this.childNodes]
        .filter(n => n.className)
        .map(n => n = n.innerHTML);
    
    if (winCheck(boardState)) {
        endMessage(`${next} WON!`);
        deactivateBoard();
    } else if (drawCheck(boardState)) {
        endMessage(`Tie Game!`);
    } 
}

const drawCheck = arr => arr.every(n => n);

const winCheck = arr => WINS.filter(w => w.every(c => arr[c] === next)).length;

const endMessage = str => {
    hidePlayerMessage();
    message.innerHTML = str;
    //message.classList.add("game-over");
};

const deactivateBoard = () => {
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => square.removeEventListener("click", handleSquareClick));
};

// const resetGame = () => {
//     if(window.confirm("play again?")) {
//         message.innerHTML = "";
//         [current, next] = ["X", "O"];
//         piece.innerHTML = current;
//         const squares = document.querySelectorAll(".square");
//         squares.forEach(square => {
//             square.innerHTML = "";
//             square.addEventListener("click", handleSquareClick);
//         });
//         showPlayerMessage();
//     }
// };

const hidePlayerMessage = () => document.getElementById("player").classList.add("hidden");
const showPlayerMessage = () => document.getElementById("player").classList.remove("hidden");