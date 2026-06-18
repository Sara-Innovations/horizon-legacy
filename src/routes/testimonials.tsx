import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/site/Layout";
import { testimonials } from "@/data/site";
import { Quote, Play } from "lucide-react";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — Voices of Trust" },
      { name: "description", content: "What investors, homeowners and corporate clients say about Md Shariful Islam Khandakar and Landmark Group." },
      { property: "og:url", content: "/testimonials" },
    ],
    links: [{ rel: "canonical", href: "/testimonials" }],
  }),
  component: Testimonials,
});

const videoTestimonials = [
  { name: "Tanvir Hasan", role: "Private Investor, Dhaka", thumb: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=900" },
  { name: "Meherun Nesa", role: "Family Office Principal, Chattogram", thumb: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=900" },
];

function Testimonials() {
  return (
    <Layout>
      <PageHeader eyebrow="Testimonials" title="Voices of Trust" subtitle="The relationships we build matter as much as the buildings we deliver." />

      <section className="py-24 container-luxe">
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="p-8 border border-border bg-card hover:shadow-luxe transition">
              <Quote className="text-gold mb-5" size={24} />
              <p className="text-lg leading-relaxed text-foreground font-display italic mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="font-medium text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground tracking-wide uppercase">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <section className="py-12 bg-secondary border-y border-border overflow-hidden">
        <div data-marquee data-speed="60" className="flex gap-16 whitespace-nowrap text-foreground/70 font-display text-3xl md:text-4xl italic">
          {["Trusted by Visionaries", "◆", "Featured in Forbes BD", "◆", "47 Industry Awards", "◆", "84+ Landmark Projects", "◆", "Building Beyond the Horizon", "◆"].map((t, i) => (
            <span key={i} className={i % 2 === 1 ? "text-gold" : ""}>{t}</span>
          ))}
        </div>
      </section>

      <section className="py-24 bg-navy-deep text-white">
        <div className="container-luxe">
          <div className="text-center mb-14">
            <div className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Video Testimonials</div>
            <h2 className="text-4xl font-display">Hear it directly</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {videoTestimonials.map((v) => (
              <div key={v.name} className="group relative overflow-hidden cursor-pointer">
                <div className="aspect-video">
                  <img src={v.thumb} alt={v.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                </div>
                <div className="absolute inset-0 bg-navy-deep/50 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center text-navy-deep group-hover:scale-110 transition">
                    <Play size={22} fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-navy-deep to-transparent">
                  <div className="font-display text-xl">{v.name}</div>
                  <div className="text-xs text-gold tracking-[0.2em] uppercase">{v.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
