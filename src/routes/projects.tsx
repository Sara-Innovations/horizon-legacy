import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Layout, PageHeader } from "@/components/site/Layout";
import { projects } from "@/data/site";
import { MapPin, Calendar, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Prime Horizon Portfolio" },
      { name: "description", content: "A curated portfolio of landmark residential, commercial and mixed-use developments led by Md Shariful Islam Khandakar." },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: Projects,
});

const filters = ["All", "Residential", "Commercial", "Mixed-Use", "Ongoing", "Completed"];

function Projects() {
  const [filter, setFilter] = useState("All");
  const list = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((p) => p.type === filter || p.status === filter);
  }, [filter]);

  return (
    <Layout>
      <PageHeader eyebrow="Portfolio" title="Landmark Developments" subtitle="A selection of completed and ongoing projects spanning residential, commercial and mixed-use destinations." />

      <section className="py-16 container-luxe">
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 text-xs tracking-[0.2em] uppercase transition border ${
                filter === f
                  ? "bg-navy-deep text-white border-navy-deep"
                  : "bg-transparent text-navy-deep border-border hover:border-gold hover:text-gold"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((p) => (
            <article key={p.id} className="group bg-card border border-border hover:shadow-luxe transition overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute top-4 left-4 bg-gradient-gold text-navy-deep text-[10px] tracking-[0.2em] uppercase px-3 py-1">{p.status}</div>
              </div>
              <div className="p-6">
                <div className="text-gold text-[10px] tracking-[0.3em] uppercase mb-2">{p.type}</div>
                <h3 className="font-display text-xl text-navy-deep mb-3">{p.name}</h3>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{p.description}</p>
                <div className="space-y-2 text-xs text-muted-foreground border-t border-border pt-4">
                  <div className="flex items-center gap-2"><MapPin size={12} className="text-gold" /> {p.location}</div>
                  <div className="flex items-center gap-2"><Calendar size={12} className="text-gold" /> {p.year}</div>
                  <div className="flex items-center gap-2"><TrendingUp size={12} className="text-gold" /> Project value: <span className="text-navy-deep font-medium">{p.value}</span></div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {list.length === 0 && <p className="text-center text-muted-foreground py-12">No projects match this filter.</p>}
      </section>
    </Layout>
  );
}
