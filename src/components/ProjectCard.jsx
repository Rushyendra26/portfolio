import { useEffect } from "react";
import { ACCENT, ACCENT_RGB, CARD, LINE, MUTED } from "../constants/theme";
import { GlowCard } from "./GlowCard";

export function ProjectCard({ index, title, desc, stack, onOpen }) {
  return (
    <GlowCard
      as="div"
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen()}
      className="group block p-7 cursor-pointer active:scale-[0.97] transition-transform duration-150"
    >
      <div className="flex items-start justify-between mb-4">
        <span className="font-mono text-xs" style={{ color: MUTED }}>{index}</span>
        <span
          className="transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          style={{ color: MUTED }}
        >
          ↗
        </span>
      </div>
      <h3 className="font-display text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-[15px] leading-relaxed mb-5" style={{ color: "#cbd5e1" }}>{desc}</p>
      <div className="text-xs font-mono" style={{ color: MUTED }}>{stack}</div>
    </GlowCard>
  );
}

export function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9990] flex items-center justify-center p-6 modal-fade-bg"
      style={{ backgroundColor: "rgba(11,10,18,0.78)" }}
      onClick={onClose}
    >
      <div
        className="modal-pop relative w-full max-w-lg rounded-2xl border p-8"
        style={{
          borderColor: ACCENT,
          backgroundColor: CARD,
          boxShadow: `0 0 0 1px rgba(${ACCENT_RGB},0.3), 0 30px 80px -20px rgba(${ACCENT_RGB},0.5)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          data-cursor-hover
          className="absolute top-5 right-5 w-8 h-8 rounded-full border flex items-center justify-center text-sm"
          style={{ borderColor: LINE, color: MUTED }}
        >
          ✕
        </button>
        <div className="font-mono text-xs mb-3" style={{ color: ACCENT }}>{project.index}</div>
        <h3 className="font-display text-2xl font-semibold text-white mb-4">{project.title}</h3>
        <p className="text-[15px] leading-relaxed mb-6" style={{ color: "#d7d4e8" }}>{project.desc}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {project.stack.split(" · ").map((s) => (
            <span
              key={s}
              className="text-xs font-mono px-3 py-1.5 rounded-full border"
              style={{ borderColor: LINE, color: "#e2e0f5" }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        .modal-fade-bg { animation: modalBgIn 0.25s ease-out; }
        .modal-pop { animation: modalPop 0.32s cubic-bezier(0.34, 1.56, 0.64, 1); }
        @keyframes modalBgIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalPop { from { opacity: 0; transform: scale(0.85) translateY(12px); } to { opacity: 1; transform: scale(1) translateY(0); } }
      `}</style>
    </div>
  );
}
