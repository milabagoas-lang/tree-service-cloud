import { Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState, type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { sendContactMessage } from "@/lib/contact.functions";
import { fetchSiteContent, fetchPortfolio, parseVideoUrl, type SiteContentMap, type PortfolioItem, type SocialLink } from "@/lib/site-content";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Facebook,
  Instagram,
  Leaf,
  Mail,
  Menu,
  MessageCircle,
  Minus,
  Music2,
  Play,
  Plus,
  Scissors,
  Send,
  Shield,
  Sparkles,
  TreeDeciduous,
  TreePine,
  Truck,
  X,
  Youtube,
} from "lucide-react";
import heroBgDefault from "@/assets/hero-bg.jpg";
import founderImgDefault from "@/assets/founder.jpg";

import { dicts, pathFor, type Dict, type Lang } from "@/i18n/dict";

const ICONS_SKILLS = [
  <TreeDeciduous className="h-5 w-5" key="td" />,
  <TreePine className="h-5 w-5" key="tp" />,
  <Leaf className="h-5 w-5" key="l" />,
  <Scissors className="h-5 w-5" key="s" />,
  <Truck className="h-5 w-5" key="t" />,
  <Shield className="h-5 w-5" key="sh" />,
];

const ICONS_SERVICES = [
  <TreeDeciduous className="h-5 w-5" key="td" />,
  <Scissors className="h-5 w-5" key="s" />,
  <Leaf className="h-5 w-5" key="l" />,
  <Truck className="h-5 w-5" key="t" />,
];

export function Landing({ lang }: { lang: Lang }) {
  const t = dicts[lang];

  const { data: overrides } = useQuery({ queryKey: ["site_content"], queryFn: fetchSiteContent });
  const { data: portfolio = [] } = useQuery({ queryKey: ["portfolio"], queryFn: fetchPortfolio });

  const heroBg = overrides?.hero_image?.url || heroBgDefault;
  const founderImg = overrides?.founder_image?.url || founderImgDefault;

  const navigate = useNavigate();
  useEffect(() => {
    if (lang !== "en") return;
    try {
      const chosen = localStorage.getItem("cc-lang");
      if (chosen) return;
      const nav = navigator.language?.toLowerCase() ?? "";
      if (nav.startsWith("ru") || nav.startsWith("uk") || nav.startsWith("be") || nav.startsWith("kk")) {
        localStorage.setItem("cc-lang", "ru");
        navigate({ to: "/ru" });
      } else {
        localStorage.setItem("cc-lang", "en");
      }
    } catch {
      /* ignore */
    }
  }, [lang, navigate]);

  return (
    <main className="relative min-h-dvh overflow-x-hidden bg-background text-foreground">
      <Header lang={lang} t={t} />
      <Hero t={t} heroBg={heroBg} overrides={overrides} lang={lang} />
      <Marquee t={t} />
      <About t={t} founderImg={founderImg} overrides={overrides} lang={lang} />
      <Skills t={t} />
      <Projects t={t} />
      <Portfolio t={t} items={portfolio} />
      <Services t={t} overrides={overrides} lang={lang} />
      <Testimonials t={t} />
      <FAQ t={t} />
      <Blog t={t} />
      <Contact t={t} lang={lang} socials={overrides?.contacts_socials} />
      <Footer t={t} lang={lang} />
    </main>
  );
}

