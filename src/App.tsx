
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  Menu,
  X,
  Hammer,
  ImageIcon,
  Info,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  Wrench,
  Building2,
  Facebook,
  Instagram,
  Youtube,
  ArrowRight,
} from "lucide-react";

const useHashRoute = () => {
  const [hash, setHash] = useState(
    typeof window !== "undefined" ? window.location.hash.replace("#", "") || "/" : "/"
  );
  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash.replace("#", "") || "/");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  return hash.startsWith("/") ? hash : `/${hash}`;
};

const HeadTags: React.FC<{
  title?: string;
  description?: string;
  path?: string;
}> = ({ title = "TruView Glass", description = "Premium glass solutions: shower screens, balustrades, mirrors & more.", path = "/" }) => {
  const url = `https://truview.glass${path}`;

  useEffect(() => {
    document.title = title;

    const metaPairs: [string, string, string][] = [
      ["name", "description", description],
      ["property", "og:title", title],
      ["property", "og:description", description],
      ["property", "og:type", "website"],
      ["property", "og:url", url],
      ["name", "twitter:card", "summary_large_image"],
      ["name", "twitter:title", title],
      ["name", "twitter:description", description],
    ];

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", url);

    const created: HTMLMetaElement[] = [];
    metaPairs.forEach(([k, name, content]) => {
      let el = document.querySelector(`meta[${k}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(k, name);
        document.head.appendChild(el);
        created.push(el);
      }
      el.setAttribute("content", content as string);
    });

    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "name": "TruView Glass",
          "url": "https://truview.glass",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://truview.glass/search?q={query}",
            "query-input": "required name=query"
          }
        },
        {
          "@type": "Organization",
          "name": "TruView Glass",
          "url": "https://truview.glass",
          "logo": "https://truview.glass/logo.png",
          "sameAs": [
            "https://www.facebook.com/yourpage",
            "https://www.instagram.com/yourprofile",
            "https://www.youtube.com/@yourchannel"
          ]
        }
      ]
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      created.forEach((m) => m.remove());
      script.remove();
    };
  }, [title, description, url]);

  return null;
};

const Container: React.FC<{ className?: string }> = ({ className = "", children }) => (
  <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const GlassCard: React.FC<{ className?: string }> = ({ className = "", children }) => (
  <div
    className={
      "rounded-2xl p-6 shadow-xl backdrop-blur-xl border border-white/20 bg-white/10 " +
      "[--glass:linear-gradient(135deg,rgba(255,255,255,.18),rgba(255,255,255,.06))] " +
      "bg-[image:var(--glass)] " +
      className
    }
  >
    {children}
  </div>
);

const Hero: React.FC = () => (
  <div className="relative overflow-hidden">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(59,130,246,0.20),transparent_60%)]" />
    <Container className="pt-24 pb-20">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white drop-shadow-lg">
            Crystal-clear craftsmanship for modern spaces
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Shower screens, balustrades, mirrors & bespoke glasswork — precision installed with a lifetime focus on safety and style.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#/contact" className="inline-flex items-center rounded-xl bg-white/90 hover:bg-white text-slate-900 px-5 py-3 font-medium shadow">
              Get a quote <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a href="#/services" className="inline-flex items-center rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 px-5 py-3 text-white">
              Our services
            </a>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
          <GlassCard className="relative">
            <div className="aspect-[4/3] rounded-xl overflow-hidden ring-1 ring-white/20">
              <img
                alt="Showcase of premium glass installation"
                className="h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1542718610-a1d656d1884a?q=80&w=1600&auto=format&fit=crop"
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-white/90">
              {[
                { icon: ShieldCheck, label: "Qualified & Insured" },
                { icon: Sparkles, label: "Premium Finishes" },
                { icon: Wrench, label: "Clean Install" },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <f.icon className="h-5 w-5" />
                  <span>{f.label}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </Container>
  </div>
);

const Bento: React.FC = () => (
  <Container className="py-16">
    <div className="grid md:grid-cols-3 gap-6">
      <GlassCard className="md:col-span-2">
        <div className="flex items-start gap-4">
          <ImageIcon className="h-8 w-8 text-white" />
          <div>
            <h3 className="text-xl font-semibold text-white">Custom shower screens</h3>
            <p className="text-white/80 mt-2">Frameless, semi-frameless & framed options tailored to your space.</p>
          </div>
        </div>
      </GlassCard>
      <GlassCard>
        <div className="flex items-start gap-4">
          <Building2 className="h-8 w-8 text-white" />
          <div>
            <h3 className="text-xl font-semibold text-white">Commercial fit-outs</h3>
            <p className="text-white/80 mt-2">Shopfronts, partitions & safety glass compliance.</p>
          </div>
        </div>
      </GlassCard>
      <GlassCard>
        <div className="flex items-start gap-4">
          <Sparkles className="h-8 w-8 text-white" />
          <div>
            <h3 className="text-xl font-semibold text-white">Mirrors & splashbacks</h3>
            <p className="text-white/80 mt-2">Perfectly measured, perfectly installed, every time.</p>
          </div>
        </div>
      </GlassCard>
      <GlassCard className="md:col-span-2">
        <div className="flex items-start gap-4">
          <ShieldCheck className="h-8 w-8 text-white" />
          <div>
            <h3 className="text-xl font-semibold text-white">Balustrades & pool fencing</h3>
            <p className="text-white/80 mt-2">Engineered safety with an uninterrupted view.</p>
          </div>
        </div>
      </GlassCard>
    </div>
  </Container>
);

const CTA: React.FC = () => (
  <Container className="py-10">
    <GlassCard className="flex flex-col md:flex-row items-center justify-between gap-6">
      <div>
        <h3 className="text-2xl font-semibold text-white">Ready to upgrade with glass?</h3>
        <p className="text-white/80 mt-1">Fast quoting. Quality workmanship. Local support.</p>
      </div>
      <a href="#/contact" className="inline-flex items-center rounded-xl bg-white/90 hover:bg-white text-slate-900 px-5 py-3 font-medium shadow">
        Contact us <ArrowRight className="ml-2 h-5 w-5" />
      </a>
    </GlassCard>
  </Container>
);

const PrivacyPage: React.FC = () => (
  <>
    <HeadTags title="Privacy Policy | TruView Glass" path="/privacy" description="How TruView Glass handles your data and privacy." />
    <Container className="py-16">
      <GlassCard>
        <h2 className="text-3xl font-semibold text-white">Privacy Policy</h2>
        <p className="text-white/80 mt-4">We respect your privacy. We only collect information necessary to respond to enquiries and deliver services. We do not sell your data. You may request access or deletion at any time by contacting <span className="underline">hello@truview.glass</span>.</p>
        <ul className="list-disc pl-6 mt-6 text-white/80 space-y-2">
          <li>Data we collect: contact details, project info, correspondence.</li>
          <li>Use: quotes, scheduling, service delivery, invoicing.</li>
          <li>Storage: secure cloud services located in Australia or trusted regions.</li>
          <li>Retention: only as long as needed for legal and operational purposes.</li>
        </ul>
      </GlassCard>
    </Container>
  </>
);

const TermsPage: React.FC = () => (
  <>
    <HeadTags title="Terms & Conditions | TruView Glass" path="/terms" description="Terms of using the TruView Glass website and services." />
    <Container className="py-16">
      <GlassCard>
        <h2 className="text-3xl font-semibold text-white">Terms & Conditions</h2>
        <p className="text-white/80 mt-4">By engaging TruView Glass you agree to our standard terms: quotes valid for 30 days; site access and measurements must be accurate; custom glass orders are non-refundable except under Australian consumer law.</p>
        <ul className="list-disc pl-6 mt-6 text-white/80 space-y-2">
          <li>Payment terms: as quoted; deposits may be required for custom fabrication.</li>
          <li>Warranty: workmanship guaranteed; materials covered by manufacturer warranties.</li>
          <li>Risk & safety: we comply with relevant Australian Standards for glazing.</li>
          <li>Liability: limited to the fullest extent permitted by law.</li>
        </ul>
      </GlassCard>
    </Container>
  </>
);

const HomePage: React.FC = () => (
  <>
    <HeadTags title="TruView Glass — Premium Glass Installations" path="/" />
    <Hero />
    <Bento />
    <CTA />
  </>
);

const AboutPage: React.FC = () => (
  <>
    <HeadTags title="About | TruView Glass" path="/about" description="Learn about TruView Glass — values, qualifications and safety-first workmanship." />
    <Container className="py-16">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <GlassCard>
          <h2 className="text-3xl font-semibold text-white flex items-center gap-3"><Info className="h-7 w-7" /> Our story</h2>
          <p className="mt-4 text-white/80">
            TruView Glass delivers precise, reliable glass solutions for homes and businesses. Our team blends craftsmanship with compliance, ensuring your project looks stunning and meets Australian standards.
          </p>
          <ul className="mt-6 space-y-3 text-white/90">
            <li className="flex items-center gap-3"><ShieldCheck className="h-5 w-5" /> Licensed & insured installers</li>
            <li className="flex items-center gap-3"><Hammer className="h-5 w-5" /> Clean site, on-time delivery</li>
            <li className="flex items-center gap-3"><Sparkles className="h-5 w-5" /> Attention to detail, end-to-end</li>
          </ul>
        </GlassCard>
        <GlassCard>
          <div className="aspect-video rounded-xl overflow-hidden ring-1 ring-white/20">
            <img
              alt="Team installing frameless glass balustrade"
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1590645879212-59f3b6a055fa?q=80&w=1600&auto=format&fit=crop"
            />
          </div>
        </GlassCard>
      </div>
    </Container>
  </>
);

const ServicesPage: React.FC = () => (
  <>
    <HeadTags title="Services | TruView Glass" path="/services" description="Shower screens, mirrors, balustrades, pool fencing, shopfronts & more." />
    <Container className="py-16">
      <h2 className="text-3xl font-semibold text-white">Services</h2>
      <p className="text-white/80 mt-2">We measure, fabricate and install to spec. Here’s what we specialise in:</p>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
        {[
          {
            title: "Frameless shower screens",
            copy: "Minimal hardware. Maximum clarity.",
          },
          { title: "Mirrors", copy: "Polished edges, custom sizing & mounting." },
          { title: "Balustrades", copy: "Stainless hardware with compliant spans." },
          { title: "Pool fencing", copy: "Safe, elegant, corrosion-resistant." },
          { title: "Splashbacks", copy: "Painted & printed glass options." },
          { title: "Commercial shopfronts", copy: "Toughened glass, aluminium framing." },
        ].map((s) => (
          <GlassCard key={s.title}>
            <h3 className="text-xl font-semibold text-white">{s.title}</h3>
            <p className="text-white/80 mt-1">{s.copy}</p>
          </GlassCard>
        ))}
      </div>
    </Container>
  </>
);

const GalleryPage: React.FC = () => (
  <>
    <HeadTags title="Gallery | TruView Glass" path="/gallery" description="Browse recent installations and glasswork projects by TruView Glass." />
    <Container className="py-16">
      <h2 className="text-3xl font-semibold text-white">Gallery</h2>
      <p className="text-white/80 mt-2">A snapshot of recent work. High-clarity, clean lines, precise installs.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {[
          "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=1600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?q=80&w=1600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1523419409543-a9be2a93139b?q=80&w=1600&auto=format&fit=crop",
        ].map((src, i) => (
          <div key={i} className="relative group overflow-hidden rounded-xl ring-1 ring-white/20">
            <img src={src} alt="TruView project" className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
        ))}
      </div>
    </Container>
  </>
);

const ContactPage: React.FC = () => (
  <>
    <HeadTags title="Contact | TruView Glass" path="/contact" description="Request a quote or ask a question — TruView Glass." />
    <Container className="py-16">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <GlassCard>
          <h2 className="text-3xl font-semibold text-white">Get a quote</h2>
          <p className="text-white/80 mt-2">Tell us about your project and we’ll come back with options and timelines.</p>
          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm text-white/80">Name</label>
              <input className="mt-1 w-full rounded-xl bg-white/80 px-4 py-3 text-slate-900 placeholder-slate-500 outline-none" placeholder="Jane Doe" required />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-white/80">Email</label>
                <input type="email" className="mt-1 w-full rounded-xl bg-white/80 px-4 py-3 text-slate-900 placeholder-slate-500 outline-none" placeholder="jane@email.com" required />
              </div>
              <div>
                <label className="block text-sm text-white/80">Phone</label>
                <input className="mt-1 w-full rounded-xl bg-white/80 px-4 py-3 text-slate-900 placeholder-slate-500 outline-none" placeholder="0400 000 000" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-white/80">Message</label>
              <textarea rows={5} className="mt-1 w-full rounded-xl bg-white/80 px-4 py-3 text-slate-900 placeholder-slate-500 outline-none" placeholder="Project details, dimensions, timelines..." />
            </div>
            <button className="inline-flex items-center rounded-xl bg-white/90 hover:bg-white text-slate-900 px-5 py-3 font-medium shadow" type="submit">
              Send enquiry
            </button>
          </form>
        </GlassCard>
        <GlassCard>
          <h3 className="text-xl font-semibold text-white">Contact details</h3>
          <ul className="mt-4 space-y-3 text-white/90">
            <li className="flex items-center gap-3"><Phone className="h-5 w-5" /> 0400 000 000</li>
            <li className="flex items-center gap-3"><Mail className="h-5 w-5" /> hello@truview.glass</li>
            <li className="flex items-center gap-3"><MapPin className="h-5 w-5" /> Your City, VIC</li>
          </ul>
          <div className="mt-6 flex gap-3">
            <a href="#" aria-label="Facebook" className="p-2 rounded-lg bg-white/10 hover:bg-white/20 ring-1 ring-white/20"><Facebook className="h-5 w-5 text-white" /></a>
            <a href="#" aria-label="Instagram" className="p-2 rounded-lg bg-white/10 hover:bg-white/20 ring-1 ring-white/20"><Instagram className="h-5 w-5 text-white" /></a>
            <a href="#" aria-label="YouTube" className="p-2 rounded-lg bg-white/10 hover:bg-white/20 ring-1 ring-white/20"><Youtube className="h-5 w-5 text-white" /></a>
          </div>
        </GlassCard>
      </div>
    </Container>
  </>
);

const Nav: React.FC = () => {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#/", label: "Home" },
    { href: "#/about", label: "About" },
    { href: "#/services", label: "Services" },
    { href: "#/gallery", label: "Gallery" },
    { href: "#/contact", label: "Contact" },
  ];
  return (
    <div className="fixed top-0 inset-x-0 z-50">
      <Container className="py-4">
        <div className="rounded-2xl px-4 py-3 backdrop-blur-xl border border-white/20 bg-white/10 shadow-xl">
          <div className="flex items-center justify-between">
            <a href="#/" className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-white/80 grid place-items-center ring-1 ring-white/30">
                <ImageIcon className="h-5 w-5 text-slate-900" />
              </div>
              <span className="text-white font-semibold tracking-wide">TruView Glass</span>
            </a>
            <div className="hidden md:flex items-center gap-6">
              {links.map((l) => (
                <a key={l.href} href={l.href} className="text-white/90 hover:text-white">
                  {l.label}
                </a>
              ))}
              <a href="#/contact" className="inline-flex items-center rounded-xl bg-white/90 hover:bg-white text-slate-900 px-4 py-2 font-medium shadow">
                Get a quote
              </a>
            </div>
            <button className="md:hidden p-2 rounded-lg bg-white/10 ring-1 ring-white/20" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
              {open ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
            </button>
          </div>
          {open && (
            <div className="md:hidden mt-3 border-t border-white/20 pt-3 grid gap-2">
              {links.map((l) => (
                <a key={l.href} href={l.href} className="text-white/90 hover:text-white px-1 py-2">
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

const Footer: React.FC = () => (
  <footer className="mt-20">
    <Container className="pb-14">
      <div className="rounded-2xl px-6 py-8 backdrop-blur-xl border border-white/20 bg-white/10 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="text-white font-semibold">TruView Glass</div>
            <div className="text-white/70 text-sm">© {new Date().getFullYear()} All rights reserved.</div>
          </div>
          <div className="flex gap-4 text-white/80">
            <a href="#/privacy" className="hover:text-white">Privacy</a>
            <a href="#/terms" className="hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </Container>
  </footer>
);

const PageFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-[linear-gradient(120deg,#0f172a,#0b1220)]">
    <div className="absolute inset-0 -z-10 opacity-50" aria-hidden>
      <div className="absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full blur-3xl bg-cyan-500/20" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full blur-3xl bg-indigo-500/20" />
    </div>
    <Nav />
    <main className="pt-24">{children}</main>
    <Footer />
  </div>
);

const RouterView: React.FC = () => {
  const route = useHashRoute();
  const Page = useMemo(() => {
    switch (route) {
        case "/about":
          return <AboutPage />;
        case "/services":
          return <ServicesPage />;
        case "/gallery":
          return <GalleryPage />;
        case "/contact":
          return <ContactPage />;
        case "/privacy":
          return <PrivacyPage />;
        case "/terms":
          return <TermsPage />;
        default:
        return <HomePage />;
    }
  }, [route]);
  return <PageFrame>{Page}</PageFrame>;
};

export default function App() {
  return <RouterView />;
}
