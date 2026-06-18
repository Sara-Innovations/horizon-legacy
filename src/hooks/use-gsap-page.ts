import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Global GSAP page animator.
 * Re-initialises on every route change and animates:
 *  - elements with [data-anim="fade-up" | "fade-left" | "fade-right" | "zoom" | "rise"]
 *  - hero h1 (split lines fade-up)
 *  - any h2, h3 inside <section> (scroll-triggered fade-up)
 *  - <img> inside sections (subtle reveal)
 *  - cards / articles (stagger fade)
 */
export function useGsapPage() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // 1. Hero entrance — fires immediately on mount.
      gsap.from("main h1", {
        y: 60,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
      });
      gsap.from("main h1 + p, main h1 ~ p, main .hero-sub", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.25,
        ease: "power3.out",
      });
      gsap.from("main .gold-divider", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        delay: 0.4,
        ease: "power3.out",
      });

      // 2. Data-driven animations (work on every page).
      const variants: Record<string, gsap.TweenVars> = {
        "fade-up": { y: 60, opacity: 0 },
        "fade-left": { x: -60, opacity: 0 },
        "fade-right": { x: 60, opacity: 0 },
        zoom: { scale: 0.85, opacity: 0 },
        rise: { y: 100, opacity: 0 },
      };

      Object.entries(variants).forEach(([key, vars]) => {
        const els = gsap.utils.toArray<HTMLElement>(`[data-anim="${key}"]`);
        els.forEach((el) => {
          gsap.from(el, {
            ...vars,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          });
        });
      });

      // 3. Generic content reveal — every <section> after the hero.
      const sections = gsap.utils.toArray<HTMLElement>("main section");
      sections.forEach((section, idx) => {
        if (idx === 0) return; // skip hero / first section
        const heads = section.querySelectorAll(
          "h2, h3, .eyebrow, .gold-divider",
        );
        if (heads.length) {
          gsap.from(heads, {
            y: 40,
            opacity: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        }

        // Stagger reveal for grid children (cards, articles, list items)
        const grids = section.querySelectorAll(
          ".grid, .flex-wrap, [data-grid]",
        );
        grids.forEach((grid) => {
          const kids = grid.children;
          if (kids.length > 1) {
            gsap.from(kids, {
              y: 50,
              opacity: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: grid as HTMLElement,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            });
          }
        });

        // Parallax for large images inside sections
        const imgs = section.querySelectorAll<HTMLElement>(
          "img.parallax, [data-parallax]",
        );
        imgs.forEach((img) => {
          gsap.to(img, {
            yPercent: -12,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      });

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, [pathname]);
}
