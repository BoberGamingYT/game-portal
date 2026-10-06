// Games Database
const games = [
  // Classic Games
  { id: 'tictactoe', name: '❌ Tic Tac Toe', category: 'Classic', render: createTicTacToe },
  { id: 'rps', name: '✊ Rock Paper Scissors', category: 'Classic', render: createRPS },
  { id: 'snake', name: '🐍 Snake', category: 'Classic', render: createSnake },
  { id: 'flappybird', name: '🐦 Flappy Bird', category: 'Classic', render: createFlappyBird },
  { id: 'pong', name: '🎾 Pong', category: 'Classic', render: createPong },
  
  // Puzzle Games
  { id: 'memory', name: '🧠 Memory Match', category: 'Puzzle', render: createMemory },
  { id: '2048', name: '2️⃣ 2048', category: 'Puzzle', render: create2048 },
  { id: 'sudoku', name: '🔢 Sudoku', category: 'Puzzle', render: createSudoku },
  { id: 'wordle', name: '📝 Wordle', category: 'Puzzle', render: createWordle },
  
  // Modern Games
  { id: 'maze', name: '🗺️ Maze', category: 'Modern', render: createMaze },
  { id: 'breakout', name: '🧱 Breakout', category: 'Modern', render: createBreakout },
  { id: 'space-invaders', name: '👽 Space Invaders', category: 'Modern', render: createSpaceInvaders },
];

let currentGameId = null;
let totalScore = 0;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initializeMenu();
  renderGames();
  document.getElementById('reset-btn').addEventListener('click', resetGame);
});

function initializeMenu() {
  const categories = ['Classic', 'Puzzle', 'Modern'];
  const categoryIds = ['classic-games', 'puzzle-games', 'modern-games'];

  categories.forEach((cat, idx) => {
    const container = document.getElementById(categoryIds[idx]);
    const categoryGames = games.filter(g => g.category === cat);
    
    categoryGames.forEach(game => {
      const btn = document.createElement('button');
      btn.className = 'nav-btn';
      btn.textContent = game.name;
      btn.onclick = () => selectGame(game.id);
      container.appendChild(btn);
    });
  });
}

function selectGame(gameId) {
  currentGameId = gameId;
  const game = games.find(g => g.id === gameId);
  
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  
  document.getElementById('game-title').textContent = game.name;
  document.getElementById('current-category').textContent = game.category + ' Games';
  
  renderGames();
}

function renderGames() {
  const container = document.getElementById('games-container');
  container.innerHTML = '';
  
  if (!currentGameId) {
    container.innerHTML = `
      <div class="start-screen">
        <h2>🎮 Welcome</h2>
        <p>Select a game from the menu to start playing!</p>
        <p>Earn points and beat high scores!</p>
      </div>
    `;
    return;
  }
  
  const game = games.find(g => g.id === currentGameId);
  const panel = document.createElement('div');
  panel.className = 'game-panel active';
  panel.id = `game-${game.id}`;
  container.appendChild(panel);
  
  game.render(panel);
}

function addScore(points) {
  totalScore += points;
  document.getElementById('total-score').textContent = totalScore;
}

function resetGame() {
  if (currentGameId) {
    const game = games.find(g => g.id === currentGameId);
    const panel = document.getElementById(`game-${game.id}`);
    if (panel) {
      panel.innerHTML = '';
      game.render(panel);
    }
  }
}

// ==================== GAME IMPLEMENTATIONS ====================

