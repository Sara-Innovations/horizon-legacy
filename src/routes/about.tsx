import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Layout, PageHeader } from "@/components/site/Layout";
import { timeline, values } from "@/data/site";
import { GraduationCap, Award, Sparkles } from "lucide-react";
import ownerPhoto from "@/assets/owner.jpeg";

const Building3D = lazy(() => import("@/components/site/Building3D").then((m) => ({ default: m.Building3D })));

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Md Shariful Islam Khandakar" },
      { name: "description", content: "The journey, philosophy and leadership story of Md Shariful Islam Khandakar, MD & CEO of Landmark Group." },
      { property: "og:title", content: "About Md Shariful Islam Khandakar" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <Layout>
      <PageHeader eyebrow="About" title="A Life Devoted to Place-Making" subtitle="Two decades of disciplined leadership, principled investment and a relentless pursuit of architectural excellence." />

      {/* BIO */}
      <section className="py-24 container-luxe grid md:grid-cols-5 gap-12 items-center">
        <div className="md:col-span-2">
          <img src={ownerPhoto} alt="Md Shariful Islam Khandakar" className="w-full aspect-[4/5] object-cover object-top shadow-luxe" />
        </div>
        <div className="md:col-span-3">
          <div className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Biography</div>
          <h2 className="text-3xl md:text-4xl font-display text-foreground mb-6">Mr. Md Shariful Islam Khandakar</h2>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>Md Shariful Islam Khandakar is the Managing Director and Chief Executive Officer of Landmark Group, one of Bangladesh's most respected real estate companies. Under his stewardship, the firm has grown into a multi-thousand-crore developer with a portfolio spanning Dhaka, Chattogram, Sylhet, Khulna and beyond.</p>
            <p>With over 20 years in real estate, Shariful has led the delivery of more than 80 landmark residential, commercial and mixed-use projects. He is widely regarded as a thoughtful, principled leader whose work is defined by a deep commitment to sustainability, community and craft.</p>
            <p>Beyond business, Shariful serves on the boards of several industry councils and philanthropic foundations focused on education, urban innovation and climate.</p>
          </div>
        </div>
      </section>

      {/* VISION THROUGH ARCHITECTURE — 3D EXPERIENCE */}
      <section className="relative py-24 bg-gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: "radial-gradient(circle at 70% 30%, rgba(212,175,55,0.25), transparent 60%)" }} />
        <div className="container-luxe relative grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 text-gold text-xs tracking-[0.3em] uppercase mb-4">
              <Sparkles size={14} /> Vision Through Architecture
            </div>
            <h2 className="text-4xl md:text-5xl font-display leading-tight mb-6">
              Transforming Skylines Through <span className="italic text-gold">Innovation.</span>
            </h2>
            <p className="text-white/75 leading-relaxed mb-6">
              Our vision extends beyond constructing buildings. We create sustainable communities, iconic landmarks, and investment opportunities that shape the future of urban living.
            </p>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex gap-3"><span className="text-gold">◆</span> Hover the glowing markers to reveal each zone of the development.</li>
              <li className="flex gap-3"><span className="text-gold">◆</span> Drag to rotate · scroll to zoom · toggle Day / Night.</li>
              <li className="flex gap-3"><span className="text-gold">◆</span> Real-time lighting, glass reflections and HDR environment.</li>
            </ul>
          </div>
          <div className="lg:col-span-7">
            <Suspense fallback={<div className="w-full h-[520px] md:h-[620px] rounded-sm bg-navy/40 animate-pulse flex items-center justify-center text-white/40 text-sm tracking-[0.3em] uppercase">Loading 3D Experience…</div>}>
              <Building3D />
            </Suspense>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-24 bg-secondary">
        <div className="container-luxe grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Leadership Philosophy</div>
            <h2 className="text-4xl font-display text-foreground mb-6">"Architecture is the most public expression of our values."</h2>
            <p className="text-muted-foreground leading-relaxed">I believe great development is an act of stewardship. Every site we touch belongs to the people who will live, work and gather there long after we are gone. Our role is to honour that responsibility with clarity, courage and care.</p>
          </div>
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000" alt="" className="aspect-[5/4] object-cover w-full shadow-luxe" />
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-24 container-luxe">
        <div className="text-center mb-16">
          <div className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Professional Journey</div>
          <h2 className="text-4xl font-display text-foreground">Two decades of building</h2>
        </div>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />
          {timeline.map((t, i) => (
            <div key={t.year} className={`relative mb-12 md:grid md:grid-cols-2 md:gap-12 ${i % 2 === 0 ? "" : "md:[direction:rtl]"}`}>
              <div className={`pl-12 md:pl-0 md:[direction:ltr] ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                <div className="text-gold font-display text-3xl">{t.year}</div>
                <h3 className="font-display text-xl text-foreground mt-1">{t.title}</h3>
                <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{t.text}</p>
              </div>
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-2 w-3 h-3 rounded-full bg-gold ring-4 ring-background" />
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section className="py-20 bg-navy-deep text-white">
        <div className="container-luxe grid md:grid-cols-2 gap-10">
          <div className="glass p-8">
            <GraduationCap className="text-gold mb-4" size={32} />
            <div className="text-xs tracking-[0.3em] uppercase text-gold mb-2">Education</div>
            <h3 className="font-display text-2xl mb-2">MBA, Real Estate Management</h3>
            <p className="text-white/70">Harvard Business School — graduated with distinction, 2001.</p>
          </div>
          <div className="glass p-8">
            <Award className="text-gold mb-4" size={32} />
            <div className="text-xs tracking-[0.3em] uppercase text-gold mb-2">Experience</div>
            <h3 className="font-display text-2xl mb-2">20+ Years of Leadership</h3>
            <p className="text-white/70">Delivering over ৳1,32,000 Cr in developments across residential, commercial and mixed-use sectors.</p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-24 container-luxe">
        <div className="text-center mb-14">
          <div className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Core Values</div>
          <h2 className="text-4xl font-display text-foreground">The principles that guide every decision</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {values.map((v) => (
            <div key={v.title} className="border border-border p-8 hover:border-gold hover:shadow-luxe transition group">
              <div className="w-10 h-px bg-gold mb-6 group-hover:w-16 transition-all" />
              <h3 className="font-display text-xl text-foreground mb-3">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PERSONAL MESSAGE */}
      <section className="py-24 bg-secondary">
        <div className="container-luxe max-w-3xl text-center">
          <div className="text-gold text-xs tracking-[0.3em] uppercase mb-3">A Personal Note</div>
          <h2 className="text-3xl md:text-4xl font-display text-foreground italic">"We do not build buildings. We build the places where people will fall in love, raise families, start companies and remember the most important moments of their lives. That is the privilege — and the duty — of our profession."</h2>
          <div className="mt-8 font-display text-foreground">— Md Shariful Islam Khandakar</div>
        </div>
      </section>
    </Layout>
  );
}
