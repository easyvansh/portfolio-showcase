"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const whatsapp =
  "https://wa.me/918630094919?text=Hi%20Vansh%2C%20I%27d%20like%20to%20discuss%20a%20website.";
const ease = [0.22, 1, 0.36, 1] as const;

function Brand({ compact = false }: { compact?: boolean }) {
  return <span className={`brand-lockup ${compact ? "compact" : ""}`}><img src="/logo-mark.svg" alt=""/><span>VANSH<sup>®</sup></span></span>;
}

const projects = [
  {
    n: "01",
    name: "Mysa Café",
    type: "Hospitality",
    line: "A warm, editorial café experience built around discovery and reservations.",
    href: "/mysa",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2200&q=88",
    tone: "chapter-mysa",
  },
  {
    n: "02",
    name: "NOIR Studio",
    type: "Beauty & grooming",
    line: "A premium service and booking experience with a sharp point of view.",
    href: "/noir",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2200&q=88",
    tone: "chapter-noir",
  },
  {
    n: "03",
    name: "Northstar Dental",
    type: "Healthcare",
    line: "A calm, clear clinic experience with guided treatment discovery and appointment booking.",
    href: "/cleaners",
    image:
      "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=2200&q=88",
    tone: "chapter-apex",
  },
];

function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, ease }}
    >
      {children}
    </motion.div>
  );
}

function MagneticLink({ children, className, href, external = false }: { children: React.ReactNode; className: string; href: string; external?: boolean }) {
  return <motion.a className={className} href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}
    onPointerMove={event => { const box=event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty("--mag-x",`${(event.clientX-box.left-box.width/2)*.1}px`); event.currentTarget.style.setProperty("--mag-y",`${(event.clientY-box.top-box.height/2)*.14}px`); }}
    onPointerLeave={event => { event.currentTarget.style.setProperty("--mag-x","0px"); event.currentTarget.style.setProperty("--mag-y","0px"); }}
    whileTap={{scale:.97}}>{children}</motion.a>;
}