function createMemory(panel) {
  panel.innerHTML = '<h3>🧠 Memory Match</h3><div class="stats-display"><span class="stat-item">Moves: <strong id="mem-moves">0</strong></span><span class="stat-item">Matches: <strong id="mem-matches">0/8</strong></span></div><div class="memory-grid" id="mem-grid"></div>';
  
  const emojis = ['🌙', '⭐', '🚀', '🎮', '🔥', '💎', '⚡', '🎯'];
  const deck = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
  const grid = document.getElementById('mem-grid');
  
  let flipped = [], matched = 0, moves = 0;
  
  deck.forEach((emoji, idx) => {
    const card = document.createElement('button');
    card.className = 'memory-card';
    card.textContent = '?';
    card.dataset.emoji = emoji;
    card.onclick = () => {
      if (flipped.length < 2 && !card.classList.contains('revealed')) {
        card.textContent = emoji;
        card.classList.add('revealed');
        flipped.push(card);
        
        if (flipped.length === 2) {
          moves++;
          document.getElementById('mem-moves').textContent = moves;
          
          if (flipped[0].dataset.emoji === flipped[1].dataset.emoji) {
            matched++;
            document.getElementById('mem-matches').textContent = `${matched}/8`;
            addScore(50);
            flipped = [];
            if (matched === 8) alert('Memory Match Complete! +200 bonus'); addScore(200);
          } else {
            setTimeout(() => {
              flipped[0].textContent = '?';
              flipped[1].textContent = '?';
              flipped[0].classList.remove('revealed');
              flipped[1].classList.remove('revealed');
              flipped = [];
            }, 800);
          }
        }
      }
    };
    grid.appendChild(card);
  });
}

function createTicTacToe(panel) {
  panel.innerHTML = '<h3>❌ Tic Tac Toe</h3><div class="stats-display"><span class="stat-item" id="ttt-status">Player X Turn</span></div><div class="ttt-board" id="ttt-board"></div>';
  
  const board = Array(9).fill('');
  const cells = [];
  let currentPlayer = 'X', gameOver = false;
  
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('button');
    cell.className = 'ttt-cell';
    cell.onclick = () => {
      if (!board[i] && !gameOver) {
        board[i] = currentPlayer;
        cell.textContent = currentPlayer;
        
        const winner = checkWinner(board);
        if (winner) {
          document.getElementById('ttt-status').textContent = `${winner} Wins!`;
          addScore(100);
          gameOver = true;
        } else if (board.every(x => x)) {
          document.getElementById('ttt-status').textContent = 'Draw!';
          addScore(25);
          gameOver = true;
        } else {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          document.getElementById('ttt-status').textContent = `Player ${currentPlayer} Turn`;
        }
      }
    };
    document.getElementById('ttt-board').appendChild(cell);
    cells.push(cell);
  }
}

function checkWinner(board) {
  const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for (const [a,b,c] of lines) if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  return null;
}

function createRPS(panel) {
  panel.innerHTML = '<h3>✊ Rock Paper Scissors</h3><div class="stats-display"><span class="stat-item">Player: <strong id="rps-p">0</strong></span><span class="stat-item">CPU: <strong id="rps-c">0</strong></span></div><div class="rps-container"><div class="rps-buttons"><button class="rps-btn" onclick="playRPS(event, \'rock\')">✊ Rock</button><button class="rps-btn" onclick="playRPS(event, \'paper\')">✋ Paper</button><button class="rps-btn" onclick="playRPS(event, \'scissors\')">✌️ Scissors</button></div><div class="rps-result" id="rps-result"><h4>Make your move!</h4></div></div>';
}

function playRPS(e, choice) {
  const choices = ['rock', 'paper', 'scissors'];
  const cpu = choices[Math.floor(Math.random() * 3)];
  const result = document.getElementById('rps-result');
  let text, points = 10;
  
  if ((choice === 'rock' && cpu === 'scissors') || (choice === 'paper' && cpu === 'rock') || (choice === 'scissors' && cpu === 'paper')) {
    text = `You Win! ${choice} beats ${cpu}`;
    points = 50;
    document.getElementById('rps-p').textContent = parseInt(document.getElementById('rps-p').textContent) + 1;
  } else if ((cpu === 'rock' && choice === 'scissors') || (cpu === 'paper' && choice === 'rock') || (cpu === 'scissors' && choice === 'paper')) {
    text = `You Lost! ${cpu} beats ${choice}`;
    points = 0;
    document.getElementById('rps-c').textContent = parseInt(document.getElementById('rps-c').textContent) + 1;
  } else {
    text = `Draw! Both chose ${choice}`;
    points = 10;
  }
  
  addScore(points);
  result.innerHTML = `<h4>${text}</h4><p>+${points} points</p>`;
}

