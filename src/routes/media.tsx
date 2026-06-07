import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/site/Layout";
import { media } from "@/data/site";
import { Play, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/media")({
  head: () => ({
    meta: [
      { title: "Media & Press — Md Shariful Islam Khandakar" },
      { name: "description", content: "News, interviews, keynotes and press features of Md Shariful Islam Khandakar." },
      { property: "og:url", content: "/media" },
    ],
    links: [{ rel: "canonical", href: "/media" }],
  }),
  component: Media,
});

const videos = [
  {
    title: "Employee Recognition Ceremony — Mohakhali Corporate Office",
    thumb: "/images/3.jpg",
  },
  {
    title: "Team Appreciation Event at Landmark Group HQ",
    thumb: "/images/4.jpg",
  },
  {
    title: "Gift Presentation & Team Celebration — Siddique Tower",
    thumb: "/images/2.jpg",
  },
];

function Media() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Media & Press"
        title="In the Spotlight"
        subtitle="News, events and milestones from Landmark Group's Mohakhali corporate office and projects nationwide."
        image="/images/9.jpg"
      />

      <section className="py-24 container-luxe">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {media.map((m) => (
            <a key={m.title} href="#" className="group block bg-card border border-border hover:shadow-luxe transition overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img src={m.image} alt={m.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-gold tracking-[0.2em] uppercase">{m.type}</span>
                  <span className="text-muted-foreground">{m.date}</span>
                </div>
                <h3 className="font-display text-lg text-foreground mb-2">{m.title}</h3>
                <div className="text-sm text-muted-foreground flex items-center gap-2 group-hover:text-gold transition">
                  {m.outlet} <ExternalLink size={12} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="py-24 bg-navy-deep text-white">
        <div className="container-luxe">
          <div className="text-center mb-14">
            <div className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Video Gallery</div>
            <h2 className="text-4xl font-display">Watch & Listen</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {videos.map((v) => (
              <div key={v.title} className="group relative overflow-hidden cursor-pointer">
                <div className="aspect-video">
                  <img src={v.thumb} alt={v.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                </div>
                <div className="absolute inset-0 bg-navy-deep/40 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center text-navy-deep group-hover:scale-110 transition">
                    <Play size={22} fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-navy-deep to-transparent">
                  <h3 className="font-display text-lg">{v.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
