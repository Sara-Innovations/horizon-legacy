import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Split an element's text content into wrapped word spans (one-shot per element). */
function splitWords(el: HTMLElement) {
  if (el.dataset.split === "done") return Array.from(el.querySelectorAll<HTMLElement>(".word > span"));
  const raw = el.textContent || "";
  const words = raw.split(/(\s+)/);
  el.innerHTML = "";
  const out: HTMLElement[] = [];
  for (const w of words) {
    if (/^\s+$/.test(w)) {
      el.appendChild(document.createTextNode(w));
    } else if (w.length) {
      const outer = document.createElement("span");
      outer.className = "word";
      outer.style.display = "inline-block";
      outer.style.overflow = "hidden";
      outer.style.verticalAlign = "bottom";
      const inner = document.createElement("span");
      inner.style.display = "inline-block";
      inner.style.willChange = "transform";
      inner.textContent = w;
      outer.appendChild(inner);
      el.appendChild(outer);
      out.push(inner);
    }
  }
  el.dataset.split = "done";
  return out;
}

/**
 * Global GSAP page animator. Runs on every route change.
 * Effects:
 *  1. Hero h1 word-by-word reveal + subtitle + gold divider draw
 *  2. [data-anim="fade-up|fade-left|fade-right|zoom|rise"] scroll reveal
 *  3. Section heads (h2/h3/.eyebrow/.gold-divider) staggered
 *  4. Grid children stagger
 *  5. Section <img> clip-path reveal + parallax for img.parallax
 *  6. [data-counter="123"] tween from 0 → value when scrolled in
 *  7. [data-marquee] infinite horizontal scroll
 *  8. [data-magnetic] cursor-follow magnetic hover
 *  9. [data-horizontal] pinned section with [data-horizontal-track] inner row
 */
export function useGsapPage() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const magneticHandlers: Array<{ el: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }> = [];

    const ctx = gsap.context(() => {
      // 1. HERO — word-by-word fade/rise reveal
      const h1 = document.querySelector<HTMLElement>("main h1");
      if (h1) {
        const inners = splitWords(h1);
        if (inners.length) {
          gsap.from(inners, {
            yPercent: 110,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
            stagger: 0.06,
          });
        } else {
          gsap.from(h1, { y: 60, opacity: 0, duration: 1.1, ease: "power3.out" });
        }
      }

      gsap.from("main h1 + p, main h1 ~ p, main .hero-sub", {
        y: 30, opacity: 0, duration: 1, delay: 0.4, ease: "power3.out",
      });
      gsap.from("main .gold-divider", {
        scaleX: 0, transformOrigin: "left center", duration: 1.2, delay: 0.6, ease: "power3.out",
      });

      // 2. Data-anim variants
      const variants: Record<string, gsap.TweenVars> = {
        "fade-up": { y: 60, opacity: 0 },
        "fade-left": { x: -60, opacity: 0 },
        "fade-right": { x: 60, opacity: 0 },
        zoom: { scale: 0.85, opacity: 0 },
        rise: { y: 100, opacity: 0 },
      };
      Object.entries(variants).forEach(([key, vars]) => {
        gsap.utils.toArray<HTMLElement>(`[data-anim="${key}"]`).forEach((el) => {
          gsap.from(el, {
            ...vars, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
          });
        });
      });

      // 3-5. Section-level reveals
      const sections = gsap.utils.toArray<HTMLElement>("main section");
      sections.forEach((section, idx) => {
        if (idx > 0) {
          const heads = section.querySelectorAll("h2, h3, .eyebrow, .gold-divider");
          if (heads.length) {
            gsap.from(heads, {
              y: 40, opacity: 0, duration: 0.9, stagger: 0.08, ease: "power3.out",
              scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none reverse" },
            });
          }
          section.querySelectorAll(".grid, .flex-wrap, [data-grid]").forEach((grid) => {
            const kids = grid.children;
            if (kids.length > 1) {
              gsap.from(kids, {
                y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
                scrollTrigger: { trigger: grid as HTMLElement, start: "top 85%", toggleActions: "play none none reverse" },
              });
            }
          });
        }

        // Image clip-path reveal
        section.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
          if (img.dataset.revealDone) return;
          img.dataset.revealDone = "1";
          gsap.fromTo(img,
            { clipPath: "inset(0 0 100% 0)", scale: 1.1 },
            {
              clipPath: "inset(0 0 0% 0)", scale: 1, duration: 1.3, ease: "power3.out",
              scrollTrigger: { trigger: img, start: "top 92%", toggleActions: "play none none reverse" },
            }
          );
        });

        // Parallax
        section.querySelectorAll<HTMLElement>("img.parallax, [data-parallax]").forEach((img) => {
          gsap.to(img, {
            yPercent: -12, ease: "none",
            scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: true },
          });
        });
      });

      // 6. Counters
      gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
        const end = parseFloat(el.dataset.counter || "0");
        const decimals = parseInt(el.dataset.decimals || "0", 10);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end, duration: 2, ease: "power2.out",
          onUpdate: () => {
            const n = decimals ? obj.v.toFixed(decimals) : Math.round(obj.v).toString();
            el.textContent = end >= 1000 ? Number(n).toLocaleString() : n;
          },
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reset" },
        });
      });

      // 7. Marquee
      gsap.utils.toArray<HTMLElement>("[data-marquee]").forEach((track) => {
        const speed = parseFloat(track.dataset.speed || "30");
        // duplicate children once for seamless loop
        if (!track.dataset.marqueeReady) {
          track.dataset.marqueeReady = "1";
          const clone = track.innerHTML;
          track.innerHTML = clone + clone;
        }
        const distance = track.scrollWidth / 2;
        gsap.to(track, {
          x: -distance, duration: distance / speed, ease: "none", repeat: -1,
        });
      });

      // 9. Pinned horizontal scroll
      gsap.utils.toArray<HTMLElement>("[data-horizontal]").forEach((wrap) => {
        const track = wrap.querySelector<HTMLElement>("[data-horizontal-track]");
        if (!track) return;
        const distance = track.scrollWidth - window.innerWidth;
        if (distance <= 0) return;
        gsap.to(track, {
          x: -distance, ease: "none",
          scrollTrigger: {
            trigger: wrap, pin: true, scrub: 1, start: "top top",
            end: () => `+=${distance}`, invalidateOnRefresh: true,
          },
        });
      });

      ScrollTrigger.refresh();
    });

    // 8. Magnetic buttons (live cursor follow — outside ctx for cleanup)
    document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
      const strength = parseFloat(el.dataset.magnetic || "0.4");
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        gsap.to(el, { x: x * strength, y: y * strength, duration: 0.4, ease: "power3.out" });
      };
      const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" });
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      magneticHandlers.push({ el, move, leave });
    });

    return () => {
      magneticHandlers.forEach(({ el, move, leave }) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
      ctx.revert();
    };
  }, [pathname]);
}
