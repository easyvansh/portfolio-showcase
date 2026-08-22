"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import {DemoScrollIsland} from "../components/demo-ui";

type Service = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  duration: number;
  maintenance: string;
  artists: string[];
};

type Artist = {
  id: string;
  name: string;
  role: string;
  specialty: string;
  availability: string;
  image: string;
};

const services: Service[] = [
  { id: "noir-cut", name: "The Noir Cut", category: "Cut", description: "A considered cut shaped around your texture, routine and natural movement.", price: 1200, duration: 75, maintenance: "6–10 weeks", artists: ["maya", "aarav"] },
  { id: "balayage", name: "Dimensional Balayage", category: "Colour", description: "Hand-painted dimension with a soft grow-out and a finish designed for your skin tone.", price: 4500, duration: 210, maintenance: "Low–medium", artists: ["maya", "simran"] },
  { id: "gloss", name: "Gloss + Blow-dry", category: "Colour", description: "A tone-refreshing gloss followed by a polished signature blow-dry.", price: 1800, duration: 90, maintenance: "6–8 weeks", artists: ["maya", "simran"] },
  { id: "scalp", name: "Scalp Reset", category: "Treatments", description: "A clarifying scalp ritual with massage, hydration and a clean finish.", price: 1600, duration: 60, maintenance: "Monthly", artists: ["maya", "aarav"] },
  { id: "keratin", name: "Keratin Smoothing", category: "Treatments", description: "Controlled smoothing that reduces frizz while preserving natural movement.", price: 5500, duration: 180, maintenance: "3–5 months", artists: ["simran"] },
  { id: "grooming", name: "Cut + Beard Design", category: "Men", description: "A precision haircut, beard shape and finishing consultation.", price: 1350, duration: 75, maintenance: "3–5 weeks", artists: ["aarav"] },
  { id: "gel", name: "Gel Manicure", category: "Nails", description: "Nail preparation, shaping and long-wear gel colour.", price: 1400, duration: 75, maintenance: "2–3 weeks", artists: ["ria"] },
  { id: "makeup", name: "Event Makeup", category: "Makeup", description: "Modern occasion makeup shaped around your features, outfit and setting.", price: 3500, duration: 90, maintenance: "Event day", artists: ["ria"] },
  { id: "bridal", name: "Bridal Signature", category: "Bridal", description: "A complete bridal hair and makeup experience, including consultation and trial.", price: 18000, duration: 240, maintenance: "Consultation required", artists: ["ria", "simran"] },
];

