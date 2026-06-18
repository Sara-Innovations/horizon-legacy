import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import gsap from "gsap";

/** Gold curtain wipe shown on every route change. */
export function PageTransition() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const ref = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const el = ref.current;
    if (!el) return;
    const tl = gsap.timeline();
    tl.set(el, { scaleY: 0, transformOrigin: "bottom center", display: "block" })
      .to(el, { scaleY: 1, duration: 0.55, ease: "power4.inOut" })
      .set(el, { transformOrigin: "top center" })
      .to(el, { scaleY: 0, duration: 0.6, ease: "power4.inOut", delay: 0.05 })
      .set(el, { display: "none" });
  }, [pathname]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-0 z-[200] pointer-events-none"
      style={{
        display: "none",
        background:
          "linear-gradient(180deg, #d4af37 0%, #b8941f 50%, #d4af37 100%)",
      }}
    />
  );
}
