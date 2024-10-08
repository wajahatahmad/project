const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
const winnerMessage = document.getElementById('winner-message');
const winnerEmoji = document.getElementById('winner-emoji');
const winnerText = document.getElementById('winner-text');
const winnerGif = document.getElementById('winner-gif');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

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

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = parseInt(cell.getAttribute('data-index'));

    if (gameState[cellIndex] !== '' || !gameActive) return;

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        gameActive = false;
        displayWinner(currentPlayer);
    } else if (gameState.includes('') === false) {
        gameActive = false;
        displayWinner('Draw');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return true;
        }
    }
    return false;
}

function displayWinner(winner) {
    if (winner === 'Draw') {
        winnerEmoji.textContent = '🤔';
        winnerText.textContent = "It's a Draw!";
        winnerGif.src = 'https://media.giphy.com/media/xT0GqI5MmpWtw4Zzji/giphy.gif';  // Draw GIF
    } else {
        winnerEmoji.textContent = winner === 'X' ? '🎉' : '👏';
        winnerText.textContent = `${winner} Wins!`;
        winnerGif.src = winner === 'X'
            ? 'https://media.giphy.com/media/3o7abA7i3eX0tSG1a0/giphy.gif'  // X Wins GIF
            : 'https://media.giphy.com/media/3o7abqFvBvDSYZG3T2/giphy.gif';  // O Wins GIF
    }
    winnerMessage.classList.remove('hidden');
}

function resetGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
    });
    winnerMessage.classList.add('hidden');
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);
