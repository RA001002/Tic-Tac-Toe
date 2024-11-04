const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('gameStatus');
const restartBtn = document.getElementById('restartBtn');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function displayLetter(letter) {
    const letterContainer = document.getElementById("letter-container");
    letterContainer.textContent = letter;
    letterContainer.style.display = "block";
    letterContainer.style.opacity = 1;
  
    setTimeout(() => {
      letterContainer.style.opacity = 0;
      setTimeout(() => {
        letterContainer.style.display = "none";
      }, 500);
    }, 2000);
  }

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const checkWinner = () =>{
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameStatus.textContent = `Player ${currentPlayer} Wins!`;
        displayLetter(`${currentPlayer}`);
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        gameStatus.textContent = 'Draw!';
        displayLetter("DRAW");
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatus.textContent = `Player ${currentPlayer}'s turn`;
  
};

const handleCellClick = (e) => {
    const clickedCell = e.target;
    const cellIndex = clickedCell.getAttribute('data-index');

    if (board[cellIndex] !== '' || !gameActive) {
        return;
    }

    board[cellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    checkWinner();
};

const restartGame = () => {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    gameStatus.textContent = `Player 'X's turn`;
    cells.forEach(cell => cell.textContent = '');

};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);