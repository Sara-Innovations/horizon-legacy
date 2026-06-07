import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Award, Building2, Users, TrendingUp, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { projects, testimonials } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Md Shariful Islam Khandakar — MD & CEO, Prime Horizon Developments" },
      { name: "description", content: "Building sustainable communities for future generations. Two decades of visionary real estate leadership across the GCC." },
      { property: "og:title", content: "Md Shariful Islam Khandakar — MD & CEO" },
      { property: "og:description", content: "Building sustainable communities for future generations." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const stats = [
  { icon: Building2, label: "Projects Delivered", value: 84 },
  { icon: TrendingUp, label: "Portfolio Value", value: 12, suffix: "B+" },
  { icon: Users, label: "Happy Residents", value: 25000, suffix: "+" },
  { icon: Award, label: "Industry Awards", value: 47 },
];

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const dur = 1600;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  const display = to >= 1000 ? n.toLocaleString() : n;
  return <span>{display}{suffix}</span>;
}

function Home() {
  const featured = projects.slice(0, 4);
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setIdx((v) => (v + 1) % testimonials.length), 6000);
    return () => clearInterval(i);
  }, []);

  return (
    <Layout>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920&auto=format&fit=crop"
            alt="Luxury skyline"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/80 to-transparent" />
        </div>

        <div className="container-luxe relative grid lg:grid-cols-12 gap-12 items-center pt-28 pb-20">
          <div className="lg:col-span-7 text-white animate-fade-up">
            <div className="text-gold text-xs tracking-[0.3em] uppercase mb-6">
              Managing Director & CEO · Prime Horizon Developments
            </div>
            <h1 className="text-5xl md:text-7xl leading-[1.05] font-display mb-6">
              Building Sustainable<br />Communities for<br />
              <span className="text-gold italic">Future Generations.</span>
            </h1>
            <p className="text-white/70 text-lg max-w-xl mb-10 leading-relaxed">
              For over two decades, Md Shariful Islam Khandakar has led the development of landmark residential, commercial and mixed-use destinations across the Gulf and beyond.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/projects" className="group inline-flex items-center gap-3 bg-gradient-gold text-navy-deep px-7 py-4 text-sm tracking-wide font-medium hover:shadow-luxe transition">
                Explore Projects <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
              </Link>
              <Link to="/about" className="inline-flex items-center gap-3 border border-white/30 text-white px-7 py-4 text-sm tracking-wide hover:bg-white/10 transition">
                Meet Shariful
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative animate-fade-in">
            <div className="relative aspect-[4/5] max-w-md mx-auto">
              <div className="absolute -inset-4 bg-gradient-gold opacity-20 blur-3xl rounded-full" />
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&auto=format&fit=crop"
                alt="Md Shariful Islam Khandakar portrait"
                className="relative w-full h-full object-cover shadow-luxe"
              />
              <div className="absolute -bottom-6 -left-6 glass p-5 text-white">
                <div className="text-[10px] tracking-[0.25em] uppercase text-gold mb-1">Since 2003</div>
                <div className="font-display text-2xl">20+ Years</div>
                <div className="text-xs text-white/70">of industry leadership</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-[0.3em] uppercase">
          Scroll
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 bg-secondary">
        <div className="container-luxe grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <s.icon className="mx-auto text-gold mb-4" size={28} />
              <div className="text-4xl md:text-5xl font-display text-navy-deep">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="text-sm text-muted-foreground mt-2 tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="py-24 container-luxe">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Featured Portfolio</div>
            <h2 className="text-4xl md:text-5xl font-display text-navy-deep max-w-2xl">A Legacy of Landmark Developments</h2>
          </div>
          <Link to="/projects" className="text-navy-deep hover:text-gold text-sm tracking-wide inline-flex items-center gap-2">
            View All Projects <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {featured.map((p, i) => (
            <Link key={p.id} to="/projects" className={`group relative overflow-hidden ${i === 0 || i === 3 ? "md:row-span-1" : ""}`}>
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="text-gold text-[10px] tracking-[0.3em] uppercase mb-2">{p.type} · {p.location}</div>
                <h3 className="text-2xl font-display">{p.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* VISION */}
      <section className="py-24 bg-navy-deep text-white">
        <div className="container-luxe grid md:grid-cols-2 gap-16 items-center">
          <div>
            <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1000&auto=format&fit=crop" alt="" className="w-full aspect-[4/5] object-cover shadow-luxe" />
          </div>
          <div>
            <div className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Vision & Mission</div>
            <h2 className="text-4xl md:text-5xl font-display mb-8">A philosophy rooted in <span className="italic text-gold">people, place and purpose.</span></h2>
            <div className="space-y-6 text-white/70 leading-relaxed">
              <p><span className="text-gold font-medium">Our Vision —</span> To shape iconic communities that elevate everyday life and stand the test of generations.</p>
              <p><span className="text-gold font-medium">Our Mission —</span> To deliver developments of uncompromising quality, blending architectural excellence with social and environmental responsibility.</p>
            </div>
            <Link to="/about" className="mt-10 inline-flex items-center gap-3 border border-gold text-gold px-7 py-4 text-sm hover:bg-gold hover:text-navy-deep transition">
              Read Full Biography <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 container-luxe">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Testimonials</div>
          <h2 className="text-4xl md:text-5xl font-display text-navy-deep">Trusted by Visionaries</h2>
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <Quote className="mx-auto text-gold mb-6" size={40} />
          <div key={idx} className="animate-fade-in">
            <p className="text-2xl md:text-3xl font-display text-navy-deep leading-snug italic">
              "{testimonials[idx].quote}"
            </p>
            <div className="mt-8 flex flex-col items-center gap-2">
              <img src={testimonials[idx].image} alt={testimonials[idx].name} className="w-14 h-14 rounded-full object-cover" />
              <div className="font-medium text-navy-deep">{testimonials[idx].name}</div>
              <div className="text-xs text-muted-foreground tracking-wide uppercase">{testimonials[idx].role}</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 mt-10">
            <button onClick={() => setIdx((idx - 1 + testimonials.length) % testimonials.length)} className="w-10 h-10 rounded-full border border-border hover:border-gold hover:text-gold flex items-center justify-center"><ChevronLeft size={16} /></button>
            <button onClick={() => setIdx((idx + 1) % testimonials.length)} className="w-10 h-10 rounded-full border border-border hover:border-gold hover:text-gold flex items-center justify-center"><ChevronRight size={16} /></button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1600" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container-luxe relative text-center max-w-3xl">
          <div className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Let's Build Together</div>
          <h2 className="text-4xl md:text-5xl font-display mb-6">Partner with a leader who builds <span className="italic text-gold">beyond the horizon.</span></h2>
          <p className="text-white/70 mb-10">Whether you're an investor, partner or future homeowner, let's start a conversation.</p>
          <Link to="/contact" className="inline-flex items-center gap-3 bg-gradient-gold text-navy-deep px-8 py-4 text-sm tracking-wide font-medium hover:shadow-gold transition">
            Get in Touch <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
