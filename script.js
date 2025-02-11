const board = document.getElementById("game-board");
const statusDiv = document.getElementById("status");
const resetButton = document.getElementById("reset-button");

let boardState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

// Game Logic
function handleCellClick(event) {
    const cellIndex = event.target.getAttribute("data-cell-index");

    // If the cell is already clicked or game is not active, return
    if (boardState[cellIndex] !== "" || !isGameActive) return;

    // Update the board state
    boardState[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    // Check for winner
    if (checkWinner()) {
        statusDiv.textContent = `${currentPlayer} wins!`;
        isGameActive = false;
    } else if (boardState.every(cell => cell !== "")) {
        statusDiv.textContent = "It's a tie!";
        isGameActive = false;
    } else {
        // Switch player
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDiv.textContent = `${currentPlayer}'s turn`;
    }
}

// Check for a winner
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return true;
        }
    }
    return false;
}

// Reset the game
function resetGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    isGameActive = true;
    statusDiv.textContent = `${currentPlayer}'s turn`;
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => cell.textContent = "");
}

// Event Listeners
board.addEventListener("click", handleCellClick);
resetButton.addEventListener("click", resetGame);

// Initial Status
statusDiv.textContent = `${currentPlayer}'s turn`;
