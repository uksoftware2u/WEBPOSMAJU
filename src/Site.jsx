import { useEffect, useMemo, useRef, useState } from "react";
import { AndroidLogo, ArrowRight, ChartLineUp, Check, Database, DownloadSimple, ForkKnife, Globe, List, Package, Percent, PlayCircle, Receipt, ShoppingCart, Storefront, Users, WhatsappLogo, X } from "@phosphor-icons/react";
import { copy, languages } from "./content.js";

const featureIcons = [ShoppingCart, Package, Users, Percent, ChartLineUp, ForkKnife];
const industryIcons = [Storefront, Storefront, Receipt, ForkKnife, Storefront];
const asset = (name) => `${import.meta.env.BASE_URL}assets/${name}`;
const whatsappNumber = "60127479966";
const videoGuideUrl = "https://youtube.com/playlist?list=PLAYF-rVdF9KA&si=b8z4V-sKIYavs8os";

function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setVisible(true), { threshold: 0.14 });
    if (node) observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`}>{children}</div>;
}

function LanguageMenu({ lang, onChange, invert = false }) {
  const [open, setOpen] = useState(false);
  const current = languages.find((item) => item.code === lang);
  return <div className={`language ${invert ? "language--invert" : ""}`}>
    <button className="language__trigger" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Change language"><Globe size={17} /> {current.short} <span>⌄</span></button>
    {open && <div className="language__menu" role="menu">{languages.map((item) => <button key={item.code} onClick={() => { onChange(item.code); setOpen(false); }} className={item.code === lang ? "active" : ""}><span>{item.label}</span>{item.code === lang && <Check size={16} weight="bold" />}</button>)}</div>}
  </div>;
}

function WhatsAppButton({ children, className = "" }) {
  const href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello, I would like to know more about POS Maju.")}`;
  return <a className={className} href={href} target="_blank" rel="noreferrer"><WhatsappLogo size={21} weight="fill" />{children}</a>;
}

function InquiryForm({ t }) {
  const [sent, setSent] = useState(false);
  const submit = (event) => {
    event.preventDefault();
    const d = new FormData(event.currentTarget);
    const lines = ["POS Maju Inquiry", `Name: ${d.get("name")}`, `Company: ${d.get("company")}`, `Phone: ${d.get("phone")}`, `Email: ${d.get("email") || "-"}`, `Business: ${d.get("type")}`, `Devices: ${d.get("devices")}`, `Message: ${d.get("message") || "-"}`];
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener,noreferrer");
    setSent(true);
  };
  return <form className="inquiry-form" onSubmit={submit}>
    <div className="form-grid">
      <label><span>{t.form[0]}</span><input name="name" required autoComplete="name" /></label>
      <label><span>{t.form[1]}</span><input name="company" required autoComplete="organization" /></label>
      <label><span>{t.form[2]}</span><input name="phone" required inputMode="tel" autoComplete="tel" /></label>
      <label><span>{t.form[3]}</span><input name="email" type="email" autoComplete="email" /></label>
      <label><span>{t.form[4]}</span><select name="type" required defaultValue=""><option value="" disabled>{t.form[8]}</option>{t.types.map((type) => <option key={type}>{type}</option>)}</select></label>
      <label><span>{t.form[5]}</span><input name="devices" type="number" min="1" max="999" defaultValue="1" required /></label>
    </div>
    <label><span>{t.form[6]}</span><textarea name="message" rows="3" /></label>
    <button className="button button--lime form-submit"><WhatsappLogo size={21} weight="fill" />{t.form[7]}<ArrowRight size={19} /></button>
    {sent && <p className="form-success" role="status"><Check size={18} weight="bold" />{t.success}</p>}
  </form>;
}

