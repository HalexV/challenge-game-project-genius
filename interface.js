onload = () => {
  let loadingScreen = document.getElementById("loading-screen");

  loadingScreen.style.display = "none";
};

const yellowButton = document.getElementById("yellow-btn");
const blueButton = document.getElementById("blue-btn");
const redButton = document.getElementById("red-btn");
const greenButton = document.getElementById("green-btn");

const buttons = [yellowButton, blueButton, redButton, greenButton];

let animationEnd = false;

async function executeSequence(sequence, speed) {
  animationEnd = false;
  for (let button of sequence) {
    playAudio(buttons[button]);
    await blinkButton(buttons[button], speed);
  }
  animationEnd = true;
}

function playAudio(element) {
  let audioElement = element.getElementsByTagName("audio")[0];

  audioElement.currentTime = 0;
  audioElement.play();
}

function clickButton(element) {
  if (stage === "player") {
    playAudio(element);
    blinkButton(element, 250);
    verifySequence(element);

    if (gameOver) {
      score = sequence.length - 1;
      stage = "start";
      centerMessage("Start");
      showGameOverScreen();
    }

    if (stage === "next") {
      centerMessage("Go!");
    }
  }
}

function showGameOverScreen() {
  let gameOverScreen = document.getElementById("game-over-screen");

  gameOverScreen.innerHTML = `Game Over <br> Score: ${score}`;
  gameOverScreen.style.display = "flex";
}

function hideGameOverScreen(element) {
  element.style.display = "none";
}

function blinkButton(button, speed) {
  const intervalBetweenButtons = 60;

  return new Promise((resolve) => {
    switch (button.id) {
      case "yellow-btn":
        button.classList.add("yellow-btn-active");

        setTimeout(() => {
          button.classList.remove("yellow-btn-active");
          setTimeout(() => {
            resolve();
          }, intervalBetweenButtons);
        }, speed);
        break;
      case "blue-btn":
        button.classList.add("blue-btn-active");

        setTimeout(() => {
          button.classList.remove("blue-btn-active");
          setTimeout(() => {
            resolve();
          }, intervalBetweenButtons);
        }, speed);

        break;
      case "red-btn":
        button.classList.add("red-btn-active");

        setTimeout(() => {
          button.classList.remove("red-btn-active");

          setTimeout(() => {
            resolve();
          }, intervalBetweenButtons);
        }, speed);
        break;
      case "green-btn":
        button.classList.add("green-btn-active");

        setTimeout(() => {
          button.classList.remove("green-btn-active");
          setTimeout(() => {
            resolve();
          }, intervalBetweenButtons);
        }, speed);
        break;
      default:
        console.log("Error blinkButton");
        resolve();
        break;
    }
  });
}

function centerMessage(message) {
  let centerElement = document.getElementById("center-btn-message");

  centerElement.textContent = message;
}

let stage = "start";

function centerButton() {
  if (stage === "start") {
    centerMessage("Wait");
    stage = "wait";
    startGame();
    return;
  }

  if (stage === "next") {
    centerMessage("Wait");
    stage = "wait";
    nextRound();
    return;
  }
}

async function startGame() {
  sequence = [];
  gameOver = false;
  difficulty = 1000;

  nextSequence();

  await executeSequence(sequence, difficulty);

  if (animationEnd) {
    stage = "player";
    centerMessage("Your Turn");
  }
}

async function nextRound() {
  nextSequence();
  increaseDifficulty();

  await executeSequence(sequence, difficulty);

  if (animationEnd) {
    stage = "player";
    centerMessage("Your Turn");
  }
}
