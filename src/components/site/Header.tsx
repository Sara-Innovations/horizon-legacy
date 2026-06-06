import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/leadership", label: "Leadership" },
  { to: "/media", label: "Media" },
  { to: "/blog", label: "Insights" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? dark
            ? "glass-dark shadow-lg"
            : "glass-light shadow-sm bg-white/90"
          : "bg-transparent"
      }`}
    >
      <div className="container-luxe flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="w-9 h-9 rounded-sm bg-gradient-gold flex items-center justify-center font-display text-navy-deep font-bold">
            JH
          </span>
          <div className="hidden sm:block leading-tight">
            <div className={`font-display text-base ${scrolled ? (dark ? "text-white" : "text-navy-deep") : "text-white"}`}>
              Jonathan Harrison
            </div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-gold">
              Prime Horizon
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: n.to === "/" }}
              className={`px-3 py-2 text-sm tracking-wide transition-colors hover:text-gold ${
                scrolled ? (dark ? "text-white/90" : "text-navy-deep") : "text-white/90"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle theme"
            className={`p-2 rounded-full transition ${
              scrolled
                ? dark
                  ? "text-white hover:bg-white/10"
                  : "text-navy-deep hover:bg-secondary"
                : "text-white hover:bg-white/10"
            }`}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className={`lg:hidden p-2 ${scrolled ? (dark ? "text-white" : "text-navy-deep") : "text-white"}`}
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-navy-deep z-50 lg:hidden">
          <div className="container-luxe flex items-center justify-between h-20 bg-navy-deep">
            <span className="font-display text-white text-lg">Menu</span>
            <button onClick={() => setOpen(false)} className="text-white p-2" aria-label="Close menu">
              <X size={24} />
            </button>
          </div>
          <nav className="container-luxe flex flex-col gap-1 mt-8">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="text-white text-2xl font-display py-3 border-b border-white/10 hover:text-gold transition"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
