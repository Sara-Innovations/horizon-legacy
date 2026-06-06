import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Layout, PageHeader } from "@/components/site/Layout";
import { blogs } from "@/data/site";
import { Search, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Insights & Journal — Jonathan Harrison" },
      { name: "description", content: "Essays on real estate, sustainability, leadership and the future of cities by Jonathan Harrison." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: Blog,
});

function Blog() {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return blogs;
    return blogs.filter((b) => b.title.toLowerCase().includes(t) || b.category.toLowerCase().includes(t) || b.summary.toLowerCase().includes(t));
  }, [q]);

  const [featured, ...rest] = list;

  return (
    <Layout>
      <PageHeader eyebrow="Insights" title="The Journal" subtitle="Perspectives on real estate, sustainability and the cities of tomorrow." />

      <section className="py-16 container-luxe">
        <div className="max-w-md mx-auto relative mb-14">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search insights..."
            className="w-full bg-secondary border border-border pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-gold transition"
          />
        </div>

        {featured && (
          <article className="grid md:grid-cols-2 gap-10 mb-16 group cursor-pointer">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Featured · {featured.category}</div>
              <h2 className="text-3xl md:text-4xl font-display text-navy-deep mb-4 group-hover:text-gold transition">{featured.title}</h2>
              <p className="text-muted-foreground mb-6">{featured.summary}</p>
              <div className="text-xs text-muted-foreground tracking-wide">Jonathan Harrison · {featured.date}</div>
              <div className="mt-6 inline-flex items-center gap-2 text-navy-deep group-hover:text-gold text-sm">
                Read article <ArrowRight size={14} />
              </div>
            </div>
          </article>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((b) => (
            <article key={b.slug} className="group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden mb-5">
                <img src={b.image} alt={b.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
              </div>
              <div className="text-gold text-[10px] tracking-[0.3em] uppercase mb-2">{b.category}</div>
              <h3 className="font-display text-xl text-navy-deep mb-2 group-hover:text-gold transition">{b.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{b.summary}</p>
              <div className="text-xs text-muted-foreground">Jonathan Harrison · {b.date}</div>
            </article>
          ))}
        </div>

        {list.length === 0 && <p className="text-center text-muted-foreground py-12">No articles match your search.</p>}
      </section>
    </Layout>
  );
}
