import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white/80 mt-24">
      <div className="container-luxe py-16 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-10 h-10 rounded-sm bg-gradient-gold flex items-center justify-center font-display text-navy-deep font-bold">
              JH
            </span>
            <div>
              <div className="font-display text-white">Jonathan Harrison</div>
              <div className="text-[10px] tracking-[0.25em] uppercase text-gold">Managing Director</div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-white/60">
            Shaping skylines and building sustainable communities for the next generation.
          </p>
        </div>

        <div>
          <h4 className="text-white text-sm tracking-[0.2em] uppercase mb-4">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-gold">About</Link></li>
            <li><Link to="/projects" className="hover:text-gold">Projects</Link></li>
            <li><Link to="/leadership" className="hover:text-gold">Leadership</Link></li>
            <li><Link to="/blog" className="hover:text-gold">Insights</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm tracking-[0.2em] uppercase mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex gap-2"><MapPin size={16} className="text-gold mt-0.5 shrink-0" /> Business Bay Tower, Downtown Business District, Dubai, UAE</li>
            <li className="flex gap-2"><Phone size={16} className="text-gold shrink-0" /> +971 4 555 0199</li>
            <li className="flex gap-2"><Mail size={16} className="text-gold shrink-0" /> office@primehorizon.ae</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm tracking-[0.2em] uppercase mb-4">Follow</h4>
          <div className="flex gap-3">
            {[Linkedin, Twitter, Instagram, Facebook].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-navy-deep transition">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-luxe py-6 flex flex-col md:flex-row justify-between gap-2 text-xs text-white/50">
          <span>© {new Date().getFullYear()} Prime Horizon Developments Ltd. All rights reserved.</span>
          <span>Crafted with vision and precision.</span>
        </div>
      </div>
    </footer>
  );
}
