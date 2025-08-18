const boxes = document.querySelectorAll(".boxs");
const resetButton = document.querySelector("#reset");

let currentPlayer = "X";

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (box.textContent === "") {
      box.textContent = "X";
      box.disabled = true;

      if (checkWinner("X")) {
        setTimeout(() => {
          alert("Player 1 (X) wins!");
          resetGame();
        }, 100);
        return;
      } else if (isDraw()) {
        setTimeout(() => {
          alert("It's a draw!");
          resetGame();
        }, 100);
        return;
      }

      setTimeout(() => {
        aiMove();
      }, 300);
    }
  });
});

function aiMove() {
  const emptyBoxes = Array.from(boxes).filter(box => box.textContent === "");
  if (emptyBoxes.length === 0) return;

  const randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
  randomBox.textContent = "O";
  randomBox.disabled = true;

  if (checkWinner("O")) {
    setTimeout(() => {
      alert("Player 2 (O - AI) wins!");
      resetGame();
    }, 100);
  } else if (isDraw()) {
    setTimeout(() => {
      alert("It's a draw!");
      resetGame();
    }, 100);
  }
}

function checkWinner(player) {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winPatterns.some(pattern =>
    pattern.every(index => boxes[index].textContent === player)
  );
}

function isDraw() {
  return Array.from(boxes).every(box => box.textContent !== "");
}

function resetGame() {
  boxes.forEach(box => {
    box.textContent = "";
    box.disabled = false;
  });
}

resetButton.addEventListener("click", resetGame);