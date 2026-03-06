// ========================================
// Space Invaders Game Engine
// ========================================

export interface Bullet {
  x: number;
  y: number;
  speed: number;
  width: number;
  height: number;
}

export interface Invader {
  x: number;
  y: number;
  width: number;
  height: number;
  alive: boolean;
  type: number; // 0, 1, 2 for different invader types
}

export interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

export interface GameState {
  player: Player;
  invaders: Invader[];
  playerBullets: Bullet[];
  invaderBullets: Bullet[];
  particles: Particle[];
  score: number;
  lives: number;
  level: number;
  status: "playing" | "gameover" | "win" | "paused";
  invaderDirection: number;
  invaderSpeed: number;
  lastInvaderShot: number;
  starField: { x: number; y: number; speed: number; brightness: number }[];
}

export const CANVAS_WIDTH = 640;
export const CANVAS_HEIGHT = 480;
const PLAYER_WIDTH = 40;
const PLAYER_HEIGHT = 20;
const INVADER_WIDTH = 30;
const INVADER_HEIGHT = 24;
const INVADER_ROWS = 5;
const INVADER_COLS = 8;
const INVADER_PADDING = 10;
const BULLET_WIDTH = 3;
const BULLET_HEIGHT = 10;
const PLAYER_BULLET_SPEED = -7;
const INVADER_BULLET_SPEED = 4;
const INVADER_SHOOT_INTERVAL = 1000;

export function createStarField(): GameState["starField"] {
  return Array.from({ length: 80 }, () => ({
    x: Math.random() * CANVAS_WIDTH,
    y: Math.random() * CANVAS_HEIGHT,
    speed: 0.2 + Math.random() * 0.5,
    brightness: 0.3 + Math.random() * 0.7,
  }));
}

export function createInitialState(level: number = 1): GameState {
  const invaders: Invader[] = [];
  const startX =
    (CANVAS_WIDTH - INVADER_COLS * (INVADER_WIDTH + INVADER_PADDING)) / 2;

  for (let row = 0; row < INVADER_ROWS; row++) {
    for (let col = 0; col < INVADER_COLS; col++) {
      invaders.push({
        x: startX + col * (INVADER_WIDTH + INVADER_PADDING),
        y: 50 + row * (INVADER_HEIGHT + INVADER_PADDING),
        width: INVADER_WIDTH,
        height: INVADER_HEIGHT,
        alive: true,
        type: row < 1 ? 2 : row < 3 ? 1 : 0,
      });
    }
  }

  return {
    player: {
      x: CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2,
      y: CANVAS_HEIGHT - 50,
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
      speed: 5,
    },
    invaders,
    playerBullets: [],
    invaderBullets: [],
    particles: [],
    score: 0,
    lives: 3,
    level,
    status: "playing",
    invaderDirection: 1,
    invaderSpeed: 0.5 + level * 0.3,
    lastInvaderShot: Date.now(),
    starField: createStarField(),
  };
}

export function createParticles(
  x: number,
  y: number,
  color: string,
  count: number = 8
): Particle[] {
  return Array.from({ length: count }, () => ({
    x,
    y,
    vx: (Math.random() - 0.5) * 4,
    vy: (Math.random() - 0.5) * 4,
    life: 1,
    maxLife: 20 + Math.random() * 20,
    color,
    size: 1 + Math.random() * 3,
  }));
}

