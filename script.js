const rows = 6;
const columns = 7;
const board = [];
let currentPlayer = 'red';

document.addEventListener("DOMContentLoaded", () => {
    createBoard();
    document.getElementById('reset').addEventListener('click', resetGame);
    updatePlayerIndicator();
});

function createBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < columns; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = r;
            cell.dataset.column = c;
            cell.addEventListener('click', handleCellClick);
            boardElement.appendChild(cell);
            row.push(null);
        }
        board.push(row);
    }
}

function handleCellClick(event) {
    const column = parseInt(event.target.dataset.column);
    for (let r = rows - 1; r >= 0; r--) {
        if (!board[r][column]) {
            board[r][column] = currentPlayer;
            const cell = document.querySelector(`.cell[data-row="${r}"][data-column="${column}"]`);
            cell.classList.add(currentPlayer);
            if (checkWinner(r, column)) {
                document.getElementById('message').textContent = `${currentPlayer.toUpperCase()} Wins!`;
                disableBoard();
                return;
            }
            currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            updatePlayerIndicator();
            return;
        }
    }
}

function updatePlayerIndicator() {
    const indicator = document.getElementById('player-indicator');
    indicator.textContent = `Current Player: ${currentPlayer.toUpperCase()}`;
    indicator.style.color = currentPlayer === 'red' ? 'red' : 'yellow';
}

function checkWinner(row, column) {
    return (
        checkDirection(row, column, 1, 0) || // Horizontal
        checkDirection(row, column, 0, 1) || // Vertical
        checkDirection(row, column, 1, 1) || // Diagonal \
        checkDirection(row, column, 1, -1)   // Diagonal /
    );
}

function checkDirection(row, column, rowDir, colDir) {
    let count = 1;
    for (let i = 1; i < 4; i++) {
        if (getCell(row + i * rowDir, column + i * colDir) === currentPlayer) {
            count++;
        } else {
            break;
        }
    }
    for (let i = 1; i < 4; i++) {
        if (getCell(row - i * rowDir, column - i * colDir) === currentPlayer) {
            count++;
        } else {
            break;
        }
    }
    return count >= 4;
}

function getCell(row, column) {
    if (row < 0 || row >= rows || column < 0 || column >= columns) {
        return null;
    }
    return board[row][column];
}

function disableBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
}

function resetGame() {
    board.length = 0;
    document.getElementById('message').textContent = '';
    currentPlayer = 'red';
    createBoard();
    updatePlayerIndicator();
}
