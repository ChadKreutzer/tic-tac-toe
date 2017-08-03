const game = document.getElementById("game");


console.log(game);

const buildBoard = () => {
    const board = new Array(9).fill(`<div class="square" id="`);
    game.innerHTML = board.map((c, i) => c = `${c}${i}">${i}</div>`).join("\n");
};

buildBoard();