export default function StudioHome() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 28);
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(100, window.scrollY / height * 100) : 0);
    };
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const copyEmail = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    await navigator.clipboard.writeText("vansh2@ualberta.ca");
    setToast(true); window.setTimeout(() => setToast(false), 1800);
  };

  return (
    <main className="v2">
      <div className="v2-scroll-progress" style={{ width: `${progress}%` }} />
      <nav className={`v2-nav ${scrolled ? "is-scrolled" : ""}`}>
        <a className="v2-logo" href="#top">
          <Brand />
        </a>
        <div className="v2-nav-meta">
          <span>Independent digital studio</span>
          <span>Dehradun + worldwide</span>
        </div>
        <button className="v2-menu-button" onClick={() => setMenu(true)} aria-label="Open navigation menu">
          <span>Menu</span><i className="hamburger"><b /><b /></i>
        </button>
      </nav>

      <AnimatePresence>
        {menu && (
          <motion.div
            className="menu-overlay"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.65, ease }}
          >
            <div className="menu-top">
              <b><Brand /></b>
              <button onClick={() => setMenu(false)}>Close ×</button>
            </div>
            <div className="menu-list">
              {[
                ["01", "Work", "#work"],
                ["02", "Services", "#services"],
                ["03", "Process", "#process"],
                ["04", "Contact", "#contact"],
              ].map(([n, title, href], i) => (
                <motion.a
                  key={title}
                  href={href}
                  onClick={() => setMenu(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + i * 0.06, duration: 0.5 }}
                >
                  <span>{n}</span>
                  {title}
                  <i>↗</i>
                </motion.a>
              ))}
            </div>
            <p>Simple websites with a clear purpose.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="v2-hero compact-hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orbit" aria-hidden="true">
          <span>DESIGN · DEVELOP · LAUNCH ·</span>
          <img className="hero-brand-mark" src="/logo-mark.svg" alt="" />
        </div>
        <div className="v2-kicker">
          <span>Design + development</span>
          <span>Dehradun, India</span>
        </div>
        <h1>
          {["Websites that", "make businesses", "hard to ignore."].map(
            (line, i) => (
              <span className={i === 2 ? "serif-line" : ""} key={line}>
                <motion.i
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.12 + i * 0.11, ease }}
                >
                  {line}
                </motion.i>
              </span>
            ),
          )}
        </h1>
        <div className="v2-hero-bottom">
          <p>
            I design and build clear, distinctive websites for local businesses.
          </p>
          <div>
            <MagneticLink href="#work" className="pill primary">
              View selected work ↘
            </MagneticLink>
            <MagneticLink href={whatsapp} external className="pill ghost">
              Start a project ↗
            </MagneticLink>
          </div>
        </div>
      </section>

      <section className="chapters" id="work">
        <div className="v2-section-head">
          <span>01 / Selected work</span>
          <p>Three concepts. Three different business problems.</p>
        </div>
        {projects.map((project) => (
          <Reveal
            className={`project-chapter ${project.tone}`}
            key={project.name}
          >
            <a href={project.href}>
              <div className="chapter-meta">
                <span>{project.n}</span>
                <span>{project.type}</span>
                <span>Concept project</span>
                <span>2026</span>
              </div>
              <div className="chapter-image">
                <motion.div
                  style={{ backgroundImage: `url(${project.image})` }}
                  whileHover={{ scale: 1.035 }}
                  transition={{ duration: 0.7, ease }}
                />
                <span className="view-disc">View<br />site ↗</span>
              </div>
              <div className="chapter-copy">
                <h2>{project.name}</h2>
                <div>
                  <h3>{project.line}</h3>
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </section>

      <section className="outcomes" id="services">
        <div className="v2-section-head inverse">
          <span>02 / Services</span>
          <p>Only what your business actually needs.</p>
        </div>
        <Reveal>
          <h2>
            Strategy, design<br />and <em>development.</em>
          </h2>
        </Reveal>
        <div className="outcome-grid">
          {[
            ["Business websites", "Focused websites that build trust and generate enquiries."],
            ["Booking experiences", "Simple service, menu and appointment journeys."],
            ["Launch support", "Responsive build, SEO foundations, analytics and handover."],
          ].map(([title, copy], i) => (
            <motion.article
              onPointerMove={event => { const box=event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty("--spot-x",`${event.clientX-box.left}px`); event.currentTarget.style.setProperty("--spot-y",`${event.clientY-box.top}px`); }}
              key={title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <span>0{i + 1}</span><i className="service-icon" aria-hidden="true">{["◇","⌁","↗"][i]}</i>
              <h3>{title}</h3>
              <p>{copy}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="process-v2" id="process">
        <div className="v2-section-head">
          <span>03 / Process</span>
          <p>One direct point of contact from start to finish.</p>
        </div>
        <div className="process-stack">
          {[
            ["01", "Define", "We agree on the goal, content and scope."],
            ["02", "Design", "You review the visual direction and key screens."],
            ["03", "Build", "I develop, test and launch the finished website."],
          ].map(([n, title, copy]) => (
            <Reveal className="process-row" key={n}>
              <span>{n}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="contact-v2" id="contact">
        <div className="availability-marquee" aria-label="Available for projects"><div>AVAILABLE FOR PROJECTS — LET&apos;S TALK — AVAILABLE FOR PROJECTS — LET&apos;S TALK — </div><div aria-hidden="true">AVAILABLE FOR PROJECTS — LET&apos;S TALK — AVAILABLE FOR PROJECTS — LET&apos;S TALK — </div></div>
        <span>Have a project in mind?</span>
        <h2>
          Let’s make it<br /><em>worth visiting.</em>
        </h2>
        <div>
          <a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp ↗</a>
          <a href="tel:+918630094919">Call ↗</a>
          <a href="mailto:vansh2@ualberta.ca" onClick={copyEmail}>Email ↗</a>
        </div>
      </section>

      <AnimatePresence>{toast && <motion.div className="copy-toast" role="status" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:8}}>Email copied ✓</motion.div>}</AnimatePresence>

      <footer className="footer-v2">
        <b><Brand compact /></b>
        <p>Independent digital studio<br />Dehradun · India</p>
        <p>Concept projects are clearly marked.<br />© 2026 Vansh Studio</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
