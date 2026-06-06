import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeader({ eyebrow, title, subtitle, image }: { eyebrow?: string; title: string; subtitle?: string; image?: string }) {
  return (
    <section className="relative pt-40 pb-24 bg-gradient-hero overflow-hidden">
      {image && (
        <div className="absolute inset-0 opacity-20">
          <img src={image} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-navy-deep" />
      <div className="container-luxe relative text-center animate-fade-up">
        {eyebrow && <div className="text-gold text-xs tracking-[0.3em] uppercase mb-4">{eyebrow}</div>}
        <h1 className="text-4xl md:text-6xl text-white font-display">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl mx-auto text-white/70">{subtitle}</p>}
        <div className="gold-divider mt-8" />
      </div>
    </section>
  );
}
