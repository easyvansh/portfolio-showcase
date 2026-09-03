"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useState } from "react";

const whatsapp = "";
const ease = [0.22, 1, 0.36, 1] as const;

type DanceClass = { name: string; level: string; days: string; time: string; image: string; alt: string };
type ScheduleItem = { day: string; time: string; name: string; detail: string };

const danceClasses: DanceClass[] = [
  { name: "Hip-Hop", level: "Beginner friendly", days: "Tue · Thu · Sat", time: "6:00 PM", image: "/rhythm-house/hip-hop-v2.jpg", alt: "Hip-hop dancer performing a dynamic floor move" },
  { name: "Bollywood", level: "All levels", days: "Mon · Wed · Fri", time: "7:00 PM", image: "/rhythm-house/bollywood-v2.jpg", alt: "Bollywood dancers performing together on stage" },
  { name: "Zumba", level: "Dance fitness", days: "Monday to Saturday", time: "7:00 AM", image: "/rhythm-house/zumba-v2.jpg", alt: "Instructor leading an energetic group Zumba session" },
  { name: "Kids Dance", level: "Ages 7–12", days: "Mon · Wed · Sat", time: "4:00 PM", image: "/rhythm-house/kids-v2.jpg", alt: "Dance teacher guiding children through a studio class" },
];

const schedule: ScheduleItem[] = [
  { day: "Mon–Sat", time: "7:00 AM", name: "Zumba", detail: "45 min · All levels" },
  { day: "Mon · Wed · Sat", time: "4:00 PM", name: "Kids Dance", detail: "60 min · Ages 7–12" },
  { day: "Tue · Thu · Sat", time: "6:00 PM", name: "Hip-Hop", detail: "60 min · Beginner" },
  { day: "Mon · Wed · Fri", time: "7:00 PM", name: "Bollywood", detail: "60 min · All levels" },
];

const navLinks = [["Classes", "#classes"], ["Timings", "#schedule"], ["Weddings", "#weddings"], ["Visit", "#visit"]] as const;

function WhatsAppLink({ message, children, className = "" }: { message: string; children: React.ReactNode; className?: string }) {
  return <a className={className} href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer">{children}</a>;
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .18 }} transition={{ duration: .55, ease }}>{children}</motion.div>;
}

function TrialSheet({ open, close, initialClass }: { open: boolean; close: () => void; initialClass: string }) {
  const [interest, setInterest] = useState(initialClass);
  const [name, setName] = useState("");
  useEffect(() => {
    if (!open) return;
    setInterest(initialClass);
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && close();
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKeyDown); };
  }, [open, initialClass, close]);
  const message = `Hi Rhythm House! I’m ${name || "interested in joining"} and would like a free trial for ${interest}. Please share the next available batch.`;
  return <AnimatePresence>{open && <motion.div className="rh-backdrop" onMouseDown={event => event.target === event.currentTarget && close()} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.section className="rh-sheet" role="dialog" aria-modal="true" aria-labelledby="trial-title" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ type: "spring", stiffness: 360, damping: 34 }}><button className="rh-close" onClick={close} aria-label="Close trial form">×</button><span className="rh-eyebrow">Free trial class</span><h2 id="trial-title">Your first step<br/><em>starts here.</em></h2><p>Choose a class and continue on WhatsApp. No long form and no payment required.</p><div className="rh-quick-form"><label>Class<select value={interest} onChange={event => setInterest(event.target.value)}>{["Not sure yet", ...danceClasses.map(item => item.name)].map(item => <option key={item}>{item}</option>)}</select></label><label>Your name <small>optional</small><input value={name} onChange={event => setName(event.target.value)} placeholder="Your name" /></label><WhatsAppLink className="rh-button rh-button-primary" message={message}>Continue on WhatsApp <span>↗</span></WhatsAppLink></div></motion.section></motion.div>}</AnimatePresence>;
}

