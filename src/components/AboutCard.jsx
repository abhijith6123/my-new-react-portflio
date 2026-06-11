import React, { useRef, useState, useEffect, useCallback } from 'react';

const ROLES = [
  'UI / UX Designer',
  'Frontend Developer',
  'Figma Expert',
  'Blender 3D Artist',
  'Prototype Builder',
];

/* tiny floating dot */
const Dot = ({ x, y, size, opacity, speed }) => (
  <div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: `${x}%`, top: `${y}%`,
      width: size, height: size,
      background: 'rgba(92,51,204,0.6)',
      opacity,
      animation: `float-dot ${speed}s ease-in-out infinite`,
      animationDelay: `${Math.random() * 3}s`,
    }}
  />
);

export default function AboutCard() {
  const cardRef   = useRef(null);
  const spotRef   = useRef(null);
  const imgRef    = useRef(null);

  /* ── typewriter state ── */
  const [roleIdx,  setRoleIdx]  = useState(0);
  const [roleText, setRoleText] = useState('');
  const [typing,   setTyping]   = useState(true);

  /* ── mouse state (stored in ref to avoid re-renders) ── */
  const mouse = useRef({ px: 0.5, py: 0.5 });

  /* ── pre-generate dots ── */
  const dots = useRef(
    Array.from({ length: 14 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: `${Math.random() * 4 + 2}px`,
      opacity: Math.random() * 0.5 + 0.15,
      speed: 4 + Math.random() * 4,
    }))
  );

  /* ── typewriter effect ── */
  useEffect(() => {
    const full = ROLES[roleIdx];
    let i = 0;
    let del = false;
    setRoleText('');

    const tick = setInterval(() => {
      if (!del) {
        i++;
        setRoleText(full.slice(0, i));
        if (i === full.length) { del = true; clearInterval(tick); setTimeout(erase, 1600); }
      }
    }, 68);

    const erase = () => {
      let j = full.length;
      const delTick = setInterval(() => {
        j--;
        setRoleText(full.slice(0, j));
        if (j === 0) {
          clearInterval(delTick);
          setRoleIdx(r => (r + 1) % ROLES.length);
        }
      }, 40);
    };

    return () => clearInterval(tick);
  }, [roleIdx]);

  /* ── mouse move: parallax + spotlight ── */
  const onMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const px = (e.clientX - left) / width;
    const py = (e.clientY - top)  / height;
    mouse.current = { px, py };

    /* spotlight follows cursor */
    if (spotRef.current) {
      spotRef.current.style.left = `${px * 100}%`;
      spotRef.current.style.top  = `${py * 100}%`;
    }

    /* parallax: image drifts opposite direction */
    if (imgRef.current) {
      const dx = (px - 0.5) * -18;
      const dy = (py - 0.5) * -12;
      imgRef.current.style.transform = `scale(1.18) translate(${dx}px, ${dy}px)`;
    }
  }, []);

  const onLeave = useCallback(() => {
    if (spotRef.current) {
      spotRef.current.style.opacity = '0';
    }
    if (imgRef.current) {
      imgRef.current.style.transform = 'scale(1.18) translate(0px, 0px)';
    }
  }, []);

  const onEnter = useCallback(() => {
    if (spotRef.current) spotRef.current.style.opacity = '1';
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative w-full h-full overflow-hidden rounded-[inherit] cursor-crosshair"
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >

      <img
        ref={imgRef}
        src="assets/doodle_pic.png"
        alt="Profile"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: 0.95,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />

      {/* ── cursor torch / spotlight ── */}
      <div
        ref={spotRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: 260,
          height: 260,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(51,194,204,0.18) 0%, rgba(92,51,204,0.08) 50%, transparent 75%)',
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity .3s ease',
          zIndex: 2,
        }}
      />

      {/* ── floating dots ── */}
      {dots.current.map((d, i) => <Dot key={i} {...d} />)}

      {/* ── gradient veil at bottom ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(6,9,31,0.95) 0%, rgba(6,9,31,0.4) 50%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />

      {/* ── text content ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          padding: '20px 22px',
          zIndex: 10,
        }}
      >
        {/* greeting chip */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(92,51,204,0.2)',
            border: '1px solid rgba(92,51,204,0.4)',
            borderRadius: 999,
            padding: '2px 10px',
            marginBottom: 8,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#33c2cc', display: 'inline-block', boxShadow: '0 0 6px #33c2cc' }} />
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', color: '#33c2cc', textTransform: 'uppercase' }}>
            Available for work
          </span>
        </div>

        {/* name */}
        <p
          style={{
            fontSize: 'clamp(1.3rem, 3vw, 1.75rem)',
            fontWeight: 800,
            color: '#fff',
            lineHeight: 1.15,
            marginBottom: 6,
            letterSpacing: '-0.01em',
          }}
        >
          Hi, I&apos;m{' '}
          <span
            style={{
              background: 'linear-gradient(90deg, #33c2cc, #5c33cc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Abhijith
          </span>
        </p>

        {/* typewriter role */}
        <p
          style={{
            fontSize: 13,
            fontFamily: '"Courier New", monospace',
            color: 'rgba(255,255,255,0.65)',
            minHeight: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <span style={{ color: '#5c33cc', fontWeight: 700 }}>&gt;</span>
          {roleText}
          <span
            style={{
              display: 'inline-block',
              width: 2,
              height: 14,
              background: '#33c2cc',
              marginLeft: 1,
              animation: 'blink-cursor .75s step-end infinite',
            }}
          />
        </p>

        {/* stat pills */}
        <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
          {[
            { label: '6 mon ', sub: 'Experience' },
            { label: '10+',    sub: 'Projects' },
            { label: 'BLR',    sub: 'Based In' },
          ].map(s => (
            <div
              key={s.label}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                padding: '4px 10px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{s.label}</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float-dot {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