const artists: Artist[] = [
  { id: "maya", name: "Maya Khan", role: "Senior Stylist", specialty: "Balayage · Layers · Colour", availability: "Today · 4:30 PM", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1000&q=85" },
  { id: "ria", name: "Ria Mehta", role: "Beauty Artist", specialty: "Bridal · Makeup · Nails", availability: "Tomorrow · 11:00 AM", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85" },
  { id: "aarav", name: "Aarav Sethi", role: "Grooming Director", specialty: "Cuts · Fades · Grooming", availability: "Today · 6:15 PM", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=85" },
  { id: "simran", name: "Simran Kaur", role: "Colour Director", specialty: "Colour correction · Texture", availability: "Saturday · 12:30 PM", image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1000&q=85" },
];

const dates = ["Sat 22", "Sun 23", "Mon 24", "Tue 25", "Wed 26"];
const times = ["10:00 AM", "11:30 AM", "1:00 PM", "3:30 PM", "5:00 PM", "6:30 PM"];
const colours = [
  ["Espresso", "#2d201c"], ["Chestnut", "#6c3d2b"], ["Caramel", "#a56539"],
  ["Honey", "#c58b52"], ["Copper", "#9d4d32"], ["Burgundy", "#5b1f2a"], ["Platinum", "#d9d4cb"],
];

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .7, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}

export default function NoirDemo() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [detail, setDetail] = useState<Service | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState("balayage");
  const [artistId, setArtistId] = useState("maya");
  const [date, setDate] = useState(dates[0]);
  const [time, setTime] = useState(times[3]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [success, setSuccess] = useState(false);
  const [colour, setColour] = useState("Espresso");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filtered = useMemo(() => services.filter((service) =>
    (category === "All" || service.category === category) &&
    `${service.name} ${service.description}`.toLowerCase().includes(query.toLowerCase())
  ), [category, query]);

  const selectedService = services.find((service) => service.id === serviceId) ?? services[0];
  const relevantArtists = artists.filter((artist) => selectedService.artists.includes(artist.id));
  const selectedArtist = artists.find((artist) => artist.id === artistId) ?? relevantArtists[0];
  const bookingId = "SN-0822-041";

  function startBooking(service?: Service, artist?: Artist) {
    if (service) setServiceId(service.id);
    if (artist) setArtistId(artist.id);
    else if (service && !service.artists.includes(artistId)) setArtistId(service.artists[0]);
    setStep(service ? 1 : 0);
    setSuccess(false);
    setBookingOpen(true);
    setDetail(null);
  }

  function confirmBooking() {
    const booking = { id: bookingId, service: selectedService.name, artist: selectedArtist?.name, date, time, name, phone };
    localStorage.setItem("salon-noir-booking", JSON.stringify(booking));
    setSuccess(true);
  }

  return <main className="noir-site">
    <DemoScrollIsland label="NOIR" links={[{name:"Services",href:"#services"},{name:"Artists",href:"#artists"},{name:"Visit",href:"#visit"}]}/>
    <a className="noir-back" href="/">← Concept by Vansh Studio</a>
    <header className={`noir-nav ${scrolled ? "is-scrolled" : ""}`}>
      <a className="noir-logo" href="#top">SALON NOIR</a>
      <nav aria-label="Main navigation">
        <a href="#services">Services</a><a href="#artists">Artists</a><a href="#colour">Colour</a><a href="#transformations">Transformations</a><a href="#visit">Visit</a>
      </nav>
      <button className="noir-book" onClick={() => startBooking()}>Book appointment</button>
      <button className="noir-menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu">Menu</button>
    </header>

    <AnimatePresence>{menuOpen && <motion.div className="noir-mobile-menu" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: .55, ease: [.22, 1, .36, 1] }}>
      <div><b>SALON NOIR</b><button onClick={() => setMenuOpen(false)}>Close ×</button></div>
      {[["Services", "#services"], ["Artists", "#artists"], ["Colour", "#colour"], ["Transformations", "#transformations"], ["Visit", "#visit"]].map(([label, href], i) => <motion.a key={label} href={href} onClick={() => setMenuOpen(false)} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .12 + i * .05 }}>{label}<span>↗</span></motion.a>)}
      <button onClick={() => { setMenuOpen(false); startBooking(); }}>Book appointment</button>
    </motion.div>}</AnimatePresence>

    <section className="noir-hero" id="top">
      <motion.div className="noir-hero-image" initial={{ clipPath: "inset(8%)", scale: 1.04 }} animate={{ clipPath: "inset(0%)", scale: 1 }} transition={{ duration: 1.1, ease: [.22, 1, .36, 1] }} />
      <div className="noir-hero-shade" />
      <div className="noir-hero-content"><span>Dehradun · India</span><h1>{["Your next look", "starts here."].map((line, i) => <span key={line}><motion.i initial={{ opacity: 0, y: 55, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: .8, delay: .15 + i * .09, ease: [.22, 1, .36, 1] }}>{line}</motion.i></span>)}</h1><div><p>Precision cuts, dimensional colour and modern beauty treatments shaped around you.</p><div><button onClick={() => startBooking()}>Book appointment</button><a href="#services">Explore services</a></div></div></div>
      <div className="noir-hero-meta"><span>Rajpur Road · Dehradun</span><span>Open today · 10 AM–8 PM</span></div>
    </section>

    <div className="noir-quick">{["Cut", "Colour", "Treatments", "Nails", "Makeup", "Bridal"].map(item => <a key={item} href="#services" onClick={() => setCategory(item === "Treatments" ? "Treatments" : item)}>{item}<span>↗</span></a>)}</div>

    <section className="noir-intro"><span>Salon Noir</span><Reveal><h2>Hair is personal.<br/><em>Your appointment should be too.</em></h2><p>Every service begins with what you want, how you live and how much maintenance you actually want to do.</p></Reveal></section>

    <section className="noir-services" id="services">
      <div className="noir-section-head"><span>01 / Services</span><h2>What are we<br/><em>doing today?</em></h2></div>
      <div className="noir-service-tools"><div className="noir-tabs">{["All", "Cut", "Colour", "Treatments", "Nails", "Makeup", "Men", "Bridal"].map(item => <button className={category === item ? "active" : ""} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div><label><span>Search services</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Try ‘balayage’ or ‘hair spa’" /></label></div>
      <motion.div layout className="noir-service-list"><AnimatePresence mode="popLayout">{filtered.map(service => <motion.button layout key={service.id} className="noir-service-row" onClick={() => setDetail(service)} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><span>{service.category}</span><strong>{service.name}</strong><small>{service.duration} min</small><b>From ₹{service.price.toLocaleString("en-IN")}</b><i>↗</i></motion.button>)}</AnimatePresence>{!filtered.length && <p className="noir-empty">No matching services. Try another search.</p>}</motion.div>
    </section>

    <section className="noir-artists" id="artists"><div className="noir-section-head"><span>02 / Meet the team</span><h2>Find your<br/><em>person.</em></h2></div><div className="noir-artist-grid">{artists.map(artist => <article key={artist.id}><div className="noir-artist-image" style={{ backgroundImage: `url(${artist.image})` }} /><div><span>{artist.role}</span><h3>{artist.name}</h3><p>{artist.specialty}</p><small>Next available</small><strong>{artist.availability}</strong><button onClick={() => startBooking(undefined, artist)}>Book {artist.name.split(" ")[0]} ↗</button></div></article>)}</div></section>

    <section className="noir-colour" id="colour"><div><span>03 / Colour studio</span><h2>Colour without<br/><em>the guesswork.</em></h2><p>Explore a direction, then refine it with your colourist. Final colour depends on your current hair and consultation.</p><div className="noir-swatches">{colours.map(([name, value]) => <button key={name} className={colour === name ? "active" : ""} onClick={() => setColour(name)}><i style={{ background: value }} /><span>{name}</span></button>)}</div><button className="noir-light-button" onClick={() => startBooking(services[1])}>Book a colour consultation ↗</button></div><AnimatePresence mode="wait"><motion.div key={colour} className="noir-colour-image" initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .4 }}><span>{colour}</span></motion.div></AnimatePresence></section>

    <section className="noir-transform" id="transformations"><div className="noir-section-head"><span>04 / Transformations</span><h2>Real change.<br/><em>No filter required.</em></h2></div><p className="noir-demo-note">Editorial demo imagery used to demonstrate a production transformation gallery.</p><div className="noir-transform-grid">{["https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85", "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85", "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=1200&q=85"].map((image, i) => <motion.figure key={image} whileHover={{ y: -5 }}><div style={{ backgroundImage: `url(${image})` }} /><figcaption><span>0{i + 1}</span>{["Dimensional colour", "The Noir cut", "Texture + finish"][i]}</figcaption></motion.figure>)}</div></section>

    <section className="noir-bridal"><div><span>Salon Noir Bridal</span><h2>For the photographs<br/><em>you’ll keep forever.</em></h2><p>Hair and makeup designed around your features, outfit, ceremony and the way you want to feel.</p><button onClick={() => startBooking(services[8])}>Request a bridal consultation ↗</button></div></section>

    <section className="noir-visit" id="visit"><div><span>05 / Visit</span><h2>Come<br/><em>see us.</em></h2></div><div className="noir-address"><b>Salon Noir</b><p>Rajpur Road<br/>Dehradun, Uttarakhand</p><div><a href="tel:+918630094919">Call ↗</a><a href="https://wa.me/918630094919" target="_blank" rel="noreferrer">WhatsApp ↗</a><a href="https://maps.google.com/?q=Rajpur+Road+Dehradun" target="_blank" rel="noreferrer">Directions ↗</a><button onClick={() => { navigator.clipboard?.writeText("Rajpur Road, Dehradun, Uttarakhand"); setCopied(true); }}>{copied ? "Copied ✓" : "Copy address"}</button></div></div><div className="noir-hours"><b>Hours</b><p>Monday–Friday <span>10 AM–8 PM</span></p><p>Saturday <span>9 AM–8 PM</span></p><p>Sunday <span>10 AM–6 PM</span></p><small>Parking available nearby</small></div></section>

    <footer className="noir-footer"><b>SALON NOIR</b><p>Cut · Colour · Beauty<br/>Rajpur Road · Dehradun</p><button onClick={() => startBooking()}>Book appointment ↗</button><p>Fictional salon experience.<br/>Designed by Vansh Studio.</p></footer>
    <button className="noir-mobile-book" onClick={() => startBooking()}>Book appointment</button>

    <AnimatePresence>{detail && <motion.div className="noir-modal" role="dialog" aria-modal="true" aria-labelledby="service-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDetail(null)}><motion.div className="noir-detail" onClick={event => event.stopPropagation()} initial={{ y: 35, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 35, opacity: 0 }}><button className="noir-close" onClick={() => setDetail(null)}>Close ×</button><span>{detail.category}</span><h2 id="service-title">{detail.name}</h2><p>{detail.description}</p><dl><div><dt>Starting from</dt><dd>₹{detail.price.toLocaleString("en-IN")}</dd></div><div><dt>Duration</dt><dd>{detail.duration} minutes</dd></div><div><dt>Maintenance</dt><dd>{detail.maintenance}</dd></div></dl><small>Final quote is confirmed during consultation and may vary with length, density and complexity.</small><button className="noir-primary" onClick={() => startBooking(detail)}>Book this service ↗</button></motion.div></motion.div>}</AnimatePresence>

    <AnimatePresence>{bookingOpen && <motion.div className="noir-modal noir-booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.div className="noir-booking-panel" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: .45, ease: [.22, 1, .36, 1] }}><div className="noir-booking-top"><b id="booking-title">Book appointment</b><button onClick={() => setBookingOpen(false)}>Close ×</button></div>{!success ? <><div className="noir-progress">{["Service", "Artist", "Date", "Time", "Details", "Confirm"].map((label, i) => <span className={step === i ? "active" : step > i ? "done" : ""} key={label}>{i + 1}<small>{label}</small></span>)}</div><div className="noir-booking-body"><AnimatePresence mode="wait" initial={false}>
      {step === 0 && <motion.div className="noir-booking-step" key="service" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}><span>Step 1</span><h2>Choose a service.</h2>{services.slice(0, 7).map(service => <button className={serviceId === service.id ? "active" : ""} onClick={() => { setServiceId(service.id); setArtistId(service.artists[0]); }} key={service.id}><span><b>{service.name}</b><small>{service.duration} min</small></span><strong>From ₹{service.price.toLocaleString("en-IN")}</strong></button>)}</motion.div>}
      {step === 1 && <motion.div className="noir-booking-step" key="artist" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}><span>Step 2</span><h2>Choose your artist.</h2>{relevantArtists.map(artist => <button className={artistId === artist.id ? "active" : ""} onClick={() => setArtistId(artist.id)} key={artist.id}><span><b>{artist.name}</b><small>{artist.role} · {artist.specialty}</small></span><strong>{artist.availability}</strong></button>)}</motion.div>}
      {step === 2 && <motion.div className="noir-booking-step" key="date" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}><span>Step 3</span><h2>Select a date.</h2><div className="noir-choice-grid">{dates.map(item => <button className={date === item ? "active" : ""} onClick={() => setDate(item)} key={item}>{item}</button>)}</div></motion.div>}
      {step === 3 && <motion.div className="noir-booking-step" key="time" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}><span>Step 4</span><h2>Choose a time.</h2><div className="noir-choice-grid">{times.map(item => <button className={time === item ? "active" : ""} onClick={() => setTime(item)} key={item}>{item}</button>)}</div></motion.div>}
      {step === 4 && <motion.div className="noir-booking-step" key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}><span>Step 5</span><h2>Your details.</h2><label>Name<input value={name} onChange={event => setName(event.target.value)} placeholder="Your name" /></label><label>Phone<input value={phone} onChange={event => setPhone(event.target.value)} placeholder="Phone number" /></label><label>Email<input type="email" placeholder="Email address" /></label><label>Notes<textarea placeholder="Anything your stylist should know?" /></label></motion.div>}
      {step === 5 && <motion.div className="noir-booking-step noir-confirm" key="confirm" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}><span>Step 6</span><h2>Review appointment.</h2><dl><div><dt>Service</dt><dd>{selectedService.name}</dd></div><div><dt>Artist</dt><dd>{selectedArtist?.name}</dd></div><div><dt>When</dt><dd>{date} · {time}</dd></div><div><dt>Duration</dt><dd>{selectedService.duration} minutes</dd></div><div><dt>Estimated from</dt><dd>₹{selectedService.price.toLocaleString("en-IN")}</dd></div></dl><small>Demo booking only. No real appointment or payment will be created.</small></motion.div>}
    </AnimatePresence></div><div className="noir-booking-actions"><button disabled={step === 0} onClick={() => setStep(Math.max(0, step - 1))}>Back</button>{step < 5 ? <button className="noir-primary" disabled={step === 4 && (!name || !phone)} onClick={() => setStep(Math.min(5, step + 1))}>Continue</button> : <button className="noir-primary" onClick={confirmBooking}>Confirm appointment</button>}</div></> : <div className="noir-success"><motion.i initial={{ scale: 0 }} animate={{ scale: 1 }}>✓</motion.i><span>Appointment booked</span><h2>{selectedService.name}<br/><em>with {selectedArtist?.name}.</em></h2><p>{date} · {time}<br/>Booking {bookingId}</p><div><a href={`https://wa.me/918630094919?text=${encodeURIComponent(`Salon Noir demo booking ${bookingId}: ${selectedService.name} with ${selectedArtist?.name}, ${date} at ${time}`)}`} target="_blank" rel="noreferrer">WhatsApp salon ↗</a><a href="https://maps.google.com/?q=Rajpur+Road+Dehradun" target="_blank" rel="noreferrer">Get directions ↗</a><button onClick={() => { localStorage.removeItem("salon-noir-booking"); setBookingOpen(false); }}>Cancel demo booking</button></div></div>}</motion.div></motion.div>}</AnimatePresence>
  </main>;
}