export default function RhythmHouseSite() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0, .2], [0, reduced ? 0 : 22]);
  const [menu, setMenu] = useState(false);
  const [trial, setTrial] = useState(false);
  const [trialClass, setTrialClass] = useState("Not sure yet");
  const [openFaq, setOpenFaq] = useState(0);
  const openTrial = (value = "Not sure yet") => { setTrialClass(value); setTrial(true); };

  return <main className="rh-site">
    <motion.div className="rh-progress" style={{ scaleX: scrollYProgress }} />
    <a className="rh-back" href="/">← Vansh Studio</a>
    <nav className="rh-nav" aria-label="Main navigation"><a className="rh-logo" href="#top">RHYTHM <span>HOUSE</span></a><div className="rh-nav-links">{navLinks.map(([label, href]) => <a href={href} key={label}>{label}</a>)}</div><button className="rh-button rh-nav-cta" onClick={() => openTrial()}>Free trial <span>↗</span></button><button className="rh-menu-button" onClick={() => setMenu(true)} aria-label="Open menu">Menu</button></nav>

    <AnimatePresence>{menu && <motion.div className="rh-menu" initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }}><div><b>RHYTHM HOUSE</b><button onClick={() => setMenu(false)} aria-label="Close menu">Close ×</button></div>{navLinks.map(([label, href], index) => <motion.a href={href} onClick={() => setMenu(false)} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .05 * index }} key={label}>{label}<span>↗</span></motion.a>)}<button className="rh-menu-trial" onClick={() => { setMenu(false); openTrial(); }}>Book a free trial</button></motion.div>}</AnimatePresence>

    <header className="rh-hero" id="top"><motion.div className="rh-hero-copy" initial="hidden" animate="shown" variants={{ hidden: {}, shown: { transition: { staggerChildren: .09 } } }}><motion.span className="rh-kicker" variants={{ hidden: { opacity: 0, y: 14 }, shown: { opacity: 1, y: 0 } }}>Dance classes · Dehradun</motion.span><motion.h1 variants={{ hidden: { opacity: 0, y: 24 }, shown: { opacity: 1, y: 0 } }}>Move more.<br/><em>Feel alive.</em></motion.h1><motion.p variants={{ hidden: { opacity: 0, y: 16 }, shown: { opacity: 1, y: 0 } }}>Friendly dance, fitness and kids’ classes near Rajpur Road. Your first class is free.</motion.p><motion.div className="rh-hero-actions" variants={{ hidden: { opacity: 0, y: 14 }, shown: { opacity: 1, y: 0 } }}><button className="rh-button rh-button-primary" onClick={() => openTrial()}>Book a free trial <span>↗</span></button><a className="rh-button rh-button-quiet" href="#schedule">See timings <span>↓</span></a></motion.div><motion.div className="rh-hero-notes" variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}><span>Beginner friendly</span><span>Morning + evening</span><span>Kids + adults</span></motion.div></motion.div><motion.div className="rh-hero-image" style={{ y: imageY }}><Image src="/rhythm-house/hero.png" alt="Instructor leading a focused group dance class" fill priority sizes="(max-width: 800px) 100vw, 48vw" /><span className="rh-image-badge"><b>4</b> styles<br/>one studio</span></motion.div></header>

    <section className="rh-section rh-classes" id="classes"><Reveal className="rh-section-heading"><div><span className="rh-eyebrow">01 · Classes</span><h2>There’s a class<br/><em>for your rhythm.</em></h2></div><p>Start from zero, return after a break, or train for your next performance.</p></Reveal><div className="rh-class-grid">{danceClasses.map((item, index) => <motion.article className="rh-class-card" key={item.name} initial={reduced ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06, duration: .45 }} whileHover={reduced ? undefined : { y: -5 }}><div className="rh-card-image"><Image src={item.image} alt={item.alt} fill sizes="(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 25vw" /><span>{item.level}</span></div><div className="rh-card-copy"><h3>{item.name}</h3><p>{item.days}<br/><b>{item.time}</b></p></div><button onClick={() => openTrial(item.name)}>Try it free <span>↗</span></button></motion.article>)}</div></section>

    <section className="rh-schedule" id="schedule"><Reveal className="rh-section-heading"><div><span className="rh-eyebrow">02 · Weekly timings</span><h2>Find your<br/><em>time to move.</em></h2></div><p>Choose a batch, then confirm availability on WhatsApp before you visit.</p></Reveal><div className="rh-schedule-list">{schedule.map(item => <div className="rh-schedule-row" key={item.name}><span>{item.day}</span><strong>{item.time}</strong><h3>{item.name}</h3><p>{item.detail}</p><button onClick={() => openTrial(item.name)}>Book trial ↗</button></div>)}</div></section>

    <section className="rh-section rh-benefits"><Reveal className="rh-section-heading compact"><div><span className="rh-eyebrow">Why Rhythm House</span><h2>A good place<br/><em>to begin.</em></h2></div></Reveal><div className="rh-benefit-grid">{[["01","Welcoming from day one","Clear steps and patient, beginner-friendly teaching.","✓"],["02","Try before you join","Take a free class and meet your instructor first.","↗"],["03","Small batch energy","Personal feedback with all the buzz of a group.","✦"]].map(([number, title, copy, icon]) => <article key={number}><span>{number}</span><i aria-hidden="true">{icon}</i><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

    <section className="rh-section rh-testimonials"><Reveal className="rh-section-heading compact"><div><span className="rh-eyebrow">Student stories</span><h2>Come as<br/><em>you are.</em></h2></div></Reveal><div className="rh-quote-grid"><blockquote><span className="rh-stars" aria-label="5 out of 5 stars">★★★★★</span><p>“I had never taken a dance class before. By the second week, I knew the steps and felt completely at home in the batch.”</p><footer><b>Riya S.</b><small>Hip-Hop beginner · Rajpur Road</small></footer></blockquote><blockquote><span className="rh-stars" aria-label="5 out of 5 stars">★★★★★</span><p>“My daughter counts down to every Saturday class. The instructor is patient, organised and keeps every child involved.”</p><footer><b>Megha Arora</b><small>Parent · Kids Dance</small></footer></blockquote></div><p className="rh-review-note">Sample testimonials for the Rhythm House concept.</p></section>

    <section className="rh-wedding" id="weddings"><div className="rh-wedding-image"><Image src="/rhythm-house/wedding.jpg" alt="Couple celebrating together at an Indian wedding" fill sizes="(max-width: 800px) 100vw, 50vw" /></div><Reveal className="rh-wedding-copy"><span className="rh-eyebrow">Wedding choreography</span><h2>Your people.<br/><em>Your songs.</em></h2><p>Easy, joyful choreography for couples, families and friends—planned around your comfort and rehearsal time.</p><WhatsAppLink className="rh-button rh-button-dark" message="Hi Rhythm House! I’d like to discuss choreography for an upcoming event.">Plan our sangeet <span>↗</span></WhatsAppLink></Reveal></section>

    <section className="rh-section rh-faq"><Reveal className="rh-section-heading"><div><span className="rh-eyebrow">03 · Quick answers</span><h2>Before your<br/><em>first class.</em></h2></div></Reveal><div className="rh-faq-list">{[["Can complete beginners join?","Absolutely. Beginner batches start with the foundations and move at a comfortable pace."],["Is the trial class free?","Yes. Choose a class and ask for the next available free trial on WhatsApp."],["What should I wear?","Wear comfortable clothes, clean indoor shoes and bring a water bottle."],["Do you teach wedding choreography?","Yes—for couples, families, friends and full-group performances."]].map(([question, answer], index) => <article key={question}><button aria-expanded={openFaq === index} aria-controls={`faq-${index}`} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>0{index + 1}</span><b>{question}</b><i>{openFaq === index ? "−" : "+"}</i></button><AnimatePresence initial={false}>{openFaq === index && <motion.div id={`faq-${index}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}><p>{answer}</p></motion.div>}</AnimatePresence></article>)}</div></section>

    <section className="rh-visit" id="visit"><Reveal><span className="rh-eyebrow">Visit the studio</span><h2>Rajpur Road,<br/><em>Dehradun.</em></h2><p>Fictional demo location near Rajpur Road<br/>Monday–Saturday · 7 AM–9 PM</p><div className="rh-contact-actions"><a className="rh-button rh-button-primary" href="https://maps.google.com/?q=Rajpur+Road+Dehradun" target="_blank" rel="noreferrer">Directions ↗</a><WhatsAppLink className="rh-button rh-button-outline" message="Hi Rhythm House! I’d like to know more about your classes.">WhatsApp ↗</WhatsAppLink></div></Reveal><aside><span className="rh-eyebrow">Good to know</span><strong>Free trial<br/>available</strong><ul><li>Beginner-friendly batches</li><li>Kids and adult classes</li><li>Morning and evening options</li></ul></aside></section>

    <footer className="rh-footer"><a className="rh-logo" href="#top">RHYTHM <span>HOUSE</span></a><p>Dance · Fitness · Community<br/>Dehradun, India</p><div>{navLinks.map(([label, href]) => <a href={href} key={label}>{label}</a>)}</div><small>Fictional business concept · Designed by Vansh Studio · 2026</small></footer>
    <div className="rh-mobile-actions"><button onClick={() => openTrial()}>Free trial</button><WhatsAppLink message="Hi Rhythm House! I’d like to know more about your classes.">WhatsApp</WhatsAppLink></div>
    <TrialSheet open={trial} close={() => setTrial(false)} initialClass={trialClass} />
  </main>;
}

