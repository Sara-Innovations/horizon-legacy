import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout, PageHeader } from "@/components/site/Layout";
import { MapPin, Phone, Mail, Send, Linkedin, Twitter, Instagram } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Md Shariful Islam Khandakar" },
      { name: "description", content: "Get in touch with the office of Md Shariful Islam Khandakar, MD & CEO of Landmark Group." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const offices = [
  { city: "Dubai (HQ)", lines: ["Landmark Group", "Business Bay Tower, 42nd Floor", "Downtown Business District", "Dubai, UAE"] },
  { city: "Riyadh", lines: ["King Fahd Road, Olaya Tower", "12th Floor", "Riyadh, Kingdom of Saudi Arabia"] },
  { city: "London", lines: ["8 Berkeley Square", "Mayfair", "London W1J 6DB, United Kingdom"] },
];

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <Layout>
      <PageHeader eyebrow="Contact" title="Start a Conversation" subtitle="For partnership, investment and media enquiries, please reach out to the office of Md Shariful Islam Khandakar." />

      <section className="py-24 container-luxe grid lg:grid-cols-5 gap-16">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h3 className="font-display text-2xl text-navy-deep mb-4">Direct Office</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3"><Phone size={16} className="text-gold mt-1 shrink-0" /> +971 4 555 0199</li>
              <li className="flex items-start gap-3"><Mail size={16} className="text-gold mt-1 shrink-0" /> office@primehorizon.ae</li>
              <li className="flex items-start gap-3"><Mail size={16} className="text-gold mt-1 shrink-0" /> media@primehorizon.ae</li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-2xl text-navy-deep mb-4">Follow</h3>
            <div className="flex gap-3">
              {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-11 h-11 border border-border hover:bg-gold hover:border-gold hover:text-navy-deep flex items-center justify-center transition">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="lg:col-span-3 bg-secondary p-8 md:p-12 space-y-5"
        >
          <h3 className="font-display text-2xl text-navy-deep mb-2">Send a Message</h3>
          <p className="text-sm text-muted-foreground mb-6">We respond to all serious enquiries within two business days.</p>
          <div className="grid md:grid-cols-2 gap-5">
            <input required placeholder="Full Name" className="bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-gold transition" />
            <input required type="email" placeholder="Email Address" className="bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-gold transition" />
          </div>
          <input placeholder="Company / Organization" className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-gold transition" />
          <select className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-gold transition">
            <option>Partnership Enquiry</option>
            <option>Investment Opportunity</option>
            <option>Media & Press</option>
            <option>General Enquiry</option>
          </select>
          <textarea required rows={5} placeholder="Tell us about your enquiry..." className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-gold transition" />
          <button type="submit" className="inline-flex items-center gap-3 bg-navy-deep text-white px-7 py-4 text-sm tracking-wide hover:bg-gradient-gold hover:text-navy-deep transition">
            {sent ? "Message Sent" : "Send Message"} <Send size={14} />
          </button>
        </form>
      </section>

      <section className="py-20 bg-navy-deep text-white">
        <div className="container-luxe">
          <div className="text-center mb-14">
            <div className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Global Offices</div>
            <h2 className="text-4xl font-display">Where We Operate</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {offices.map((o) => (
              <div key={o.city} className="glass p-8">
                <MapPin className="text-gold mb-4" size={24} />
                <h3 className="font-display text-xl mb-3">{o.city}</h3>
                <div className="text-sm text-white/70 space-y-1">
                  {o.lines.map((l) => <div key={l}>{l}</div>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="h-[420px] bg-secondary relative overflow-hidden">
        <iframe
          title="Office location"
          src="https://www.openstreetmap.org/export/embed.html?bbox=55.265%2C25.180%2C55.295%2C25.205&layer=mapnik"
          className="w-full h-full grayscale"
          loading="lazy"
        />
      </section>
    </Layout>
  );
}
