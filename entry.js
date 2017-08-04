require("./style.css");
import Game from "./script.js";

const playGame = new Game();

playGame.render();
playGame.activateBoard();
playGame.startGame();

