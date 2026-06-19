import { useRef } from "react";
import { ACCENT, ACCENT_RGB, LINE, CARD } from "../constants/theme";

export function GlowCard({ as: Tag = "div", className = "", style = {}, children, ...rest }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMove}
      data-cursor-hover
      className={`glow-card relative overflow-hidden border rounded-2xl transition-colors duration-300 ${className}`}
      style={{ borderColor: LINE, backgroundColor: CARD, ...style }}
      {...rest}
    >
      <div
        className="glow-spot pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(220px circle at var(--mx,50%) var(--my,50%), rgba(${ACCENT_RGB},0.16), transparent 70%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
      <style>{`
        .glow-card:hover { border-color: ${ACCENT}; box-shadow: 0 0 0 1px rgba(${ACCENT_RGB},0.25), 0 8px 30px -8px rgba(${ACCENT_RGB},0.35); }
        .glow-card:hover .glow-spot { opacity: 1; }
      `}</style>
    </Tag>
  );
}
