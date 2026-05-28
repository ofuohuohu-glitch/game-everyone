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
  playSound("button");
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
  playSound("button");
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
      playSound("clear");
      document.getElementById("clearOverlay").style.display = "flex"
      // updateDisplay() の代わりに画像と連勝数だけ更新する
      const imageMap = {
        "グー": "button_gu.png",
        "チョキ": "button_tyoki.png",
        "パー": "button_pa.png"
      };
      document.getElementById("player-hand-image").src = imageMap[playerHand];
      document.getElementById("cpu-hand-image").src = imageMap[cpuHand];
      document.getElementById("streakDisplay").textContent = "現在の連勝数：" + winStreak;

      return; // ここで止める
    } else {
      resultText = "勝ち！あと " + (5 - winStreak);
      playSound("win");
    }

  } else if (result === "負け") {
    winStreak = 0;
    resultText = "負け…連勝がリセットされた😢";
    playSound("lose");
  } else {
    resultText = "あいこ！そのまま続けよう🤝";
    playSound("draw");
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

// 変数の一番下に追加
let sounds = {};

function setup() {
  noCanvas();

  // 音声ファイルを読み込む
  sounds.button = new Audio("決定ボタンを押す31.mp3");
  sounds.win    = new Audio("クイズ正解4.mp3");
  sounds.lose   = new Audio("クイズ不正解1.mp3");
  sounds.draw   = new Audio("パッ.mp3");
  sounds.clear  = new Audio("ラッパのファンファーレ.mp3");
}
function playSound(name) {
  sounds[name].currentTime = 0; // 最初から再生する
  sounds[name].play();
}
