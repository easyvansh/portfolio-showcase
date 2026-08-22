type DemoProps={kind:"mysa"|"noir"|"apex";brand:string;nav:string[];headline:React.ReactNode;intro:string;button:string;kicker:string;sectionTitle:string;cards:[string,string][];cta:React.ReactNode;ctaButton:string};
export default function DemoPage(p:DemoProps){return <main className={`demo ${p.kind}`}>
  <a href="/" className="demo-tag">← Concept project · Back to studio</a>
  <nav className="demo-nav"><strong>{p.brand}</strong><div className="demo-nav-links">{p.nav.map(x=><a href="#services" key={x}>{x}</a>)}</div><a className="demo-btn" href="#contact">{p.button}</a></nav>
  <section className="demo-hero"><span className="demo-kicker">Dehradun · Est. 2026</span><h1>{p.headline}</h1><p>{p.intro}</p><a className="demo-btn" href="#services">Discover more ↓</a></section>
  <section className="demo-section" id="services"><p className="demo-kicker">{p.kicker}</p><h2 style={{fontSize:"clamp(42px,6vw,90px)",lineHeight:.95,letterSpacing:"-.055em",maxWidth:1000,marginTop:35}}>{p.sectionTitle}</h2><div className="demo-grid">{p.cards.map(([t,c])=><article className="demo-card" key={t}><span>✦</span><h3>{t}</h3><p>{c}</p></article>)}</div></section>
  <section className="demo-cta" id="contact"><h2>{p.cta}</h2><a className="demo-btn" href="https://wa.me/918630094919" target="_blank" rel="noreferrer">{p.ctaButton} ↗</a></section>
  <footer className="demo-footer"><strong>{p.brand}</strong><span>Fictional business · Design concept by Vansh Studio</span><span>Dehradun, India</span></footer>
</main>}
