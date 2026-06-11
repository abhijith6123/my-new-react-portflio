import React, { useRef, useEffect, useState, useCallback } from 'react';

/* ────────────────────────────────────────────────────────
   Mini Mario-style side-scroller
   - Endless floor, moving obstacles, coins, score
   - Space / click / tap to jump (double-jump supported)
──────────────────────────────────────────────────────── */

const GRAVITY   = 0.55;
const JUMP_V    = -11.5;
const SPEED_INC = 0.0012; // how fast the world speeds up

export default function MarioGame() {
  const canvasRef = useRef(null);
  const stateRef  = useRef(null); // mutable game state (no re-render needed)
  const rafRef    = useRef(null);
  const [phase, setPhase]   = useState('idle');    // idle | playing | dead
  const [score, setScore]   = useState(0);
  const [best,  setBest]    = useState(0);

  /* ── palette ── */
  const C = {
    sky     : '#06091f',
    ground  : '#1f1e39',
    groundT : '#5c33cc',
    player  : '#33c2cc',
    playerB : '#5c33cc',
    eye     : '#fff',
    obstacle: '#ca2f8c',
    obstacleT:'#ff6eb5',
    coin    : '#febc2e',
    star    : 'rgba(255,255,255,0.15)',
    text    : '#ffffff',
    score   : '#33c2cc',
  };

  /* ── init game state ── */
  const initState = useCallback((canvas) => {
    const W = canvas.width;
    const H = canvas.height;
    const groundY = H * 0.75;

    // pre-generate stars
    const stars = Array.from({ length: 40 }, () => ({
      x: Math.random() * W,
      y: Math.random() * groundY * 0.9,
      r: Math.random() * 1.5 + 0.5,
      t: Math.random() * Math.PI * 2,
    }));

    return {
      W, H, groundY,
      speed   : 4.5,
      frame   : 0,
      score   : 0,
      stars,

      player: {
        x: W * 0.15,
        y: groundY - 36,
        w: 28, h: 36,
        vy: 0,
        jumpsLeft: 2,
        legPhase: 0,
      },

      obstacles: [],
      coins    : [],
      particles: [],
      obstacleTimer: 80,
      coinTimer    : 50,
    };
  }, []);

  /* ── jump ── */
  const doJump = useCallback(() => {
    if (!stateRef.current) return;
    const { player } = stateRef.current;
    if (player.jumpsLeft > 0) {
      player.vy = JUMP_V;
      player.jumpsLeft--;
      // particle burst
      for (let i = 0; i < 6; i++) {
        stateRef.current.particles.push({
          x: player.x + player.w / 2,
          y: player.y + player.h,
          vx: (Math.random() - 0.5) * 3,
          vy: Math.random() * -2 - 1,
          life: 1, color: C.playerB,
        });
      }
    }
  }, []);

  /* ── start ── */
  const startGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    stateRef.current = initState(canvas);
    setScore(0);
    setPhase('playing');
  }, [initState]);

  /* ── input ── */
  useEffect(() => {
    const onKey = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        if (phase === 'playing') doJump();
        else if (phase === 'idle' || phase === 'dead') startGame();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, doJump, startGame]);

  /* ── draw helpers ── */
  const drawPlayer = (ctx, p) => {
    // body
    ctx.fillStyle = C.player;
    ctx.beginPath();
    ctx.roundRect(p.x, p.y, p.w, p.h * 0.65, 6);
    ctx.fill();

    // hat
    ctx.fillStyle = C.playerB;
    ctx.beginPath();
    ctx.roundRect(p.x - 2, p.y - 10, p.w + 4, 10, [4, 4, 0, 0]);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(p.x - 6, p.y - 14, p.w + 12, 5, 3);
    ctx.fill();

    // eye
    ctx.fillStyle = C.eye;
    ctx.beginPath();
    ctx.arc(p.x + p.w - 7, p.y + 8, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(p.x + p.w - 6, p.y + 8, 2, 0, Math.PI * 2);
    ctx.fill();

    // legs (animated)
    const lp = p.legPhase;
    ctx.fillStyle = C.playerB;
    const legH = p.h * 0.38;
    const legW = 8;
    const legY = p.y + p.h * 0.6;
    // left leg
    ctx.beginPath();
    ctx.roundRect(
      p.x + 3,
      legY + Math.sin(lp) * 4,
      legW, legH - Math.abs(Math.sin(lp)) * 4,
      3
    );
    ctx.fill();
    // right leg
    ctx.beginPath();
    ctx.roundRect(
      p.x + p.w - legW - 3,
      legY - Math.sin(lp) * 4,
      legW, legH - Math.abs(Math.sin(lp)) * 4,
      3
    );
    ctx.fill();
  };

  const drawObstacle = (ctx, o) => {
    // pipe body
    ctx.fillStyle = C.obstacle;
    ctx.beginPath();
    ctx.roundRect(o.x + 4, o.y, o.w - 8, o.h, 4);
    ctx.fill();
    // pipe cap
    ctx.fillStyle = C.obstacleT;
    ctx.beginPath();
    ctx.roundRect(o.x, o.y, o.w, 18, [4, 4, 0, 0]);
    ctx.fill();
  };

  const drawCoin = (ctx, c) => {
    ctx.save();
    ctx.translate(c.x, c.y);
    // spin effect: squish x
    const scaleX = Math.abs(Math.cos(c.spin));
    ctx.scale(scaleX, 1);
    ctx.fillStyle = C.coin;
    ctx.shadowColor = C.coin;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();
  };

  /* ── main loop ── */
  useEffect(() => {
    if (phase !== 'playing') return;

    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');

    const loop = () => {
      const s = stateRef.current;
      if (!s) return;

      s.frame++;
      s.speed += SPEED_INC;
      s.score  = Math.floor(s.frame / 6);

      const { W, H, groundY, player } = s;

      /* ── update player ── */
      player.vy += GRAVITY;
      player.y  += player.vy;
      if (player.y >= groundY - player.h) {
        player.y = groundY - player.h;
        player.vy = 0;
        player.jumpsLeft = 2;
      }
      // leg animation only when on ground
      if (player.y >= groundY - player.h - 1) {
        player.legPhase += s.speed * 0.12;
      }

      /* ── spawn obstacles ── */
      s.obstacleTimer--;
      if (s.obstacleTimer <= 0) {
        const h = 35 + Math.random() * 45;
        s.obstacles.push({ x: W + 10, y: groundY - h, w: 28, h });
        s.obstacleTimer = 60 + Math.random() * 60;
      }

      /* ── spawn coins ── */
      s.coinTimer--;
      if (s.coinTimer <= 0) {
        s.coins.push({
          x: W + 10,
          y: groundY - 60 - Math.random() * 60,
          spin: 0,
          collected: false,
        });
        s.coinTimer = 45 + Math.random() * 45;
      }

      /* ── move + collide ── */
      const px = player.x, py = player.y, pw = player.w, ph = player.h;

      s.obstacles = s.obstacles.filter(o => {
        o.x -= s.speed;
        // AABB with small margin
        if (
          px + pw - 4 > o.x + 4 &&
          px + 4       < o.x + o.w - 4 &&
          py + ph      > o.y + 4 &&
          py           < o.y + o.h
        ) {
          // dead
          setPhase('dead');
          setBest(prev => Math.max(prev, s.score));
          setScore(s.score);
        }
        return o.x + o.w > 0;
      });

      s.coins = s.coins.filter(c => {
        c.x    -= s.speed;
        c.spin += 0.08;
        // collect
        if (!c.collected &&
          px + pw > c.x - 8 && px < c.x + 8 &&
          py + ph > c.y - 8 && py < c.y + 8
        ) {
          c.collected = true;
          s.score += 5;
          for (let i = 0; i < 8; i++) {
            s.particles.push({
              x: c.x, y: c.y,
              vx: (Math.random() - 0.5) * 4,
              vy: Math.random() * -4 - 1,
              life: 1, color: C.coin,
            });
          }
        }
        return c.x + 10 > 0 && !c.collected;
      });

      s.particles = s.particles.filter(p => {
        p.x += p.vx; p.y += p.vy; p.life -= 0.04; p.vy += 0.15;
        return p.life > 0;
      });

      /* ── update score display ── */
      if (s.frame % 8 === 0) setScore(s.score);

      /* ── DRAW ── */
      ctx.clearRect(0, 0, W, H);

      // sky
      ctx.fillStyle = C.sky;
      ctx.fillRect(0, 0, W, H);

      // stars twinkle
      s.stars.forEach(st => {
        st.t += 0.03;
        ctx.globalAlpha = 0.4 + 0.6 * Math.abs(Math.sin(st.t));
        ctx.fillStyle = C.star;
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // ground
      ctx.fillStyle = C.ground;
      ctx.fillRect(0, groundY, W, H - groundY);
      // ground top stripe
      ctx.fillStyle = C.groundT;
      ctx.fillRect(0, groundY, W, 4);
      // ground pattern
      for (let gx = (s.frame * s.speed * 0.5) % 40; gx < W; gx += 40) {
        ctx.fillStyle = 'rgba(255,255,255,0.03)';
        ctx.fillRect(gx, groundY + 4, 20, H - groundY - 4);
      }

      // coins
      s.coins.forEach(c => drawCoin(ctx, c));

      // obstacles
      s.obstacles.forEach(o => drawObstacle(ctx, o));

      // player
      drawPlayer(ctx, player);

      // particles
      s.particles.forEach(p => {
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // score HUD
      ctx.font = 'bold 13px monospace';
      ctx.fillStyle = C.score;
      ctx.fillText(`SCORE  ${s.score}`, 12, 22);

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase]);

  /* ── idle / dead screen drawn once ── */
  useEffect(() => {
    if (phase === 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const groundY = H * 0.75;

    ctx.fillStyle = C.sky;
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = C.ground;
    ctx.fillRect(0, groundY, W, H - groundY);
    ctx.fillStyle = C.groundT;
    ctx.fillRect(0, groundY, W, 4);

    // static player
    drawPlayer(ctx, { x: W * 0.15, y: groundY - 36, w: 28, h: 36, legPhase: 0 });

    if (phase === 'dead') {
      // ── full dark overlay ──
      ctx.fillStyle = 'rgba(3,4,18,0.82)';
      ctx.fillRect(0, 0, W, H);

      /* ── glowing headline: HIRE THIS GUY! ── */
      ctx.save();
      ctx.textAlign = 'center';

      // glow pass
      ctx.shadowColor = '#33c2cc';
      ctx.shadowBlur  = 18;
      ctx.font = 'bold 22px "Courier New", monospace';
      ctx.fillStyle = '#33c2cc';
      ctx.fillText('✦  HIRE THIS GUY!  ✦', W / 2, 30);
      ctx.shadowBlur = 0;

      // score line
      ctx.font = '10px monospace';
      ctx.fillStyle = 'rgba(255,255,255,0.45)';
      ctx.fillText(`Score ${score}  ·  Best ${best}`, W / 2, 46);

      ctx.restore();

      /* ── skill badges ── */
      const skills = [
        { label: 'UI / UX',      bg: '#5c33cc', fg: '#fff' },
        { label: 'Figma',        bg: '#ca2f8c', fg: '#fff' },
        { label: 'React',        bg: '#33c2cc', fg: '#06091f' },
        { label: 'HTML · CSS',   bg: '#cc6033', fg: '#fff' },
        { label: 'JavaScript',   bg: '#febc2e', fg: '#06091f' },
        { label: 'Blender 3D',   bg: '#57db96', fg: '#06091f' },
        { label: 'Prototyping',  bg: '#7a57db', fg: '#fff' },
        { label: 'Python',       bg: '#33c2cc', fg: '#06091f' },
      ];

      const padX = 10, padY = 5, gap = 6;
      ctx.font = 'bold 10px "Courier New", monospace';

      // measure and wrap into rows
      const rows = [[]];
      let rowW = 0;
      const maxRowW = W - 24;

      skills.forEach(sk => {
        const tw = ctx.measureText(sk.label).width + padX * 2;
        if (rowW + tw + gap > maxRowW && rows[rows.length - 1].length > 0) {
          rows.push([]);
          rowW = 0;
        }
        rows[rows.length - 1].push({ ...sk, tw });
        rowW += tw + gap;
      });

      const badgeH = 18;
      const totalBadgeH = rows.length * (badgeH + gap);
      let startY = 62;

      rows.forEach(row => {
        const rowTotal = row.reduce((sum, b) => sum + b.tw + gap, -gap);
        let bx = (W - rowTotal) / 2;

        row.forEach(badge => {
          // pill bg
          ctx.fillStyle = badge.bg;
          ctx.beginPath();
          ctx.roundRect(bx, startY, badge.tw, badgeH, badgeH / 2);
          ctx.fill();

          // label
          ctx.fillStyle = badge.fg;
          ctx.textAlign = 'left';
          ctx.fillText(badge.label, bx + padX, startY + padY + 7);

          bx += badge.tw + gap;
        });
        startY += badgeH + gap;
      });

      /* ── CTA line ── */
      const ctaY = startY + 10;
      ctx.textAlign = 'center';

      // pill background for CTA
      ctx.fillStyle = 'rgba(92,51,204,0.35)';
      ctx.beginPath();
      ctx.roundRect(W / 2 - 110, ctaY - 13, 220, 20, 10);
      ctx.fill();
      ctx.strokeStyle = 'rgba(92,51,204,0.7)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.font = '10px monospace';
      ctx.fillStyle = 'rgba(255,255,255,0.65)';
      ctx.fillText('Click or Space  →  play again', W / 2, ctaY + 1);

      ctx.textAlign = 'left';
    } else {
      ctx.textAlign = 'center';
      ctx.font = 'bold 16px monospace';
      ctx.fillStyle = '#fff';
      ctx.fillText('MINI MARIO', W / 2, H * 0.28);
      ctx.font = '11px monospace';
      ctx.fillStyle = 'rgba(255,255,255,0.45)';
      ctx.fillText('Click or press Space to play', W / 2, H * 0.42);
      ctx.textAlign = 'left';
    }
  }, [phase, score, best]);

  const handleClick = () => {
    if (phase === 'playing') doJump();
    else startGame();
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-2 select-none">
      {/* tiny score bar above canvas */}
      {phase === 'playing' && (
        <div className="absolute top-2 right-3 text-[10px] font-mono text-aqua z-10 pointer-events-none">
          {score}
        </div>
      )}
      <canvas
        ref={canvasRef}
        width={420}
        height={210}
        onClick={handleClick}
        className="rounded-xl cursor-pointer"
        style={{
          maxWidth: '100%',
          imageRendering: 'pixelated',
          border: '1px solid rgba(92,51,204,0.3)',
          boxShadow: phase === 'playing'
            ? '0 0 24px rgba(92,51,204,0.35)'
            : '0 0 12px rgba(92,51,204,0.15)',
          transition: 'box-shadow .4s ease',
        }}
      />
      {phase !== 'playing' && (
        <p className="text-[10px] text-neutral-500 font-mono">
          SPACE / CLICK = jump &nbsp;·&nbsp; double jump supported
        </p>
      )}
    </div>
  );
}
