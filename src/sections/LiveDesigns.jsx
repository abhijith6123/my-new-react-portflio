import React, { useRef, useState, useEffect, useCallback } from 'react';
import { liveDesigns } from '../constants';
import { useScrollReveal } from '../hooks/useScrollReveal';

/* ─── Section-wide spotlight that follows the mouse ─── */
const SectionSpotlight = ({ containerRef }) => {
  const spotRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !spotRef.current) return;

    // start offscreen
    spotRef.current.style.left = '-9999px';
    spotRef.current.style.top  = '-9999px';

    const move = (e) => {
      const { left, top } = container.getBoundingClientRect();
      spotRef.current.style.left = `${e.clientX - left}px`;
      spotRef.current.style.top  = `${e.clientY - top}px`;
    };

    container.addEventListener('mousemove', move);
    return () => container.removeEventListener('mousemove', move);
  }, [containerRef]);

  return <div ref={spotRef} className="ld-spotlight" aria-hidden="true" />;
};

/* ─── Single card with 3-D tilt + inner glow ─── */
const Card = ({ design, index, isVisible }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const [tilt, setTilt]     = useState({ rx: 0, ry: 0 });
  const [active, setActive] = useState(false);

  const onMove = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const px = (e.clientX - left) / width;
    const py = (e.clientY - top)  / height;
    setTilt({
      rx: (py - 0.5) * -12,
      ry: (px - 0.5) *  12,
    });
    if (glowRef.current) {
      glowRef.current.style.left = `${px * 100}%`;
      glowRef.current.style.top  = `${py * 100}%`;
    }
  }, []);

  const onEnter = useCallback(() => setActive(true),  []);
  const onLeave = useCallback(() => { setTilt({ rx: 0, ry: 0 }); setActive(false); }, []);

  const delay = index * 90;

  return (
    <div
      className="ld-card-wrap"
      style={{
        opacity   : isVisible ? 1 : 0,
        transform : isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity .6s cubic-bezier(.4,0,.2,1) ${delay}ms, transform .6s cubic-bezier(.4,0,.2,1) ${delay}ms`,
      }}
    >
      <a
        ref={cardRef}
        href={design.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`ld-card${active ? ' ld-card-active' : ''}`}
        style={{
          transform : `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${active ? 1.025 : 1})`,
          transition: active
            ? 'transform .07s linear, box-shadow .3s ease, border-color .3s ease'
            : 'transform .5s cubic-bezier(.25,.46,.45,.94), box-shadow .5s ease, border-color .5s ease',
        }}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {/* cursor inner glow */}
        <div
          ref={glowRef}
          className={`ld-inner-glow${active ? ' ld-inner-glow-on' : ''}`}
        />

        {/* project number */}
        <div className={`ld-num${active ? ' ld-num-on' : ''}`}>
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* screenshot */}
        <div className="ld-thumb">
          <img
            src={design.image}
            alt={design.title}
            className="ld-img"
            style={{
              transform : active ? 'scale(1.07)' : 'scale(1)',
              transition: 'transform .55s cubic-bezier(.25,.46,.45,.94)',
            }}
          />
          {/* shimmer */}
          <div className={`ld-shimmer${active ? ' ld-shimmer-on' : ''}`} />
          {/* visit pill */}
          <div className={`ld-visit${active ? ' ld-visit-on' : ''}`}>
            ↗&nbsp;&nbsp;Visit live
          </div>
        </div>

        {/* footer */}
        <div className="ld-footer">
          <span className={`ld-name${active ? ' ld-name-on' : ''}`}>
            {design.title}
          </span>
          <span className={`ld-arrow${active ? ' ld-arrow-on' : ''}`}>↗</span>
        </div>
      </a>
    </div>
  );
};

/* ─── Section ─── */
const LiveDesigns = () => {
  const [scrollRef, isVisible] = useScrollReveal({ threshold: 0.08, once: true });
  const wrapRef = useRef(null);

  // Attach both refs to the same DOM node cleanly
  const mergeRef = useCallback((el) => {
    wrapRef.current = el;
    // directly write to the ref object the hook created
    if (scrollRef && typeof scrollRef === 'object') {
      scrollRef.current = el;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section id="livedesigns" className="c-space mt-16 mb-16">
      <div
        ref={mergeRef}
        className={`ld-section-wrap transition-opacity duration-700 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* spotlight */}
        <SectionSpotlight containerRef={wrapRef} />

        {/* heading */}
        <div className="flex items-center gap-4 mb-10 relative z-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-aqua mb-1">
              Portfolio
            </p>
            <h2 className="text-heading">My Live Projects</h2>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ml-4" />
        </div>

        {/* marquee */}
        <div className="ld-marquee-wrapper">
          <div className="ld-marquee-group">
            {liveDesigns.map((design, i) => (
              <Card key={`marquee-1-${design.id}`} design={design} index={i} isVisible={isVisible} />
            ))}
          </div>
          {/* Duplicate for seamless infinite loop */}
          <div className="ld-marquee-group" aria-hidden="true">
            {liveDesigns.map((design, i) => (
              <Card key={`marquee-2-${design.id}`} design={design} index={i} isVisible={isVisible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDesigns;