export function updateGameState(
  state: GameState,
  keys: Set<string>,
  now: number
): GameState {
  if (state.status !== "playing") return state;

  const newState = { ...state };

  // Update star field
  newState.starField = state.starField.map((star) => ({
    ...star,
    y: (star.y + star.speed) % CANVAS_HEIGHT,
  }));

  // Move player
  if (keys.has("ArrowLeft") || keys.has("a")) {
    newState.player = {
      ...state.player,
      x: Math.max(0, state.player.x - state.player.speed),
    };
  }
  if (keys.has("ArrowRight") || keys.has("d")) {
    newState.player = {
      ...state.player,
      x: Math.min(
        CANVAS_WIDTH - state.player.width,
        state.player.x + state.player.speed
      ),
    };
  }

  // Move player bullets
  newState.playerBullets = state.playerBullets
    .map((b) => ({ ...b, y: b.y + b.speed }))
    .filter((b) => b.y > -b.height);

  // Move invader bullets
  newState.invaderBullets = state.invaderBullets
    .map((b) => ({ ...b, y: b.y + b.speed }))
    .filter((b) => b.y < CANVAS_HEIGHT);

  // Update particles
  newState.particles = state.particles
    .map((p) => ({
      ...p,
      x: p.x + p.vx,
      y: p.y + p.vy,
      life: p.life - 1 / p.maxLife,
    }))
    .filter((p) => p.life > 0);

  // Move invaders
  let shouldDescend = false;
  const aliveInvaders = state.invaders.filter((inv) => inv.alive);

  if (aliveInvaders.length > 0) {
    const minX = Math.min(...aliveInvaders.map((inv) => inv.x));
    const maxX = Math.max(...aliveInvaders.map((inv) => inv.x + inv.width));

    if (
      (state.invaderDirection > 0 && maxX >= CANVAS_WIDTH - 10) ||
      (state.invaderDirection < 0 && minX <= 10)
    ) {
      shouldDescend = true;
    }
  }

  newState.invaders = state.invaders.map((inv) => {
    if (!inv.alive) return inv;
    if (shouldDescend) {
      return { ...inv, y: inv.y + 15 };
    }
    return {
      ...inv,
      x: inv.x + state.invaderSpeed * state.invaderDirection,
    };
  });

  if (shouldDescend) {
    newState.invaderDirection = -state.invaderDirection;
  }

  // Invader shooting
  if (
    now - state.lastInvaderShot >
    INVADER_SHOOT_INTERVAL / (1 + state.level * 0.2)
  ) {
    const shooters = newState.invaders.filter((inv) => inv.alive);
    if (shooters.length > 0) {
      const shooter = shooters[Math.floor(Math.random() * shooters.length)];
      newState.invaderBullets = [
        ...newState.invaderBullets,
        {
          x: shooter.x + shooter.width / 2 - BULLET_WIDTH / 2,
          y: shooter.y + shooter.height,
          speed: INVADER_BULLET_SPEED,
          width: BULLET_WIDTH,
          height: BULLET_HEIGHT,
        },
      ];
      newState.lastInvaderShot = now;
    }
  }

  // Collision: player bullets vs invaders
  const remainingBullets: Bullet[] = [];
  const updatedInvaders = [...newState.invaders];
  let newParticles = [...newState.particles];
  let addedScore = 0;

  for (const bullet of newState.playerBullets) {
    let hit = false;
    for (let i = 0; i < updatedInvaders.length; i++) {
      const inv = updatedInvaders[i];
      if (!inv.alive) continue;
      if (
        bullet.x < inv.x + inv.width &&
        bullet.x + bullet.width > inv.x &&
        bullet.y < inv.y + inv.height &&
        bullet.y + bullet.height > inv.y
      ) {
        updatedInvaders[i] = { ...inv, alive: false };
        hit = true;
        addedScore += (inv.type + 1) * 10;
        const colors = ["#22d3ee", "#6366f1", "#f472b6"];
        newParticles = [
          ...newParticles,
          ...createParticles(
            inv.x + inv.width / 2,
            inv.y + inv.height / 2,
            colors[inv.type] || "#22d3ee"
          ),
        ];
        break;
      }
    }
    if (!hit) remainingBullets.push(bullet);
  }

  newState.playerBullets = remainingBullets;
  newState.invaders = updatedInvaders;
  newState.particles = newParticles;
  newState.score = state.score + addedScore;

  // Collision: invader bullets vs player
  const remainingInvBullets: Bullet[] = [];
  for (const bullet of newState.invaderBullets) {
    if (
      bullet.x < newState.player.x + newState.player.width &&
      bullet.x + bullet.width > newState.player.x &&
      bullet.y < newState.player.y + newState.player.height &&
      bullet.y + bullet.height > newState.player.y
    ) {
      newState.lives = state.lives - 1;
      newState.particles = [
        ...newState.particles,
        ...createParticles(
          newState.player.x + newState.player.width / 2,
          newState.player.y,
          "#ef4444",
          15
        ),
      ];
      if (newState.lives <= 0) {
        newState.status = "gameover";
      }
    } else {
      remainingInvBullets.push(bullet);
    }
  }
  newState.invaderBullets = remainingInvBullets;

  // Check invaders reaching player
  for (const inv of newState.invaders) {
    if (inv.alive && inv.y + inv.height >= newState.player.y) {
      newState.status = "gameover";
      break;
    }
  }

  // Check win
  if (newState.invaders.every((inv) => !inv.alive)) {
    newState.status = "win";
  }

  return newState;
}

export function playerShoot(state: GameState): GameState {
  if (state.status !== "playing") return state;
  if (state.playerBullets.length >= 3) return state;

  return {
    ...state,
    playerBullets: [
      ...state.playerBullets,
      {
        x: state.player.x + state.player.width / 2 - BULLET_WIDTH / 2,
        y: state.player.y,
        speed: PLAYER_BULLET_SPEED,
        width: BULLET_WIDTH,
        height: BULLET_HEIGHT,
      },
    ],
  };
}

// ========================================
// Rendering
// ========================================

function drawPattern(
  ctx: CanvasRenderingContext2D,
  pattern: number[][],
  x: number,
  y: number,
  pixelSize: number,
  color: string
) {
  ctx.fillStyle = color;
  for (let row = 0; row < pattern.length; row++) {
    for (let col = 0; col < pattern[row].length; col++) {
      if (pattern[row][col]) {
        ctx.fillRect(
          x + col * pixelSize,
          y + row * pixelSize,
          pixelSize,
          pixelSize
        );
      }
    }
  }
}

