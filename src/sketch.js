let playerHand = "";
let cpuHand = "";
let resultText = "";
let winStreak = 0;
let isGameOver = false;

let hands = ["グー", "チョキ", "パー"];

function setup() {
  noCanvas(); // HTMLでUIを作るのでcanvasは不要
}

function startGame() {
  // スタート画面を隠す
  document.getElementById("start-screen").style.display = "none";
  // ゲーム画面を表示する
  document.getElementById("game-screen").style.display = "block";
}

function selectHand(hand) {
  playerHand = hand;
  playGame();
}

function getCpuHand() {
  let index = floor(random(3)); //0か1をランダムで選ぶ
  return hands[index];          //その番号の手を返す
}


function judgeResult(player, cpu) {
  // まずあいこを確認
  if (player === cpu) {
    return "あいこ";
  }
  // 勝ちのパターン3つを確認
  if (
    (player === "グー" && cpu === "チョキ") ||
    (player === "チョキ" && cpu === "パー") ||
    (player === "パー" && cpu === "グー")
  ) {
    return "勝ち";
  }
  //どれにも当てはまらなければ負け
  return "負け";
}


function playGame() {

  // ①ゲームが終わっていたら何もしない
  if (isGameOver === true) {
    return; // ここで処理を止める
  }
  // ②CPUの手を決める
  cpuHand = getCpuHand(); // CPUの手をランダムで決めてcpuHand箱に入れる

  // ③勝敗を判定する
  let result = judgeResult(playerHand, cpuHand)

  // ④結果に応じて処理を分岐する
  if (result === "勝ち") {
    winStreak = winStreak + 1; //連勝数を1増やす

    if (winStreak === 5) {
      // 5連勝達成！
      isGameOver = true;
      resultText = "🎉５連勝達成！クリア！";
    } else {
      //まだ5連勝じゃない
      resultText = "勝ち！あと " + (5 - winStreak)
    }

  } else if (result === "負け") {
    winStreak = 0; //連勝リセット
    resultText = "負け…連勝がリセットされた😢";
  } else {
    //　あいこ(winStreakはそのまま)
    resultText = "あいこ！そのまま続けよう🤝";
  }

  updateDisplay();
}

function updateDisplay() {
  document.getElementById("playerDisplay").textContent = "あなた：" + playerHand;
  document.getElementById("cpuDisplay").textContent = "CPU：" + cpuHand;
  document.getElementById("resultDisplay").textContent = "結果：" + resultText;
  document.getElementById("streakDisplay").textContent = "現在の連勝数：" + winStreak;

  const imageMap = {
    "グー": "gu.png",
    "チョキ": "tyoki.png",
    "パー": "pa.png"
  };

  document.getElementById("player-hand-image").src = imageMap[playerHand];
  document.getElementById("cpu-hand-image").src = imageMap[cpuHand];
}
