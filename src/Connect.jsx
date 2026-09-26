import { ArrowRight, Desktop, MagnifyingGlass, Calculator, PlugsConnected, CheckCircle, ShieldCheck } from "@phosphor-icons/react";
import { connectRelease } from "./connect-release.js";

const icons = [MagnifyingGlass, Calculator, PlugsConnected];
const contactUrl = "https://wa.me/60127479966?text=" + encodeURIComponent("Hello, I would like to discuss Maju Connect for PC enquiry and accounting integration. My accounting software and version: ");

export function ConnectIntro({ t, href }) {
  return <section className="connect-intro section">
    <div><p className="eyebrow eyebrow--green">Maju Connect</p><h2>{t.title}</h2><p>{t.intro}</p><a className="button button--primary" href={href}>{t.explore}<ArrowRight /></a></div>
    <div className="connect-intro-list">{t.features.map(([title, body], i) => { const Icon = icons[i]; return <article key={title}><Icon size={28} /><div><h3>{title}</h3><p>{body}</p></div></article>; })}</div>
  </section>;
}

export function ConnectPage({ t, home, lang }) {
  const release = connectRelease[lang] || connectRelease.en;
  return <main className="connect-page" id="top">
    <section className="connect-hero"><div className="section"><a className="connect-back" href={home}>← {t.back}</a><p className="eyebrow">Maju Connect · {t.eyebrow}</p><h1>{t.title}</h1><p className="connect-lead">{t.intro}</p><a className="button button--lime" href={contactUrl} target="_blank" rel="noreferrer">{t.contact}<ArrowRight /></a>
      <div className="connect-path"><span><Desktop size={24} />POS Maju</span><ArrowRight /><span>Maju Connect · PC</span><ArrowRight /><span>AutoCount / SQL Accounting</span></div>
    </div></section>
    <section className="section connect-block connect-showcase">
      <p className="eyebrow eyebrow--green">{release.label}</p><h2>{release.title}</h2>
      <p className="connect-demo-note">{release.note}</p>
      <figure><img src={`${home}assets/maju-connect-dashboard.png`} width="1402" height="780" alt={release.dashboard} /><figcaption>{release.dashboard}</figcaption></figure>
      <div className="connect-grid">{release.features.map(([title, body]) => <article className="connect-card" key={title}><h3>{title}</h3><p>{body}</p></article>)}</div>
      <figure><img src={`${home}assets/maju-connect-companies.png`} width="1402" height="780" loading="lazy" alt={release.companies} /><figcaption>{release.companies}</figcaption></figure>
    </section>
    <section className="connect-details"><div className="section connect-split"><div><p className="eyebrow eyebrow--green">POS Maju → PC</p><h2>{t.detailTitle}</h2><p>{t.detailBody}</p></div><ul>{t.details.map(label => <li key={label}><CheckCircle size={23} weight="fill" />{label}</li>)}</ul></div></section>
    <section className="section connect-block"><h2>{t.workflowTitle}</h2><ol className="connect-steps">{t.steps.map(([title, body], i) => <li key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{body}</p></li>)}</ol></section>
    <section className="connect-integrations"><div className="section connect-block"><h2>{t.integrationTitle}</h2><p className="connect-lead">{t.integrationBody}</p><div className="connect-grid">{t.systems.map(([title, body]) => <article className="connect-card" key={title}><h3>{title}</h3><p>{body}</p></article>)}</div><p className="connect-note">{t.note}</p></div></section>
    <section className="section connect-block"><p className="eyebrow eyebrow--green">{t.planLabel}</p><h2>{t.plansTitle}</h2><div className="connect-grid">{t.plans.map(([title, audience, body]) => <article className="connect-card" key={title}><h3>{title}</h3><strong>{audience}</strong><p>{body}</p></article>)}</div><aside className="connect-trust"><ShieldCheck size={38} /><div><h3>{t.trustTitle}</h3><p>{t.trustBody}</p></div></aside></section>
    <section className="connect-cta section"><h2>{t.ctaTitle}</h2><p>{t.ctaBody}</p><a className="button button--lime" href={contactUrl} target="_blank" rel="noreferrer">{t.contact}<ArrowRight /></a></section>
  </main>;
}
