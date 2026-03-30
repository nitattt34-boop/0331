let gameState = 'START';
let timeLeft = 30;
let lastTimeCheck = 0;
let gridSize = 60; // 調整為適中大小
let targetCol, targetRow;

function setup() {
  createCanvas(windowWidth, windowHeight);
  initTarget();
}

function initTarget() {
  // 計算畫面總共有幾欄幾列，並隨機挑選一個當作隱藏目標
  let cols = floor(windowWidth / gridSize);
  let rows = floor(windowHeight / gridSize);
  targetCol = floor(random(cols));
  targetRow = floor(random(rows));
}

function draw() {
  if (gameState === 'START') {
    background(0);
    textAlign(CENTER, CENTER);
    
    fill(255, 204, 0); 
    textSize(48); 
    text("🕵️‍♂️ 幸運色塊獵人", width / 2, height / 2 - 100);
    
    fill(200); 
    textSize(20); 
    text("任務：在 30 秒內找出隱藏的方塊！\n(調整視窗大小會重新開始遊戲)", width / 2, height / 2 - 10);
    
    fill(178, 34, 34); 
    stroke(255); 
    strokeWeight(2); 
    rectMode(CENTER);
    rect(width / 2, height / 2 + 100, 200, 60, 10);
    
    fill(255); 
    noStroke(); 
    textSize(24); 
    text("開始遊戲", width / 2, height / 2 + 100);
  } 
  else if (gameState === 'PLAYING') {
    background(25);
    
    // 1. 畫出滿版的網格
    stroke(50); 
    strokeWeight(1);
    for (let x = 0; x < width; x += gridSize) line(x, 0, x, height);
    for (let y = 0; y < height; y += gridSize) line(0, y, width, y);
    
    // 2. 倒數計時器
    if (millis() - lastTimeCheck >= 1000) {
      timeLeft--; 
      lastTimeCheck = millis();
      if (timeLeft <= 0) gameState = 'LOSE';
    }
    
    fill(255, 0, 0); 
    noStroke(); 
    textSize(24); 
    textAlign(CENTER, TOP);
    text("⏱️ 剩餘時間: " + timeLeft, width / 2, 10);
    
    // ==========================================
    // 【測試用提示】直接告訴你顏色藏在哪裡！
    // ==========================================
    fill(255);
    textSize(16);
    textAlign(LEFT, BOTTOM);
    text(`💡 答案在這：第 ${targetCol} 行, 第 ${targetRow} 列 (請把滑鼠移過去)`, 10, height - 10);
    
    // 3. 計算目前滑鼠停在哪一格
    let currentCol = floor(mouseX / gridSize);
    let currentRow = floor(mouseY / gridSize);
    
    // 畫出跟著滑鼠的半透明白色掃描區塊
    fill(255, 255, 255, 30); 
    rectMode(CORNER);
    rect(currentCol * gridSize, currentRow * gridSize, gridSize, gridSize);
    
    // 4. 【顯現顏色】：如果滑鼠剛好踩中目標格，畫出紫色圓形！
    if (currentCol === targetCol && currentRow === targetRow) {
      fill(128, 0, 128); // 老師截圖中的紫色
      noStroke();
      circle(targetCol * gridSize + gridSize/2, targetRow * gridSize + gridSize/2, gridSize * 0.7);
    }
  }
  else if (gameState === 'WIN') {
    background(0, 200, 0, 220);
    fill(255); 
    textAlign(CENTER, CENTER); 
    textSize(48); 
    text("🎉 恭喜找到目標！\n點擊畫面重新開始", width / 2, height / 2);
  }
  else if (gameState === 'LOSE') {
    background(200, 0, 0, 220);
    fill(255); 
    textAlign(CENTER, CENTER); 
    textSize(48); 
    text("💥 時間到！\n點擊畫面重新開始", width / 2, height / 2);
  }
}

// 點擊事件
function mousePressed() {
  if (gameState === 'START') {
    let btnX = width / 2; 
    let btnY = height / 2 + 100;
    if (mouseX > btnX - 100 && mouseX < btnX + 100 && mouseY > btnY - 30 && mouseY < btnY + 30) {
      gameState = 'PLAYING'; 
      lastTimeCheck = millis(); // 進入遊戲開始計時
    }
  } else if (gameState === 'PLAYING') {
    let currentCol = floor(mouseX / gridSize); 
    let currentRow = floor(mouseY / gridSize);
    // 找到目標且點擊滑鼠，判定為過關
    if (currentCol === targetCol && currentRow === targetRow) {
      gameState = 'WIN';
    }
  } else if (gameState === 'WIN' || gameState === 'LOSE') {
    gameState = 'START'; 
    timeLeft = 30; 
    initTarget();
  }
}

// 視窗縮放事件
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  gameState = 'START'; 
  timeLeft = 30;
  initTarget();
}