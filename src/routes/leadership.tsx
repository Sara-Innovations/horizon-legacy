import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/site/Layout";
import { awards } from "@/data/site";
import { Award, Trophy, Heart, Users, TrendingUp, Newspaper } from "lucide-react";

export const Route = createFileRoute("/leadership")({
  head: () => ({
    meta: [
      { title: "Leadership & Achievements — Md Shariful Islam Khandakar" },
      { name: "description", content: "Awards, recognitions, industry leadership and CSR initiatives of Md Shariful Islam Khandakar and Prime Horizon Developments." },
      { property: "og:url", content: "/leadership" },
    ],
    links: [{ rel: "canonical", href: "/leadership" }],
  }),
  component: Leadership,
});

const memberships = [
  "Royal Institution of Chartered Surveyors (RICS)",
  "Urban Land Institute (ULI) — Trustee",
  "World Economic Forum, Real Estate Council",
  "MENA Sustainable Cities Alliance",
  "Harvard Business School Alumni Board",
  "Global Real Estate Sustainability Benchmark (GRESB)",
];

const csr = [
  { title: "Horizon Scholars Programme", text: "Funding 200+ scholarships annually for students in architecture, engineering and urban planning.", icon: Users },
  { title: "Green Communities Initiative", text: "Planting 1 million trees across our developments by 2030.", icon: Heart },
  { title: "Affordable Housing Pledge", text: "Committing 10% of every new mixed-use development to attainable housing.", icon: TrendingUp },
];

const milestones = [
  { year: "2018", value: "$2.4B", text: "AUM when Shariful was appointed MD & CEO" },
  { year: "2026", value: "$12B+", text: "Current portfolio value, a 5× increase in eight years" },
  { year: "2030", value: "Net Zero", text: "Company-wide operational carbon target" },
];

const press = [
  "Forbes Middle East — 'The Quiet Architect of the Gulf Boom'",
  "Bloomberg — Live keynote on sustainable urbanism",
  "Architectural Digest — Cover feature, Spring 2026",
  "Financial Times — Op-ed on responsible capital in real estate",
];

function Leadership() {
  return (
    <Layout>
      <PageHeader eyebrow="Leadership" title="Awards, Recognition & Impact" subtitle="A career defined by industry-leading recognition and a deep commitment to communities." />

      {/* AWARDS */}
      <section className="py-24 container-luxe">
        <div className="text-center mb-14">
          <Trophy className="mx-auto text-gold mb-4" size={32} />
          <h2 className="text-4xl font-display text-navy-deep">Awards & Recognition</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {awards.map((a) => (
            <div key={a.title} className="flex gap-5 p-6 border border-border hover:border-gold hover:shadow-luxe transition">
              <div className="shrink-0 w-16 h-16 bg-secondary flex items-center justify-center">
                <Award className="text-gold" size={24} />
              </div>
              <div>
                <div className="text-gold text-xs tracking-[0.2em]">{a.year}</div>
                <h3 className="font-display text-lg text-navy-deep mt-1">{a.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{a.org}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MILESTONES */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container-luxe">
          <div className="text-center mb-14">
            <div className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Company Growth</div>
            <h2 className="text-4xl font-display">Milestones</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {milestones.map((m) => (
              <div key={m.year} className="glass p-8 text-center">
                <div className="text-gold text-xs tracking-[0.3em] uppercase mb-3">{m.year}</div>
                <div className="text-5xl font-display mb-3">{m.value}</div>
                <p className="text-white/70 text-sm">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIPS */}
      <section className="py-24 container-luxe grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-display text-navy-deep mb-6">Industry Memberships</h2>
          <ul className="space-y-3">
            {memberships.map((m) => (
              <li key={m} className="flex items-start gap-3 text-muted-foreground">
                <span className="text-gold mt-2 w-2 h-px bg-gold inline-block shrink-0 mt-3" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-3xl font-display text-navy-deep mb-6 flex items-center gap-3"><Newspaper className="text-gold" size={24} /> In the Media</h2>
          <ul className="space-y-3">
            {press.map((m) => (
              <li key={m} className="border-l-2 border-gold pl-4 text-muted-foreground">{m}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* CSR */}
      <section className="py-24 bg-secondary">
        <div className="container-luxe">
          <div className="text-center mb-14">
            <div className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Corporate Responsibility</div>
            <h2 className="text-4xl font-display text-navy-deep">Building Beyond Business</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {csr.map((c) => (
              <div key={c.title} className="bg-card p-8 border border-border">
                <c.icon className="text-gold mb-4" size={28} />
                <h3 className="font-display text-xl text-navy-deep mb-3">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
