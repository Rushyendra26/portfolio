import { ACCENT, LINE, MUTED } from "../constants/theme";
import { GlowCard } from "./GlowCard";

export function ExpItem({ role, date, org, desc, last = false }) {
  return (
    <div className="grid grid-cols-[20px_1fr] gap-5 relative pb-12 last:pb-0">
      <div className="relative flex justify-center">
        {!last && (
          <div className="absolute top-4 bottom-[-48px] w-px" style={{ backgroundColor: LINE }} />
        )}
        <div
          className="w-2.5 h-2.5 rounded-full mt-2 z-10"
          style={{ backgroundColor: ACCENT, boxShadow: `0 0 12px ${ACCENT}` }}
        />
      </div>
      <GlowCard className="px-6 py-5 mb-0" as="div">
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
          <h3 className="font-display font-semibold text-lg text-white">{role}</h3>
          <span className="font-mono text-xs" style={{ color: ACCENT }}>{date}</span>
        </div>
        <div className="text-sm mb-3" style={{ color: MUTED }}>{org}</div>
        <p className="text-[15px] leading-relaxed" style={{ color: "#cbd5e1" }}>{desc}</p>
      </GlowCard>
    </div>
  );
}

export function SkillGroup({ title, chips }) {
  return (
    <GlowCard className="p-6">
      <h4 className="text-xs uppercase tracking-widest mb-4" style={{ color: MUTED }}>{title}</h4>
      <div className="flex flex-wrap gap-2">
        {chips.map((c) => (
          <span
            key={c}
            className="text-xs font-mono px-3 py-1.5 rounded-full border"
            style={{ borderColor: LINE, color: "#e2e8f0" }}
          >
            {c}
          </span>
        ))}
      </div>
    </GlowCard>
  );
}
