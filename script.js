// Initial Data
let board = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};

let playerTurn = '';
let winner = '';
let playing = false;

reset();

// Events
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});

// Functions
function itemClick(event) {
    let item = event.target.getAttribute('data-item');
    if(playing && board[item] === ''){
        board[item] = playerTurn;
        renderBoard();
        togglePlayer();
    }
}

function reset() {
    winner = '';

    let random = Math.floor(Math.random() * 2);
    playerTurn = (random === 0) ? 'x' : 'o';

    for(let i in board) {
        board[i] = '';
    }

    playing = true;

    renderBoard();
    renderInfo();
}

function renderBoard() {
    for( let i in board) {
        let item = document.querySelector(`div[data-item=${i}]`);
            item.innerHTML = board[i];
    }

    checkGame();
}

function renderInfo () {
    document.querySelector('.vez').innerHTML = playerTurn;
    document.querySelector('.resultado').innerHTML = winner;
};

function togglePlayer() {
    playerTurn = (playerTurn === 'x') ? 'o' : 'x';
    renderInfo();
}

function checkGame() {
    if(checkWinnerFor('x')){
        winner = 'O "x" venceu!';
        playing = false;
    } else if (checkWinnerFor('o')){
        winner = 'O "o" vence!';
        playing = false;
    } else if(isFull()) {
        winner = 'Deu empate!';
        playing = false;
    }
}

function checkWinnerFor(playerTurn){
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for(let w in pos){
        let pArray = pos[w].split(',');
        let hasWon = pArray.every(option => board[option] === playerTurn);
        if(hasWon) {
            return true;
        }

    }

    return false;

}

function isFull() {
    for(let i in board){
        if(board[i] === ''){
            return false;
        }
    }
    return true;
}