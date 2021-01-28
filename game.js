let sequence = [];
let actualSequence;
let gameOver = false;
let difficulty = 1000;
let score = 0;

function nextSequence() {
  actualSequence = 0;
  sequence.push(Math.floor(Math.random() * 4));
}

function increaseDifficulty() {
  if (difficulty > 100) {
    difficulty -= 100;
  }
}

function verifySequence(button) {
  let correctButton = buttons[sequence[actualSequence]];

  if (button != correctButton) {
    gameOver = true;
    return;
  }

  actualSequence++;

  if (actualSequence == sequence.length) {
    stage = "next";
    return;
  }
}
