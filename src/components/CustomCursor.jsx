import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    let mx = 0, my = 0, rx = 0, ry = 0;

    const handleMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };

    document.addEventListener('mousemove', handleMove);

    let raf;
    const loop = () => {
      if (dot) {
        dot.style.left = mx + 'px';
        dot.style.top = my + 'px';
      }
      rx += (mx - rx) * 0.11;
      ry += (my - ry) * 0.11;
      if (ring) {
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    const grow = () => {
      if (dot) { dot.style.width = '18px'; dot.style.height = '18px'; }
      if (ring) { ring.style.width = '56px'; ring.style.height = '56px'; }
    };
    const shrink = () => {
      if (dot) { dot.style.width = '9px'; dot.style.height = '9px'; }
      if (ring) { ring.style.width = '34px'; ring.style.height = '34px'; }
    };

    const interactives = document.querySelectorAll('a, button, .task-card, .perk, .file-zone');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', grow);
      el.addEventListener('mouseleave', shrink);
    });

    return () => {
      document.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(raf);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', grow);
        el.removeEventListener('mouseleave', shrink);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor-dot w-[9px] h-[9px] bg-orange rounded-full fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ transition: 'width 0.15s, height 0.15s' }}
      />
      <div
        ref={ringRef}
        className="custom-cursor-ring w-[34px] h-[34px] border border-orange/55 rounded-full fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
        style={{ transition: 'left 0.12s ease, top 0.12s ease, width 0.2s, height 0.2s' }}
      />
    </>
  );
}
