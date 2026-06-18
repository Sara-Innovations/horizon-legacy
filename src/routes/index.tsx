import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/use-in-view";
import { ArrowRight, Award, Building2, Users, TrendingUp, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const HomeBuildings3D = lazy(() =>
  import("@/components/site/HomeBuildings3D").then((m) => ({ default: m.HomeBuildings3D })),
);
const Apartment3D = lazy(() =>
  import("@/components/site/Apartment3D").then((m) => ({ default: m.Apartment3D })),
);
import { Layout } from "@/components/site/Layout";
import { CtaBackgroundVideo } from "@/components/site/CtaBackgroundVideo";
import { projects, testimonials } from "@/data/site";
import ownerPhoto from "@/assets/owner.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Md Shariful Islam Khandakar — MD & CEO, Landmark Group" },
      {
        name: "description",
        content:
          "Building sustainable communities for future generations. Two decades of visionary real estate leadership across Bangladesh.",
      },
      { property: "og:title", content: "Md Shariful Islam Khandakar — MD & CEO" },
      {
        property: "og:description",
        content: "Building sustainable communities for future generations.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const stats: {
  icon: typeof Building2;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
}[] = [
  { icon: Building2, label: "Projects Delivered", value: 84 },
  { icon: TrendingUp, label: "Portfolio Value (BDT)", value: 13000, prefix: "৳", suffix: " Cr+" },
  { icon: Users, label: "Happy Residents", value: 25000, suffix: "+" },
  { icon: Award, label: "Industry Awards", value: 47 },
];