export function Site() {
  const [lang, setLang] = useState(() => localStorage.getItem("pos-maju-site-language") || "en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [feature, setFeature] = useState(0);
  const [faq, setFaq] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const t = copy[lang] || copy.en;
  useEffect(() => { localStorage.setItem("pos-maju-site-language", lang); document.documentElement.lang = lang; }, [lang]);
  useEffect(() => { const handler = () => setScrolled(window.scrollY > 12); window.addEventListener("scroll", handler, { passive: true }); return () => window.removeEventListener("scroll", handler); }, []);
  const links = useMemo(() => [["features", t.nav[0]], ["business", t.nav[1]], ["value", t.nav[2]], ["support", t.nav[3]]], [t]);
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return <div className="site-shell">
    <div className="page-progress" aria-hidden="true" />
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
      <a href="#top" className="brand" aria-label="POS Maju home"><img src={asset("pos-maju-logo.png")} alt="POS Maju" /></a>
      <nav className={`nav ${menuOpen ? "nav--open" : ""}`}>{links.map(([id, label]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}<div className="nav__mobile-actions"><LanguageMenu lang={lang} onChange={setLang} /><button className="button button--primary" onClick={() => scrollTo("inquiry")}>{t.demo}</button></div></nav>
      <div className="header-actions"><LanguageMenu lang={lang} onChange={setLang} /><button className="button button--primary" onClick={() => scrollTo("inquiry")}>{t.demo}</button><WhatsAppButton className="button button--outline">{t.whatsapp}</WhatsAppButton></div>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <List />}</button>
    </header>

    <main id="top">
      <section className="hero">
        <img className="hero__background" src={asset("hero-background.png")} alt="" /><div className="hero__veil" />
        <div className="hero__content"><p className="eyebrow">{t.eyebrow}</p><h1><span>{t.hero[0]}</span><strong>{t.hero[1]}</strong><span>{t.hero[2]}</span></h1><p className="hero__body">{t.heroBody}</p>
          <div className="hero__proof">{[AndroidLogo, Database, Storefront].map((Icon, i) => <div key={t.proof[i]}><Icon size={30} weight="fill" /><span>{t.proof[i]}</span></div>)}</div>
          <div className="hero__actions"><button className="button button--lime" onClick={() => scrollTo("inquiry")}>{t.demo}<ArrowRight size={19} /></button><WhatsAppButton className="button button--ghost">{t.whatsapp}</WhatsAppButton></div>
        </div>
        <div className="product-stage"><div className="tablet-shot"><img src={asset("pos-sales-tablet.png")} alt="POS Maju tablet sales screen" /><span className="scan-beam" /></div><img className="phone-shot" src={asset("pos-member-phone.png")} alt="POS Maju phone member screen" /><div className="stage-note">Your business<br />in good hands.</div></div>
        <div className="scroll-cue"><span />Scroll</div>
      </section>

      <section className="industry-strip" id="business"><p>{t.trusted}</p><div className="industry-list">{t.industries.map((name, i) => { const Icon = industryIcons[i]; return <div key={name}><Icon size={31} /><span>{name}</span></div>; })}</div></section>

      <section className="feature-hub section" id="features"><Reveal className="section-heading"><p className="eyebrow eyebrow--green">POS MAJU ECOSYSTEM</p><h2>{t.featureTitle}</h2><p>{t.featureSub}</p></Reveal>
        <div className="feature-tabs" role="tablist">{t.features.map(([name], i) => { const Icon = featureIcons[i]; return <button key={name} role="tab" aria-selected={feature === i} className={feature === i ? "active" : ""} onClick={() => setFeature(i)}><Icon size={27} /><span>{name}</span></button>; })}</div>
        <div className="feature-detail"><div><span className="feature-detail__number">0{feature + 1}</span><h3>{t.features[feature][0]}</h3><p>{t.features[feature][1]}</p><button onClick={() => scrollTo("inquiry")}>{t.demo}<ArrowRight /></button></div><img src={asset("pos-sales-tablet.png")} alt="POS Maju product interface" /></div>
      </section>

      <section className="story story--easy"><Reveal className="story__copy"><p className="eyebrow eyebrow--green">{t.easy[0]}</p><h2>{t.easy[1]}</h2><p>{t.easy[2]}</p><CheckList items={t.easyPoints} /></Reveal><Reveal className="story__visual product-story"><img className="story__photo" src={asset("retail-owner.png")} alt="Retail owner using POS Maju" /><img className="story__screen" src={asset("pos-sales-tablet.png")} alt="POS Maju sales interface" /></Reveal></section>
      <section className="story story--table"><Reveal className="story__visual"><img className="story__photo" src={asset("cafe-table-mode.png")} alt="Cafe operator using tablet" /></Reveal><Reveal className="story__copy"><p className="eyebrow eyebrow--green">{t.table[0]}</p><h2>{t.table[1]}</h2><p>{t.table[2]}</p><CheckList items={t.tablePoints} /></Reveal></section>
      <section className="value-section" id="value"><div className="value-section__copy"><Reveal><p className="eyebrow">{t.value[0]}</p><h2>{t.value[1]}</h2><p>{t.value[2]}</p><CheckList items={t.valuePoints} /><button className="button button--lime" onClick={() => scrollTo("inquiry")}>{t.demo}<ArrowRight /></button></Reveal></div><img src={asset("retail-owner.png")} alt="Malaysian business owner" /></section>
      <section className="resources-section section" id="resources">
        <Reveal className="section-heading"><p className="eyebrow eyebrow--green">{t.resources[0]}</p><h2>{t.resources[1]}</h2><p>{t.resources[2]}</p></Reveal>
        <div className="resource-grid">
          <Reveal className="resource-card resource-card--video"><div className="resource-card__icon"><PlayCircle size={34} weight="fill" /></div><div><h3>{t.resources[3]}</h3><p>{t.resources[4]}</p></div><a className="button button--lime" href={videoGuideUrl} target="_blank" rel="noreferrer">{t.resources[5]}<ArrowRight size={18} /></a></Reveal>
          <Reveal className="resource-card"><div className="resource-card__icon"><DownloadSimple size={34} weight="bold" /></div><div><h3>{t.resources[6]}</h3><p>{t.resources[7]}</p></div><button className="button button--primary" onClick={() => scrollTo("inquiry")}>{t.resources[8]}<ArrowRight size={18} /></button></Reveal>
        </div>
      </section>
      <section className="stats section">{t.stats.map(([number, label]) => <Reveal key={label} className="stat"><strong>{number}</strong><span>{label}</span></Reveal>)}</section>
      <section className="faq-section section" id="support"><Reveal className="section-heading section-heading--left"><p className="eyebrow eyebrow--green">FAQ</p><h2>{t.faqTitle}</h2></Reveal><div className="faq-list">{t.faqs.map(([q, a], i) => <div className={`faq ${faq === i ? "faq--open" : ""}`} key={q}><button onClick={() => setFaq(faq === i ? -1 : i)} aria-expanded={faq === i}><span>{q}</span><strong>{faq === i ? "−" : "+"}</strong></button><div><p>{a}</p></div></div>)}</div></section>
      <section className="inquiry" id="inquiry"><img className="inquiry__background" src={asset("hero-background.png")} alt="" /><div className="inquiry__intro"><p className="eyebrow">{t.inquiry[0]}</p><h2>{t.inquiry[1]}</h2><p>{t.inquiry[2]}</p><WhatsAppButton className="button button--ghost">{t.whatsapp}</WhatsAppButton></div><InquiryForm t={t} /></section>
    </main>
    <footer><img src={asset("pos-maju-logo.png")} alt="POS Maju" /><div><strong>{t.footer}</strong><span>© {new Date().getFullYear()} UK Soft & Solution PLT. {t.rights}</span></div><LanguageMenu lang={lang} onChange={setLang} invert /></footer>
  </div>;
}

function CheckList({ items }) { return <ul>{items.map((item) => <li key={item}><Check weight="bold" />{item}</li>)}</ul>; }
