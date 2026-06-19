import { useEffect, useRef } from "react";
import { ACCENT, ACCENT_RGB } from "../constants/theme";

export function CustomCursor() {
  const glowRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", move);

    let raf;
    const animate = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.22;
      cur.current.y += (pos.current.y - cur.current.y) * 0.22;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${cur.current.x}px, ${cur.current.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[9999] hidden md:block"
      style={{
        background: ACCENT,
        boxShadow: `0 0 12px 4px rgba(${ACCENT_RGB},0.9), 0 0 36px 14px rgba(${ACCENT_RGB},0.45), 0 0 70px 28px rgba(${ACCENT_RGB},0.2)`,
      }}
    />
  );
}