function drawInvader(
  ctx: CanvasRenderingContext2D,
  inv: Invader,
  time: number
) {
  if (!inv.alive) return;

  const colors = ["#22d3ee", "#a78bfa", "#f472b6"];
  const color = colors[inv.type] || "#22d3ee";

  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 6;

  const px = 3;
  const wobble = Math.sin(time / 300 + inv.x) * 1.5;

  if (inv.type === 0) {
    const pattern = [
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 0, 1, 1, 0, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
      [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
    ];
    drawPattern(ctx, pattern, inv.x, inv.y + wobble, px, color);
  } else if (inv.type === 1) {
    const pattern = [
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 0, 1, 1, 0, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 1, 0, 0, 1, 0, 0],
      [0, 1, 0, 1, 1, 0, 1, 0],
      [1, 0, 1, 0, 0, 1, 0, 1],
    ];
    drawPattern(ctx, pattern, inv.x, inv.y + wobble, px, color);
  } else {
    const pattern = [
      [0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 0, 1, 0, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 1, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 1, 0],
    ];
    drawPattern(ctx, pattern, inv.x, inv.y + wobble, px, color);
  }

  ctx.shadowBlur = 0;
}

function drawPlayer(ctx: CanvasRenderingContext2D, player: Player) {
  ctx.fillStyle = "#22d3ee";
  ctx.shadowColor = "#22d3ee";
  ctx.shadowBlur = 8;

  ctx.beginPath();
  ctx.moveTo(player.x + player.width / 2, player.y);
  ctx.lineTo(player.x + player.width, player.y + player.height);
  ctx.lineTo(player.x, player.y + player.height);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#0f172a";
  ctx.beginPath();
  ctx.moveTo(player.x + player.width / 2, player.y + 6);
  ctx.lineTo(player.x + player.width / 2 + 5, player.y + player.height - 4);
  ctx.lineTo(player.x + player.width / 2 - 5, player.y + player.height - 4);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#6366f1";
  ctx.shadowColor = "#6366f1";
  ctx.shadowBlur = 12;
  ctx.fillRect(
    player.x + player.width / 2 - 4,
    player.y + player.height,
    8,
    3 + Math.random() * 3
  );

  ctx.shadowBlur = 0;
}

function drawUI(ctx: CanvasRenderingContext2D, state: GameState) {
  ctx.fillStyle = "#ffffff";
  ctx.font = '16px "JetBrains Mono", monospace';
  ctx.textAlign = "left";
  ctx.fillText(
    `SCORE: ${String(state.score).padStart(6, "0")}`,
    15,
    25
  );

  ctx.textAlign = "right";
  ctx.fillText(
    `LIVES: ${"♥".repeat(state.lives)}`,
    CANVAS_WIDTH - 15,
    25
  );

  ctx.textAlign = "center";
  ctx.fillText(`LEVEL ${state.level}`, CANVAS_WIDTH / 2, 25);

  if (state.status === "gameover") {
    ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.fillStyle = "#ef4444";
    ctx.font = 'bold 36px "JetBrains Mono", monospace';
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 20);

    ctx.fillStyle = "#94a3b8";
    ctx.font = '16px "JetBrains Mono", monospace';
    ctx.fillText(
      `FINAL SCORE: ${state.score}`,
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2 + 20
    );
    ctx.fillText(
      "Press ENTER to restart",
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2 + 50
    );
  }

  if (state.status === "win") {
    ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.fillStyle = "#22d3ee";
    ctx.font = 'bold 36px "JetBrains Mono", monospace';
    ctx.textAlign = "center";
    ctx.fillText("LEVEL CLEAR!", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 20);

    ctx.fillStyle = "#94a3b8";
    ctx.font = '16px "JetBrains Mono", monospace';
    ctx.fillText(
      `SCORE: ${state.score}`,
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2 + 20
    );
    ctx.fillText(
      "Press ENTER for next level",
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2 + 50
    );
  }
}

export function render(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  time: number
) {
  ctx.fillStyle = "#0f172a";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  for (const star of state.starField) {
    ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness * 0.5})`;
    ctx.fillRect(star.x, star.y, 1, 1);
  }

  for (const inv of state.invaders) {
    drawInvader(ctx, inv, time);
  }

  if (state.status !== "gameover") {
    drawPlayer(ctx, state.player);
  }

  ctx.fillStyle = "#22d3ee";
  ctx.shadowColor = "#22d3ee";
  ctx.shadowBlur = 6;
  for (const bullet of state.playerBullets) {
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
  }

  ctx.fillStyle = "#f472b6";
  ctx.shadowColor = "#f472b6";
  ctx.shadowBlur = 6;
  for (const bullet of state.invaderBullets) {
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
  }

  ctx.shadowBlur = 0;

  for (const particle of state.particles) {
    ctx.globalAlpha = particle.life;
    ctx.fillStyle = particle.color;
    ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
  }
  ctx.globalAlpha = 1;

  drawUI(ctx, state);
}
