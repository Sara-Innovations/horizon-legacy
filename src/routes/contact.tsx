import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout, PageHeader } from "@/components/site/Layout";
import { MapPin, Phone, Mail, Send, Linkedin, Twitter, Instagram } from "lucide-react";
import { offices } from "@/data/site";

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

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <Layout>
      <PageHeader eyebrow="Contact" title="Start a Conversation" subtitle="For partnership, investment and media enquiries, please reach out to the office of Md Shariful Islam Khandakar." />

      <section className="py-24 container-luxe grid lg:grid-cols-5 gap-16">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h3 className="font-display text-2xl text-foreground mb-4">Direct Office</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3"><Phone size={16} className="text-gold mt-1 shrink-0" /> +880 1700-000000</li>
              <li className="flex items-start gap-3"><Mail size={16} className="text-gold mt-1 shrink-0" /> landmarkldltd@gmail.com</li>
              <li className="flex items-start gap-3"><MapPin size={16} className="text-gold mt-1 shrink-0" /> 49 Siddique Tower, Mohakhali C/A, Dhaka 1212</li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-2xl text-foreground mb-4">Follow</h3>
            <div className="flex gap-3">
              {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-11 h-11 border border-border text-foreground hover:bg-gold hover:border-gold hover:text-navy-deep flex items-center justify-center transition">
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
          <h3 className="font-display text-2xl text-foreground mb-2">Send a Message</h3>
          <p className="text-sm text-muted-foreground mb-6">We respond to all serious enquiries within two business days.</p>
          <div className="grid md:grid-cols-2 gap-5">
            <input required placeholder="Full Name" className="bg-background text-foreground border border-border px-4 py-3 text-sm focus:outline-none focus:border-gold transition" />
            <input required type="email" placeholder="Email Address" className="bg-background text-foreground border border-border px-4 py-3 text-sm focus:outline-none focus:border-gold transition" />
          </div>
          <input placeholder="Company / Organization" className="w-full bg-background text-foreground border border-border px-4 py-3 text-sm focus:outline-none focus:border-gold transition" />
          <select className="w-full bg-background text-foreground border border-border px-4 py-3 text-sm focus:outline-none focus:border-gold transition">
            <option>Partnership Enquiry</option>
            <option>Investment Opportunity</option>
            <option>Media & Press</option>
            <option>General Enquiry</option>
          </select>
          <textarea required rows={5} placeholder="Tell us about your enquiry..." className="w-full bg-background text-foreground border border-border px-4 py-3 text-sm focus:outline-none focus:border-gold transition" />
          <button type="submit" className="inline-flex items-center gap-3 bg-navy-deep text-white px-7 py-4 text-sm tracking-wide hover:bg-gradient-gold hover:text-navy-deep transition">
            {sent ? "Message Sent" : "Send Message"} <Send size={14} />
          </button>
        </form>
      </section>

      <section className="py-20 bg-navy-deep text-white">
        <div className="container-luxe">
          <div className="text-center mb-14">
            <div className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Offices in Bangladesh</div>
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
          title="Office location — Siddique Tower, Mohakhali, Dhaka"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d82611.61750202533!2d90.36427647882023!3d23.784717003047668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c771567dc1e9%3A0x299f1a6c628a2b78!2sSiddique%20Tower!5e0!3m2!1sen!2sbd!4v1780821453408!5m2!1sen!2sbd"
          className="w-full h-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </Layout>
  );
}