function createSnake(panel) {
  panel.innerHTML = '<h3>🐍 Snake</h3><div class="stats-display"><span class="stat-item">Score: <strong id="snake-score">0</strong></span><span class="stat-item">Length: <strong id="snake-len">1</strong></span></div><div id="snake-board" class="snake-board" style="grid-template-columns: repeat(20, 1fr);"></div><p style="text-align: center; margin-top: 15px; color: #9baec8;">Use Arrow Keys or WASD to move</p>';
  
  const board = document.getElementById('snake-board');
  const cells = [];
  let snake = [{ x: 10, y: 10 }];
  let dir = { x: 1, y: 0 };
  let food = { x: 15, y: 10 };
  let score = 0;
  
  for (let i = 0; i < 400; i++) cells.push(document.createElement('div'));
  cells.forEach(c => { c.className = 'snake-cell'; board.appendChild(c); });
  
  function render() {
    cells.forEach(c => c.className = 'snake-cell');
    snake.forEach((seg, i) => {
      const idx = seg.y * 20 + seg.x;
      cells[idx].classList.add(i === 0 ? 'head' : 'body');
    });
    const foodIdx = food.y * 20 + food.x;
    cells[foodIdx].classList.add('food');
  }
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'w') dir = { x: 0, y: -1 };
    if (e.key === 'ArrowDown' || e.key === 's') dir = { x: 0, y: 1 };
    if (e.key === 'ArrowLeft' || e.key === 'a') dir = { x: -1, y: 0 };
    if (e.key === 'ArrowRight' || e.key === 'd') dir = { x: 1, y: 0 };
  });
  
  setInterval(() => {
    const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || snake.some(s => s.x === head.x && s.y === head.y)) {
      alert(`Game Over! Score: ${score}`);
      addScore(score);
      return;
    }
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      score += 10;
      document.getElementById('snake-score').textContent = score;
      document.getElementById('snake-len').textContent = snake.length;
      food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
    } else snake.pop();
    render();
  }, 100);
  
  render();
}

// Placeholder functions for other games
function createFlappyBird(panel) { panel.innerHTML = '<h3>🐦 Flappy Bird</h3><p style="margin-top: 40px; text-align: center; color: #9baec8; font-size: 1.1rem;">Coming Soon! Click to flap your wings.</p>'; }
function createPong(panel) { panel.innerHTML = '<h3>🎾 Pong</h3><p style="margin-top: 40px; text-align: center; color: #9baec8; font-size: 1.1rem;">Coming Soon! Classic arcade game.</p>'; }
function create2048(panel) { panel.innerHTML = '<h3>2️⃣ 2048</h3><p style="margin-top: 40px; text-align: center; color: #9baec8; font-size: 1.1rem;">Coming Soon! Slide tiles to reach 2048.</p>'; }
function createSudoku(panel) { panel.innerHTML = '<h3>🔢 Sudoku</h3><p style="margin-top: 40px; text-align: center; color: #9baec8; font-size: 1.1rem;">Coming Soon! Solve the puzzle.</p>'; }
function createWordle(panel) { panel.innerHTML = '<h3>📝 Wordle</h3><p style="margin-top: 40px; text-align: center; color: #9baec8; font-size: 1.1rem;">Coming Soon! Guess the word.</p>'; }
function createMaze(panel) { panel.innerHTML = '<h3>🗺️ Maze</h3><p style="margin-top: 40px; text-align: center; color: #9baec8; font-size: 1.1rem;">Coming Soon! Navigate the maze.</p>'; }
function createBreakout(panel) { panel.innerHTML = '<h3>🧱 Breakout</h3><p style="margin-top: 40px; text-align: center; color: #9baec8; font-size: 1.1rem;">Coming Soon! Break the bricks.</p>'; }
function createSpaceInvaders(panel) { panel.innerHTML = '<h3>👽 Space Invaders</h3><p style="margin-top: 40px; text-align: center; color: #9baec8; font-size: 1.1rem;">Coming Soon! Defend the galaxy.</p>'; }