const board = document.getElementById("board");
const message = document.getElementById("message");
const resetBtn = document.getElementById("reset");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function renderBoard() {
  board.innerHTML = "";
  gameBoard.forEach((cell, index) => {
    const cellDiv = document.createElement("div");
    cellDiv.className = `w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 
                        bg-gray-700 rounded flex items-center justify-center 
                        text-4xl md:text-5xl lg:text-6xl font-bold 
                        cursor-pointer ${
                          cell === "X"
                            ? "text-[#30c4c1]"
                            : cell === "O"
                            ? "text-[#f1b336]"
                            : ""
                        }`;
    cellDiv.dataset.index = index;
    cellDiv.textContent = cell;
    cellDiv.addEventListener("click", handleCellClick);
    board.appendChild(cellDiv);
  });
}

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || gameBoard[index] !== "") return;

  gameBoard[index] = currentPlayer;
  renderBoard();
  checkResult();
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  if (gameActive) {
    message.textContent = `Turno: ${currentPlayer}`;
  }
}

function checkResult() {
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      gameActive = false;
      message.textContent = `¡Ganó ${gameBoard[a]}!`;
      return;
    }
  }

  if (!gameBoard.includes("")) {
    gameActive = false;
    message.textContent = "¡Empate!";
  }
}

resetBtn.addEventListener("click", () => {
  currentPlayer = "X";
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  message.textContent = `Turno: ${currentPlayer}`;
  renderBoard();
});

renderBoard();
