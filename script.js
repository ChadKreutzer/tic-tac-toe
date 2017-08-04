let [current, next] = ["X", "O"],
    piece = document.getElementById("piece"),
    endGame = document.getElementById("end-game");

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
    }
    
    activateBoard () {
        this.squares = document.querySelectorAll(".square");
        this.squares.forEach(square => square.addEventListener("click", handleSquareClick));
        
    }
    
    startGame () {
        this.game.addEventListener("click", handleTurn);
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
        hideCurrentPlayer();
        endGame.innerHTML = `
            ${next} WON!
            
        `;
        document.querySelectorAll(".square").forEach(square =>
            square.removeEventListener("click", handleSquareClick));
    } else if (drawCheck(boardState)) {
        hideCurrentPlayer();
        endGame.innerHTML = `
            Tie Game!
        `;
    } 
}

const drawCheck = arr => arr.every(n => n);

const winCheck = arr => WINS.filter(w => w.every(c => arr[c] === next)).length;

//const endMessage

const hideCurrentPlayer = () => document.getElementById("player").classList.toggle("hidden");