import { ACCENT, BG, LINE, MUTED } from "../constants/theme";

export function SectionHeading({ index, title }) {
  return (
    <div className="flex items-center gap-3 mb-12">
      <span className="font-mono text-xs" style={{ color: ACCENT }}>{index}</span>
      <span className="h-px flex-1 max-w-[40px]" style={{ backgroundColor: LINE }} />
      <h2 className="font-display font-semibold text-2xl sm:text-3xl text-white">{title}</h2>
    </div>
  );
}

export function NavLink({ href, children }) {
  return (
    <a
      href={href}
      data-cursor-hover
      className="text-sm transition-colors duration-200 hover:text-white"
      style={{ color: MUTED }}
    >
      {children}
    </a>
  );
}

export function Btn({ href, children, solid = false, ...rest }) {
  return (
    <a
      href={href}
      {...rest}
      data-cursor-hover
      className="inline-flex items-center gap-2 text-sm font-medium px-5 py-3 rounded-full transition-all duration-200 border"
      style={
        solid
          ? { backgroundColor: ACCENT, color: BG, borderColor: ACCENT }
          : { backgroundColor: "transparent", color: "#fff", borderColor: LINE }
      }
      onMouseEnter={(e) => {
        if (!solid) {
          e.currentTarget.style.borderColor = ACCENT;
          e.currentTarget.style.color = ACCENT;
        } else {
          e.currentTarget.style.opacity = "0.9";
        }
      }}
      onMouseLeave={(e) => {
        if (!solid) {
          e.currentTarget.style.borderColor = LINE;
          e.currentTarget.style.color = "#fff";
        } else {
          e.currentTarget.style.opacity = "1";
        }
      }}
    >
      {children}
    </a>
  );
}

export function SpecRow({ label, value, ok = false }) {
  return (
    <div className="flex justify-between text-sm py-3 border-b last:border-none" style={{ borderColor: LINE }}>
      <span style={{ color: MUTED }}>{label}</span>
      <span style={{ color: ok ? ACCENT : "#fff" }}>{value}</span>
    </div>
  );
}

export function Cert({ children }) {
  return (
    <div
      className="flex items-center gap-3 px-5 py-4 text-[15px] border rounded-2xl"
      style={{ color: "#e2e8f0", borderColor: LINE }}
    >
      <span style={{ color: ACCENT }}>✓</span> {children}
    </div>
  );
}
