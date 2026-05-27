let playerHand = "";
let cpuHand = "";
let resultText = "";
let winStreak = 0;
let isGameOver = false;

let hands = ["グー", "チョキ", "パー"];

function setup() {
  noCanvas();
}

function startGame() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "flex";
}

function goToStart() {
  document.getElementById("game-screen").style.display = "none";
  document.getElementById("start-screen").style.display = "flex";
  document.getElementById("clearOverlay").style.display = "none"; // ← 追加！

  playerHand = "";
  cpuHand = "";
  resultText = "";
  winStreak = 0;
  isGameOver = false;

  document.getElementById("playerDisplay").textContent = "あなた：";
  document.getElementById("cpuDisplay").textContent = "CPU：";
  document.getElementById("resultDisplay").textContent = "";
  document.getElementById("resultDisplay").style.display = "none";
  document.getElementById("resultOverlay").style.display = "none"; // ← 追加！
  document.getElementById("streakDisplay").textContent = "現在の連勝数：0";

  document.getElementById("player-hand-image").src = "button_gu.png";
  document.getElementById("cpu-hand-image").src = "button_gu.png";
}

function selectHand(hand) {
  playerHand = hand;
  playGame();
}

function getCpuHand() {
  let index = floor(random(3));
  return hands[index];
}

function judgeResult(player, cpu) {
  if (player === cpu) {
    return "あいこ";
  }

  if (
    (player === "グー" && cpu === "チョキ") ||
    (player === "チョキ" && cpu === "パー") ||
    (player === "パー" && cpu === "グー")
  ) {
    return "勝ち";
  }

  return "負け";
}

function playGame() {
  if (isGameOver === true) {
    return;
  }

  cpuHand = getCpuHand();
  let result = judgeResult(playerHand, cpuHand);

  if (result === "勝ち") {
    winStreak++;

    if (winStreak === 5) {
      isGameOver = true;
      resultText = "🎉５連勝達成！クリア！";
      document.getElementById("clearOverlay").style.display = "flex"
    } else {
      resultText = "勝ち！あと " + (5 - winStreak);
    }

  } else if (result === "負け") {
    winStreak = 0;
    resultText = "負け…連勝がリセットされた😢";
  } else {
    resultText = "あいこ！そのまま続けよう🤝";
  }

  updateDisplay();

  document.getElementById("resultOverlay").style.display = "block";
  document.getElementById("resultDisplay").style.display = "block";
}

function closeOverlay() {
  // オーバーレイを隠す
  document.getElementById("resultOverlay").style.display = "none";
  // 結果表示も隠す
  document.getElementById("resultDisplay").style.display = "none";
}

function updateDisplay() {
  document.getElementById("playerDisplay").textContent = "あなた：" + playerHand;
  document.getElementById("cpuDisplay").textContent = "CPU：" + cpuHand;
  document.getElementById("resultDisplay").textContent = resultText;
  document.getElementById("streakDisplay").textContent = "現在の連勝数：" + winStreak;
  document.getElementById("resultDisplay").style.display = "block";


  const imageMap = {
    "グー": "button_gu.png",
    "チョキ": "button_tyoki.png",
    "パー": "button_pa.png"
  };

  const playerImg = document.getElementById("player-hand-image");
  const cpuImg = document.getElementById("cpu-hand-image");

  playerImg.src = imageMap[playerHand];
  cpuImg.src = imageMap[cpuHand];

  playerImg.style.animation = "none";
  cpuImg.style.animation = "none";

  void playerImg.offsetWidth;
  void cpuImg.offsetWidth;

  playerImg.style.animation = "playerHandIn 0.4s ease";
  cpuImg.style.animation = "cpuHandIn 0.4s ease";
}
