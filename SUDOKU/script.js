let board = [];
let solution = [];

// Predefined Sudoku puzzles
const puzzles = [
    {
        board: [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]
        ],
        solution: [
            [5, 3, 4, 6, 7, 8, 9, 1, 2],
            [6, 7, 2, 1, 9, 5, 3, 4, 8],
            [1, 9, 8, 3, 4, 2, 5, 6, 7],
            [8, 5, 9, 7, 6, 1, 4, 2, 3],
            [4, 2, 6, 8, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 8, 5, 6],
            [9, 6, 1, 5, 3, 7, 2, 8, 4],
            [2, 8, 7, 4, 1, 9, 6, 3, 5],
            [3, 4, 5, 2, 8, 6, 1, 7, 9]
        ]
    }
];

function startGame() {
    document.getElementById("welcomeScreen").style.display = "none";
    document.getElementById("gameContainer").style.display = "flex";
    generateNewBoard();
}

function generateNewBoard() {
    let randomPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
    board = JSON.parse(JSON.stringify(randomPuzzle.board));
    solution = randomPuzzle.solution;
    createBoard();
}

function createBoard() {
    const boardContainer = document.getElementById("sudokuBoard");
    boardContainer.innerHTML = "";
    
    board.forEach((row, rowIndex) => {
        row.forEach((num, colIndex) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.contentEditable = num === 0 ? "true" : "false";
            cell.innerText = num !== 0 ? num : "";
            cell.dataset.row = rowIndex;
            cell.dataset.col = colIndex;
            cell.addEventListener("input", validateInput);
            boardContainer.appendChild(cell);
        });
    });
}

function validateInput(event) {
    const cell = event.target;
    const value = cell.innerText.trim();
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    
    cell.classList.toggle("green", parseInt(value) === solution[row][col]);
    cell.classList.toggle("red", parseInt(value) !== solution[row][col]);
    checkWin();
}

function resetBoard() {
    generateNewBoard();
}

// ✅ New Function: Show "Game Resumed" popup when clicking Resume
function resumeGame() {
    let resumeBox = document.createElement("div");
    resumeBox.id = "resumeBox";
    resumeBox.innerText = "Game Resumed";
    document.body.appendChild(resumeBox);
    
    setTimeout(() => {
        resumeBox.style.opacity = "0";
        setTimeout(() => resumeBox.remove(), 500);
    }, 2000);
}

function checkWin() {
    if (document.querySelectorAll(".cell.green").length === 81) {
        setTimeout(() => alert("🎉 Game Completed!"), 100);
    }
}

function backToHome() {
    location.reload();
}