function Counter({
  to,
  suffix = "",
  prefix = "",
}: {
  to: number;
  suffix?: string;
  prefix?: string;
}) {
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
  return (
    <span>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

const skylinePlaceholder = (
  <div className="w-full h-[480px] md:h-[560px] lg:h-[620px] rounded-sm bg-[#0a1428] border border-border flex items-center justify-center text-muted-foreground text-sm tracking-[0.3em] uppercase">
    3D Skyline
  </div>
);

const apartmentPlaceholder = (
  <div className="w-full h-[420px] md:h-[520px] lg:h-[580px] rounded-sm bg-[#eef1f5] border border-border flex items-center justify-center text-muted-foreground text-sm tracking-[0.3em] uppercase">
    3D Floor Plan
  </div>
);

function Home() {
  const featured = projects.slice(0, 4);
  const [idx, setIdx] = useState(0);
  const skylineRef = useRef<HTMLDivElement>(null);
  const apartmentRef = useRef<HTMLDivElement>(null);
  const showSkyline = useInView(skylineRef, "100px");
  const showApartment = useInView(apartmentRef, "100px");
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
              Managing Director & CEO · Landmark Group
            </div>
            <h1 className="text-5xl md:text-7xl leading-[1.05] font-display mb-6">
              Building Sustainable
              <br />
              Communities for
              <br />
              <span className="text-gold italic">Future Generations.</span>
            </h1>
            <p className="text-white/70 text-lg max-w-xl mb-10 leading-relaxed">
              For over two decades, Md Shariful Islam Khandakar has led the development of landmark
              residential, commercial and mixed-use destinations across Bangladesh.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/projects"
                data-magnetic="0.35"
                className="group inline-flex items-center gap-3 bg-gradient-gold text-navy-deep px-7 py-4 text-sm tracking-wide font-medium hover:shadow-luxe transition"
              >
                Explore Projects{" "}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
              </Link>
              <Link
                to="/about"
                data-magnetic="0.35"
                className="inline-flex items-center gap-3 border border-white/30 text-white px-7 py-4 text-sm tracking-wide hover:bg-white/10 transition"
              >
                Meet Shariful
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative animate-fade-in">
            <div className="relative aspect-[4/5] max-w-md mx-auto">
              <div className="absolute -inset-4 bg-gradient-gold opacity-20 blur-3xl rounded-full" />
              <img
                src={ownerPhoto}
                alt="Md Shariful Islam Khandakar portrait"
                className="relative w-full h-full object-cover object-top shadow-luxe"
              />
              <div className="absolute -bottom-6 -left-6 glass p-5 text-white">
                <div className="text-[10px] tracking-[0.25em] uppercase text-gold mb-1">
                  Since 2003
                </div>
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

      {/* 3D BUILDINGS */}
      <section className="py-24 bg-background">
        <div className="container-luxe">
          <div className="grid lg:grid-cols-12 gap-12 items-center mb-12">
            <div className="lg:col-span-5">
              <div className="text-gold text-xs tracking-[0.3em] uppercase mb-3">
                Architectural Vision
              </div>
              <h2 className="text-4xl md:text-5xl font-display text-foreground leading-tight mb-6">
                Landmark developments,{" "}
                <span className="italic text-gold">brought to life in 3D.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Drag, pinch or scroll to explore our portfolio — residential towers, commercial
                landmarks and mixed-use destinations across Bangladesh in real-time 3D.
              </p>
            </div>
            <div ref={skylineRef} className="lg:col-span-7">
              {showSkyline ? (
                <Suspense
                  fallback={
                    <div className="w-full h-[480px] md:h-[560px] lg:h-[620px] rounded-sm bg-navy-deep/40 animate-pulse flex items-center justify-center text-muted-foreground text-sm tracking-[0.3em] uppercase">
                      Loading 3D Skyline…
                    </div>
                  }
                >
                  <HomeBuildings3D />
                </Suspense>
              ) : (
                skylinePlaceholder
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3D APARTMENT FLOOR PLAN */}
      <section className="py-24 bg-secondary">
        <div className="container-luxe">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div ref={apartmentRef} className="lg:col-span-7 order-2 lg:order-1">
              {showApartment ? (
                <Suspense
                  fallback={
                    <div className="w-full h-[420px] md:h-[520px] lg:h-[580px] rounded-sm bg-background animate-pulse flex items-center justify-center text-muted-foreground text-sm tracking-[0.3em] uppercase">
                      Loading Floor Plan…
                    </div>
                  }
                >
                  <Apartment3D />
                </Suspense>
              ) : (
                apartmentPlaceholder
              )}
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="text-gold text-xs tracking-[0.3em] uppercase mb-3">
                Interior Experience
              </div>
              <h2 className="text-4xl md:text-5xl font-display text-foreground leading-tight mb-6">
                Step inside a{" "}
                <span className="italic text-gold">Landmark residence.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Explore a one-bedroom apartment in interactive 3D — bathroom, dining, kitchen,
                living room and bedroom laid out exactly as residents experience them.
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-gold">◆</span> Drag with mouse to rotate the view
                </li>
                <li className="flex gap-3">
                  <span className="text-gold">◆</span> Pinch or scroll to zoom on touch devices
                </li>
                <li className="flex gap-3">
                  <span className="text-gold">◆</span> Cutaway dollhouse view of every room
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 bg-background">
        <div className="container-luxe grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <s.icon className="mx-auto text-gold mb-4" size={28} />
              <div className="text-4xl md:text-5xl font-display text-foreground">
                <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
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
            <div className="text-gold text-xs tracking-[0.3em] uppercase mb-3">
              Featured Portfolio
            </div>
            <h2 className="text-4xl md:text-5xl font-display text-foreground max-w-2xl">
              A Legacy of Landmark Developments
            </h2>
          </div>
          <Link
            to="/projects"
            className="text-foreground hover:text-gold text-sm tracking-wide inline-flex items-center gap-2"
          >
            View All Projects <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {featured.map((p, i) => (
            <Link
              key={p.id}
              to="/projects"
              className={`group relative overflow-hidden ${i === 0 || i === 3 ? "md:row-span-1" : ""}`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="text-gold text-[10px] tracking-[0.3em] uppercase mb-2">
                  {p.type} · {p.location}
                </div>
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
            <img
              src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1000&auto=format&fit=crop"
              alt=""
              className="w-full aspect-[4/5] object-cover shadow-luxe"
            />
          </div>
          <div>
            <div className="text-gold text-xs tracking-[0.3em] uppercase mb-3">
              Vision & Mission
            </div>
            <h2 className="text-4xl md:text-5xl font-display mb-8">
              A philosophy rooted in{" "}
              <span className="italic text-gold">people, place and purpose.</span>
            </h2>
            <div className="space-y-6 text-white/70 leading-relaxed">
              <p>
                <span className="text-gold font-medium">Our Vision —</span> To shape iconic
                communities that elevate everyday life and stand the test of generations.
              </p>
              <p>
                <span className="text-gold font-medium">Our Mission —</span> To deliver developments
                of uncompromising quality, blending architectural excellence with social and
                environmental responsibility.
              </p>
            </div>
            <Link
              to="/about"
              className="mt-10 inline-flex items-center gap-3 border border-gold text-gold px-7 py-4 text-sm hover:bg-gold hover:text-navy-deep transition"
            >
              Read Full Biography <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 container-luxe">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Testimonials</div>
          <h2 className="text-4xl md:text-5xl font-display text-foreground">
            Trusted by Visionaries
          </h2>
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <Quote className="mx-auto text-gold mb-6" size={40} />
          <div key={idx} className="animate-fade-in">
            <p className="text-2xl md:text-3xl font-display text-foreground leading-snug italic">
              "{testimonials[idx].quote}"
            </p>
            <div className="mt-8 flex flex-col items-center gap-2">
              <img
                src={testimonials[idx].image}
                alt={testimonials[idx].name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div className="font-medium text-foreground">{testimonials[idx].name}</div>
              <div className="text-xs text-muted-foreground tracking-wide uppercase">
                {testimonials[idx].role}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 mt-10">
            <button
              onClick={() => setIdx((idx - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-border text-foreground hover:border-gold hover:text-gold flex items-center justify-center"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setIdx((idx + 1) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-border text-foreground hover:border-gold hover:text-gold flex items-center justify-center"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <CtaBackgroundVideo />
          <div className="absolute inset-0 bg-navy-deep/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/30 to-navy-deep/50" />
        </div>
        <div className="container-luxe relative mx-auto text-center max-w-3xl">
          <div className="text-gold text-xs tracking-[0.3em] uppercase mb-4">
            Let's Build Together
          </div>
          <h2 className="text-4xl md:text-5xl font-display mb-6">
            Partner with a leader who builds{" "}
            <span className="italic text-gold">beyond the horizon.</span>
          </h2>
          <p className="text-white/70 mb-10">
            Whether you're an investor, partner or future homeowner, let's start a conversation.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-gradient-gold text-navy-deep px-8 py-4 text-sm tracking-wide font-medium hover:shadow-gold transition"
          >
            Get in Touch <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