/* ---------- Header ---------- */
function Header({ lang, t }: { lang: Lang; t: Dict }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { href: "#about", label: t.nav.about },
    { href: "#skills", label: t.nav.skills },
    { href: "#projects", label: t.nav.projects },
    { href: "#gallery", label: t.gallery.eyebrow },
    { href: "#services", label: t.nav.services },
    { href: "#faq", label: t.nav.faq },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <a href="#top" className="flex items-center gap-2.5">
          <div className="grid h-8 w-8 place-items-center rounded-md border border-primary/40 bg-primary/10">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <span className="font-display text-sm font-semibold tracking-tight">
            Crystal Cloud<span className="text-primary">.</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LangSwitcher lang={lang} label={t.nav.switchTo} />
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            {t.nav.order}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LangSwitcher lang={lang} label={t.nav.switchTo} />
          <button
            className="grid h-10 w-10 place-items-center rounded-md border border-border"
            onClick={() => setOpen((v) => !v)}
            aria-label={t.nav.menu}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
            >
              {t.nav.order} <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function LangSwitcher({ lang, label }: { lang: Lang; label: string }) {
  const other: Lang = lang === "en" ? "ru" : "en";
  const rememberOther = () => {
    try {
      localStorage.setItem("cc-lang", other);
    } catch {
      /* ignore */
    }
  };
  return (
    <div
      className="inline-flex items-center rounded-full border border-border bg-secondary/40 p-0.5 font-mono text-xs"
      role="group"
      aria-label={label}
    >
      <Link
        to="/"
        onClick={() => {
          try { localStorage.setItem("cc-lang", "en"); } catch { /* ignore */ }
        }}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
        aria-current={lang === "en" ? "page" : undefined}
        hrefLang="en"
      >
        EN
      </Link>
      <Link
        to="/ru"
        onClick={rememberOther}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          lang === "ru" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
        aria-current={lang === "ru" ? "page" : undefined}
        hrefLang="ru"
      >
        RU
      </Link>
    </div>
  );
}

/* ---------- Hero ---------- */
function Hero({ t, heroBg, overrides, lang }: { t: Dict; heroBg: string; overrides?: SiteContentMap; lang: Lang }) {
  const ho = overrides?.hero_texts?.[lang];
  const titleA = ho?.titleA?.trim() || t.hero.titleA;
  const titleB = ho?.titleB?.trim() || t.hero.titleB;
  const subtitle = ho?.subtitle?.trim();
  return (
    <section id="top" className="relative isolate overflow-hidden pb-24 pt-32 md:pb-32 md:pt-40">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1280}
          fetchPriority="high"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="absolute inset-0 bg-grid opacity-40" />
      </div>

      <div className="container-x">
        <div className="mx-auto max-w-4xl text-center animate-fade-up">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1.5 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="font-mono text-xs tracking-wider text-muted-foreground">
              {t.hero.badge}
            </span>
          </div>

          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            <span className="text-gradient">{titleA}</span>
            <br />
            <span className="accent-gradient">{titleB}</span>
          </h1>

          {subtitle ? (
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">{subtitle}</p>
          ) : (
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
              {t.hero.subtitleA}
              <span className="text-foreground">{t.hero.subtitleFounder}</span>
              {t.hero.subtitleB}
            </p>
          )}

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#contact"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-[0_0_40px_-8px_oklch(0.72_0.17_162/0.6)] transition-transform hover:scale-[1.02] sm:w-auto"
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#projects"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-secondary/40 px-7 py-3.5 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-secondary sm:w-auto"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
            <SocialLink href="https://t.me/crystalcloudllc_bot" icon={<TelegramIcon />} label="Telegram" />
            <SocialLink href="https://instagram.com" icon={<Instagram className="h-4 w-4" />} label="Instagram" />
            <SocialLink href="https://facebook.com" icon={<Facebook className="h-4 w-4" />} label="Facebook" />
          </div>
        </div>

        <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
          {t.hero.stats.map((s) => (
            <div key={s.v} className="bg-background px-5 py-6 text-center">
              <div className="font-display text-2xl font-semibold text-foreground md:text-3xl">
                {s.k}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
    >
      <span className="text-primary">{icon}</span> {label}
    </a>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.24 3.64 11.95c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71l-4.14-3.05-1.99 1.93c-.23.23-.42.42-.83.42z" />
    </svg>
  );
}

/* ---------- Marquee ---------- */
function Marquee({ t }: { t: Dict }) {
  return (
    <section aria-label={t.marquee.label} className="border-y border-border/60 bg-background/60 py-8">
      <div className="container-x flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-muted-foreground">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground/70">{t.marquee.label}</span>
        {t.marquee.items.map((i) => (
          <span key={i} className="font-display text-base font-medium text-foreground/70">
            {i}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------- About ---------- */
function About({ t }: { t: Dict }) {
  return (
    <section id="about" className="section-y">
      <div className="container-x grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-16">
        <div>
          <div className="relative overflow-hidden rounded-2xl border border-border">
            <img
              src={founderImg}
              alt="Andrii Biedariev"
              width={800}
              height={1000}
              loading="lazy"
              className="h-full w-full object-cover grayscale-[15%]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-6">
              <div className="font-display text-lg font-semibold">Andrii Biedariev</div>
              <div className="text-xs text-muted-foreground">{t.about.founderRole}</div>
            </div>
          </div>
        </div>

        <div>
          <p className="eyebrow"><Minus className="h-3 w-3" /> {t.about.eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight md:text-5xl">
            {t.about.titleA}<span className="accent-gradient">{t.about.titleAccent}</span>
          </h2>
          <p className="mt-6 text-base text-muted-foreground md:text-lg">{t.about.body}</p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {t.about.values.map((v) => (
              <li key={v} className="flex items-center gap-3 rounded-lg border border-border bg-card/50 px-4 py-3 text-sm">
                <Check className="h-4 w-4 text-primary" /> {v}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- Skills ---------- */
function Skills({ t }: { t: Dict }) {
  return (
    <section id="skills" className="section-y border-t border-border/60">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">{t.skills.eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">
            {t.skills.titleA}<span className="accent-gradient">{t.skills.titleAccent}</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {t.skills.groups.map((g, i) => (
            <div key={g.title} className="card-surface card-hover p-6">
              <div className="mb-5 grid h-11 w-11 place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                {ICONS_SKILLS[i]}
              </div>
              <h3 className="font-display text-lg font-semibold">{g.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <li key={it} className="rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs text-muted-foreground">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Projects ---------- */
function Projects({ t }: { t: Dict }) {
  return (
    <section id="projects" className="section-y border-t border-border/60">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">{t.projects.eyebrow}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">{t.projects.title}</h2>
          </div>
          <a href="#contact" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
            {t.projects.discuss} <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {t.projects.items.map((p) => (
            <article key={p.title} className="card-surface card-hover group p-6 md:p-8">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
                  {p.tag}
                </span>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold leading-snug md:text-2xl">
                {p.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground md:text-base">{p.body}</p>
              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-6">
                {p.metrics.map((m) => (
                  <div key={m.v}>
                    <div className="font-display text-xl font-semibold text-primary md:text-2xl">
                      {m.k}
                    </div>
                    <div className="mt-1 text-[11px] text-muted-foreground">{m.v}</div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Gallery (Before / After) ---------- */
function Gallery({ t }: { t: Dict }) {
  return (
    <section id="gallery" className="section-y border-t border-border/60">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">{t.gallery.eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">
            {t.gallery.title}
          </h2>
          <p className="mt-4 text-muted-foreground">{t.gallery.subtitle}</p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {GALLERY_PHOTOS.map((src, i) => (
            <figure
              key={src}
              className="card-surface card-hover group relative overflow-hidden p-0"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-background">
                <img
                  src={src}
                  alt={`${t.gallery.beforeLabel} / ${t.gallery.afterLabel} — ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <span className="pointer-events-none absolute left-3 top-3 rounded-full border border-border bg-background/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-foreground backdrop-blur">
                  {t.gallery.beforeLabel}
                </span>
                <span className="pointer-events-none absolute right-3 top-3 rounded-full border border-primary/40 bg-primary/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-primary backdrop-blur">
                  {t.gallery.afterLabel}
                </span>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ---------- Services ---------- */
function Services({ t }: { t: Dict }) {
  return (
    <section id="services" className="section-y border-t border-border/60">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">{t.services.eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">{t.services.title}</h2>
          <p className="mt-4 text-muted-foreground">{t.services.subtitle}</p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {t.services.items.map((s, i) => (
            <div key={s.title} className="card-surface card-hover p-6 md:p-7">
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                  {ICONS_SERVICES[i]}
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{s.body}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {s.points.map((p) => (
                      <li key={p} className="rounded-md border border-border bg-secondary/40 px-2.5 py-1 text-xs text-muted-foreground">
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-border bg-card/40 p-6 md:p-10">
          <div className="mb-8 flex items-center gap-3">
            <TreeDeciduous className="h-5 w-5 text-primary" />
            <h3 className="font-display text-xl font-semibold">{t.services.processTitle}</h3>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {t.services.steps.map((s, i) => (
              <div key={s.n} className="relative">
                <div className="font-mono text-xs text-primary">{s.n}</div>
                <div className="mt-2 font-display text-lg font-semibold">{s.t}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.d}</div>
                {i < t.services.steps.length - 1 && (
                  <div className="absolute left-8 right-0 top-2 hidden h-px bg-border md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */
function Testimonials({ t }: { t: Dict }) {
  return (
    <section className="section-y border-t border-border/60">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">{t.testimonials.eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">{t.testimonials.title}</h2>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {t.testimonials.items.map((it) => (
            <figure key={it.n} className="card-surface p-7">
              <div className="font-display text-2xl leading-none text-primary">"</div>
              <blockquote className="mt-3 text-sm leading-relaxed text-foreground/90 md:text-base">
                {it.q}
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <div className="text-sm font-medium">{it.n}</div>
                <div className="text-xs text-muted-foreground">{it.r}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ({ t }: { t: Dict }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section-y border-t border-border/60">
      <div className="container-x grid gap-10 md:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="eyebrow">{t.faq.eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">{t.faq.title}</h2>
          <p className="mt-4 text-muted-foreground">{t.faq.subtitle}</p>
        </div>
        <div className="divide-y divide-border rounded-2xl border border-border bg-card/40">
          {t.faq.items.map((it, idx) => {
            const isOpen = open === idx;
            return (
              <button
                key={it.q}
                onClick={() => setOpen(isOpen ? null : idx)}
                className="grid w-full grid-cols-[1fr_auto] items-start gap-4 px-6 py-5 text-left"
                aria-expanded={isOpen}
              >
                <div>
                  <div className="font-display text-base font-medium md:text-lg">{it.q}</div>
                  {isOpen && (
                    <p className="mt-3 text-sm text-muted-foreground animate-fade-up">{it.a}</p>
                  )}
                </div>
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border">
                  {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Blog ---------- */
function Blog({ t }: { t: Dict }) {
  return (
    <section className="section-y border-t border-border/60">
      <div className="container-x">
        <div className="flex items-end justify-between">
          <div>
            <p className="eyebrow">{t.blog.eyebrow}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">{t.blog.title}</h2>
          </div>
          <a href="#" className="hidden items-center gap-2 text-sm text-primary hover:underline sm:inline-flex">
            {t.blog.all} <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {t.blog.posts.map((p) => (
            <a key={p.title} href="#" className="card-surface card-hover group flex flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-border bg-secondary/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {p.tag}
                </span>
                <span className="text-xs text-muted-foreground">{p.date}</span>
              </div>
              <h3 className="mt-6 font-display text-lg font-semibold leading-snug">{p.title}</h3>
              <div className="mt-6 flex items-center gap-2 text-sm text-primary">
                {t.blog.read}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact({ t, lang }: { t: Dict; lang: "en" | "ru" }) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const send = useServerFn(sendContactMessage);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    setError(null);
    setSending(true);
    try {
      await send({
        data: {
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          company: String(fd.get("company") ?? ""),
          message: String(fd.get("message") ?? ""),
          lang,
        },
      });
      setSent(true);
      form.reset();
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      console.error(err);
      setError(lang === "ru" ? "Не удалось отправить. Попробуйте позже." : "Failed to send. Please try again.");
    } finally {
      setSending(false);
    }
  };


  return (
    <section id="contact" className="section-y border-t border-border/60">
      <div className="container-x grid gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <p className="eyebrow">{t.contact.eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">
            {t.contact.titleA}<span className="accent-gradient">{t.contact.titleAccent}</span>
          </h2>
          <p className="mt-4 text-muted-foreground">{t.contact.subtitle}</p>

          <div className="mt-8 space-y-3">
            <a
              href="https://t.me/crystalcloudllc_bot"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-xl border border-primary/30 bg-primary/10 px-5 py-4 transition-colors hover:bg-primary/20"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium">Telegram</div>
                  <div className="text-xs text-muted-foreground">{t.contact.telegramNote}</div>
                </div>
              </div>
              <ArrowUpRight className="h-5 w-5 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <a href="mailto:hello@crystalcloud.dev" className="flex items-center justify-between rounded-xl border border-border bg-card/40 px-5 py-4 hover:bg-card">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg border border-border">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-medium">hello@crystalcloud.dev</div>
                  <div className="text-xs text-muted-foreground">{t.contact.emailNote}</div>
                </div>
              </div>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
            </a>
          </div>

          <div className="mt-8 flex gap-3">
            {[
              { href: "https://t.me/crystalcloudllc_bot", icon: <TelegramIcon />, label: "Telegram" },
              { href: "https://instagram.com", icon: <Instagram className="h-4 w-4" />, label: "Instagram" },
              { href: "https://facebook.com", icon: <Facebook className="h-4 w-4" />, label: "Facebook" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={onSubmit} className="card-surface space-y-4 p-6 md:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t.contact.form.name} name="name" placeholder={t.contact.form.namePh} required />
            <Field label={t.contact.form.email} name="email" type="text" placeholder={t.contact.form.emailPh} required />
          </div>
          <Field label={t.contact.form.company} name="company" placeholder={t.contact.form.companyPh} />
          <div>
            <label className="mb-2 block text-xs font-medium text-muted-foreground">
              {t.contact.form.project}
            </label>
            <textarea
              name="message"
              required
              rows={5}
              placeholder={t.contact.form.projectPh}
              className="w-full resize-none rounded-lg border border-input bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/60 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.01] disabled:opacity-60"
          >
            {sending ? (lang === "ru" ? "Отправка…" : "Sending…") : sent ? t.contact.form.sent : (
              <>
                {t.contact.form.send}
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>
          {error && <p className="text-center text-[12px] text-destructive">{error}</p>}
          <p className="text-center text-[11px] text-muted-foreground">{t.contact.form.disclaimer}</p>

        </form>
      </div>
    </section>
  );
}

function Field(props: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-muted-foreground">{props.label}</label>
      <input
        name={props.name}
        type={props.type ?? "text"}
        required={props.required}
        placeholder={props.placeholder}
        className="w-full rounded-lg border border-input bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/60 focus:outline-none"
      />
    </div>
  );
}

/* ---------- Footer ---------- */
function Footer({ t, lang }: { t: Dict; lang: Lang }) {
  const nav = [
    { href: "#about", label: t.nav.about },
    { href: "#skills", label: t.nav.skills },
    { href: "#projects", label: t.nav.projects },
    { href: "#services", label: t.nav.services },
    { href: "#faq", label: t.nav.faq },
    { href: "#contact", label: t.nav.contact },
  ];
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-x py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="grid h-8 w-8 place-items-center rounded-md border border-primary/40 bg-primary/10">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <span className="font-display text-sm font-semibold">Crystal Cloud LLC</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">{t.footer.tagline}</p>
            <div className="mt-4">
              <LangSwitcher lang={lang} label={t.nav.switchTo} />
            </div>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground/70">
              {t.footer.navigate}
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-muted-foreground hover:text-foreground">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground/70">
              {t.footer.contact}
            </div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>hello@crystalcloud.dev</li>
              <li>{t.footer.telegram}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} Crystal Cloud LLC. {t.footer.rights}</div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {t.footer.ops}
          </div>
        </div>
      </div>
    </footer>
  );
}

// Re-export helper so route files can use it in head()
export { pathFor };
