import { useReveal } from "../hooks/useReveal";

export function Reveal({ children, className = "" }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className={`opacity-0 translate-y-6 transition-all duration-700 ease-out motion-reduce:opacity-100 motion-reduce:translate-y-0 ${className}`}
    >
      {children}
    </div>
  );
}
