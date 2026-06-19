import { useEffect, useState } from "react";
import { ACCENT, LINE, MUTED } from "../constants/theme";
import { CODE_LINES } from "../data";
import { GlowCard } from "./GlowCard";

export function TerminalTyping() {
  const [lines, setLines] = useState([""]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let li = 0;
    let ci = 0;
    let cancelled = false;

    function step() {
      if (cancelled) return;
      if (li >= CODE_LINES.length) {
        setDone(true);
        return;
      }
      const full = "  ".repeat(CODE_LINES[li].indent) + CODE_LINES[li].text;
      ci += 1;
      setLines((prev) => {
        const next = [...prev];
        next[li] = full.slice(0, ci);
        return next;
      });
      if (ci >= full.length) {
        li += 1;
        ci = 0;
        setLines((prev) => [...prev, ""]);
        setTimeout(step, 160);
      } else {
        setTimeout(step, 18 + Math.random() * 22);
      }
    }
    const start = setTimeout(step, 400);
    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, []);

  return (
    <GlowCard className="overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: LINE }}>
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#E2554E" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#E5B85C" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#54C26B" }} />
        <span className="ml-2 text-xs font-mono" style={{ color: MUTED }}>profile.js</span>
      </div>
      <pre className="px-5 py-5 text-[13.5px] leading-relaxed font-mono overflow-x-auto">
        {lines.map((l, i) => (
          <div key={i}>
            <span style={{ color: "#7FB3E8" }}>{l}</span>
            {i === lines.length - 1 && !done && (
              <span
                className="inline-block w-[7px] h-[15px] align-middle ml-0.5 animate-pulse"
                style={{ backgroundColor: ACCENT }}
              />
            )}
          </div>
        ))}
      </pre>
    </GlowCard>
  );
}
