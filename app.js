:root {
  --bg-dark: #081120;
  --bg-panel: #101a2c;
  --panel-alt: #14233d;
  --primary: #7c9cff;
  --primary-strong: #5d7df7;
  --accent: #5fe3bf;
  --text: #ecf4ff;
  --muted: #9db0ca;
  --warning: #f7d66a;
  --danger: #ff6b6b;
  --card-shadow: 0 22px 48px rgba(5, 12, 27, 0.45);
}

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  min-height: 100%;
  font-family: "Inter", sans-serif;
  background: radial-gradient(circle at top, #102140 0%, #07111d 45%, #040b13 100%);
  color: var(--text);
}

body {
  min-height: 100vh;
  position: relative;
  display: grid;
  place-items: center;
}

button {
  font: inherit;
}

.creator-tag {
  position: fixed;
  top: 12px;
  right: 18px;
  z-index: 20;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: rgba(236, 244, 255, 0.9);
  text-shadow: 0 0 8px rgba(124, 156, 255, 0.35);
}

.page-shell {
  width: min(1200px, calc(100vw - 32px));
  min-height: 760px;
  display: grid;
  grid-template-columns: 280px 1fr;
  background: rgba(10, 18, 28, 0.8);
  border: 1px solid rgba(156, 176, 214, 0.15);
  border-radius: 28px;
  box-shadow: var(--card-shadow);
  overflow: hidden;
}

.sidebar {
  background: rgba(14, 24, 40, 0.9);
  border-right: 1px solid rgba(156, 176, 214, 0.1);
  padding: 28px 18px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 28px;
}

.brand-mark {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: #081120;
  box-shadow: 0 12px 24px rgba(93, 125, 247, 0.35);
}

.eyebrow {
  margin: 0;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.7rem;
  font-weight: 700;
}

.brand h1,
.topbar h2,
.panel-header h3 {
  margin: 0;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.nav-btn {
  width: 100%;
  border: 1px solid rgba(157, 176, 202, 0.12);
  border-radius: 14px;
  background: transparent;
  color: var(--text);
  text-align: left;
  padding: 14px 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;
}

.nav-btn:hover,
.nav-btn.active {
  background: linear-gradient(135deg, rgba(124, 156, 255, 0.18), rgba(95, 227, 191, 0.12));
  border-color: rgba(124, 156, 255, 0.5);
  transform: translateY(-1px);
}

.content {
  padding: 30px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 26px;
}

.topbar h2 {
  font-size: clamp(1.7rem, 2vw, 2.5rem);
}

.primary-button {
  border: none;
  border-radius: 12px;
  padding: 12px 18px;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: #07111d;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 16px 28px rgba(93, 125, 247, 0.25);
}

.game-panel {
  display: none;
  background: linear-gradient(180deg, rgba(20, 35, 61, 0.95), rgba(12, 21, 33, 0.97));
  border: 1px solid rgba(157, 176, 202, 0.12);
  border-radius: 24px;
  padding: 22px;
  min-height: 560px;
}

.game-panel.active {
  display: block;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.stats {
  display: flex;
  align-items: center;
  gap: 18px;
  color: var(--muted);
  font-size: 0.96rem;
}

#tic-status {
  color: var(--text);
  font-weight: 600;
}

.memory-board {
  display: grid;
  grid-template-columns: repeat(4, minmax(90px, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.memory-card {
  aspect-ratio: 1;
  border: none;
  border-radius: 18px;
  background: linear-gradient(135deg, var(--panel-alt), #1c2f4c);
  color: var(--text);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04);
}

.memory-card:hover {
  transform: translateY(-2px);
}

.memory-card.revealed,
.memory-card.matched {
  background: linear-gradient(135deg, rgba(124, 156, 255, 0.18), rgba(95, 227, 191, 0.14));
  box-shadow: inset 0 0 0 1px rgba(95, 227, 191, 0.85);
}

.memory-card.matched {
  cursor: default;
}

.ttt-board {
  width: min(420px, 90%);
  aspect-ratio: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 24px auto 0;
}

.ttt-cell {
  border: 1px solid rgba(157, 176, 202, 0.18);
  border-radius: 18px;
  background: rgba(17, 28, 45, 0.9);
  color: var(--text);
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  cursor: pointer;
}

.ttt-cell:hover {
  border-color: rgba(124, 156, 255, 0.7);
}

.rps-container {
  display: flex;
  flex-direction: column;
  gap: 28px;
  align-items: center;
  justify-content: center;
  min-height: 420px;
}

.rps-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 18px;
}

.rps-choice {
  border: none;
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(124, 156, 255, 0.2), rgba(95, 227, 191, 0.12));
  color: var(--text);
  padding: 18px 26px;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
}

.rps-result-box {
  text-align: center;
  background: rgba(9, 16, 24, 0.55);
  border: 1px solid rgba(157, 176, 202, 0.14);
  border-radius: 18px;
  padding: 26px 28px;
  width: min(480px, 100%);
}

.result-label {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 700;
  color: var(--muted);
  margin: 0 0 6px;
  font-size: 0.7rem;
}

.rps-result-box h4 {
  margin: 0;
  font-size: clamp(1.4rem, 3vw, 2rem);
}

@media (max-width: 860px) {
  .page-shell {
    grid-template-columns: 1fr;
  }

  .sidebar {
    border-right: none;
    border-bottom: 1px solid rgba(156, 176, 214, 0.1);
  }

  .nav {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .nav-btn {
    flex: 1 1 180px;
  }
}

@media (max-width: 540px) {
  .content {
    padding: 20px 16px 26px;
  }

  .topbar,
  .panel-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .memory-board {
    grid-template-columns: repeat(2, minmax(90px, 1fr));
  }
}
