import { useEffect, useState } from "react";
import { ACCENT, BG, CARD, LINE, MUTED } from "../constants/theme";
import { BOOT_LINES } from "../data";

export function IntroLoader({ onDone }) {
  const [phase, setPhase] = useState("loading"); // loading -> coding -> exit
  const [progress, setProgress] = useState(0);
  const [lines, setLines] = useState([""]);

  useEffect(() => {
    let p = 0;
    const tick = setInterval(() => {
      p += Math.random() * 14 + 6;
      if (p >= 100) {
        p = 100;
        clearInterval(tick);
        setTimeout(() => setPhase("coding"), 250);
      }
      setProgress(Math.min(100, Math.round(p)));
    }, 130);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    if (phase !== "coding") return;
    let li = 0;
    let ci = 0;
    let cancelled = false;

    function step() {
      if (cancelled) return;
      if (li >= BOOT_LINES.length) {
        setTimeout(() => setPhase("exit"), 350);
        return;
      }
      const full = BOOT_LINES[li];
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
        setTimeout(step, 180);
      } else {
        setTimeout(step, 14 + Math.random() * 18);
      }
    }
    const start = setTimeout(step, 150);
    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "exit") return;
    const t = setTimeout(onDone, 600);
    return () => clearTimeout(t);
  }, [phase, onDone]);

  return (
    <div
      className={`fixed inset-0 z-[10000] flex items-center justify-center transition-opacity duration-600 ease-out ${
        phase === "exit" ? "opacity-0" : "opacity-100"
      }`}
      style={{ backgroundColor: BG }}
    >
      <div className="w-[320px] sm:w-[380px]">
        {phase === "loading" && (
          <div>
            <div className="font-mono text-xs mb-4" style={{ color: MUTED }}>
              loading portfolio
            </div>
            <div className="h-1 w-full rounded-full overflow-hidden" style={{ backgroundColor: LINE }}>
              <div
                className="h-full rounded-full transition-all duration-150 ease-out"
                style={{ width: `${progress}%`, backgroundColor: ACCENT, boxShadow: `0 0 10px ${ACCENT}` }}
              />
            </div>
            <div className="font-mono text-xs mt-3 text-right" style={{ color: ACCENT }}>
              {progress}%
            </div>
          </div>
        )}

        {phase !== "loading" && (
          <div className="rounded-xl border overflow-hidden" style={{ borderColor: LINE, backgroundColor: CARD }}>
            <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: LINE }}>
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#E2554E" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#E5B85C" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#54C26B" }} />
              <span className="ml-2 text-xs font-mono" style={{ color: MUTED }}>boot.sh</span>
            </div>
            <pre className="px-5 py-5 text-[12.5px] leading-relaxed font-mono min-h-[120px]">
              {lines.map((l, i) => (
                <div key={i}>
                  <span style={{ color: i === BOOT_LINES.length - 1 ? ACCENT : "#7FB3E8" }}>{l}</span>
                  {i === lines.length - 1 && phase === "coding" && (
                    <span
                      className="inline-block w-[7px] h-[13px] align-middle ml-0.5 animate-pulse"
                      style={{ backgroundColor: ACCENT }}
                    />
                  )}
                </div>
              ))}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
