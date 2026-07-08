import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Cloud,
  Cpu,
  Database,
  GitBranch,
  Globe,
  Lock,
  Menu,
  MessageCircle,
  Minus,
  Plus,
  Send,
  Server,
  Shield,
  Sparkles,
  Terminal,
  X,
  Instagram,
  Facebook,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import founderImg from "@/assets/founder.jpg";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "Crystal Cloud LLC — Cloud & DevOps Consulting" },
      {
        name: "description",
        content:
          "Andrii Biedariev and Crystal Cloud LLC design resilient cloud infrastructure, DevOps automation and platform engineering for modern teams.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const NAV = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Expertise" },
  { href: "#projects", label: "Case Studies" },
  { href: "#services", label: "Services" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

function Landing() {
  return (
    <main className="relative min-h-dvh overflow-x-hidden bg-background text-foreground">
      <Header />
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Projects />
      <Services />
      <Testimonials />
      <FAQ />
      <Blog />
      <Contact />
      <Footer />
    </main>
  );
}

/* ---------- Header ---------- */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            Order service
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-md border border-border md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {NAV.map((n) => (
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
              Order service <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
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
              AVAILABLE FOR NEW ENGAGEMENTS · Q3
            </span>
          </div>

          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            <span className="text-gradient">Cloud infrastructure</span>
            <br />
            <span className="accent-gradient">engineered for scale.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
            Crystal Cloud LLC partners with growing teams to design, automate and
            operate resilient cloud platforms. Founded by{" "}
            <span className="text-foreground">Andrii Biedariev</span> — 10+ years
            building infrastructure that ships.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#contact"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-[0_0_40px_-8px_oklch(0.72_0.17_162/0.6)] transition-transform hover:scale-[1.02] sm:w-auto"
            >
              Order a service
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#projects"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-secondary/40 px-7 py-3.5 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-secondary sm:w-auto"
            >
              View case studies
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
            <SocialLink href="https://t.me/crystalcloud" icon={<TelegramIcon />} label="Telegram" />
            <SocialLink href="https://instagram.com" icon={<Instagram className="h-4 w-4" />} label="Instagram" />
            <SocialLink href="https://facebook.com" icon={<Facebook className="h-4 w-4" />} label="Facebook" />
          </div>
        </div>

        {/* Metric strip */}
        <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
          {[
            { k: "10+", v: "Years experience" },
            { k: "60+", v: "Projects delivered" },
            { k: "99.98%", v: "Uptime achieved" },
            { k: "24/7", v: "Support coverage" },
          ].map((s) => (
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
function Marquee() {
  const items = ["AWS", "Google Cloud", "Kubernetes", "Terraform", "PostgreSQL", "Docker", "GitLab", "Prometheus"];
  return (
    <section aria-label="Technology partners" className="border-y border-border/60 bg-background/60 py-8">
      <div className="container-x flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-muted-foreground">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground/70">Trusted stack</span>
        {items.map((i) => (
          <span key={i} className="font-display text-base font-medium text-foreground/70">
            {i}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------- About ---------- */
function About() {
  return (
    <section id="about" className="section-y">
      <div className="container-x grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-16">
        <div>
          <div className="relative overflow-hidden rounded-2xl border border-border">
            <img
              src={founderImg}
              alt="Andrii Biedariev, founder of Crystal Cloud LLC"
              width={800}
              height={1000}
              loading="lazy"
              className="h-full w-full object-cover grayscale-[15%]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-6">
              <div className="font-display text-lg font-semibold">Andrii Biedariev</div>
              <div className="text-xs text-muted-foreground">Founder & Principal Engineer</div>
            </div>
          </div>
        </div>

        <div>
          <p className="eyebrow"><Minus className="h-3 w-3" /> About</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight md:text-5xl">
            A boutique studio for teams that <span className="accent-gradient">refuse downtime.</span>
          </h2>
          <p className="mt-6 text-base text-muted-foreground md:text-lg">
            Crystal Cloud LLC is an independent cloud & DevOps practice. We help
            product teams move faster without sacrificing reliability — from
            architecture through 24/7 operations. Every engagement is led directly
            by the founder, backed by a hand-picked network of senior engineers.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Senior-only engineering",
              "Founder-led delivery",
              "SLA-backed reliability",
              "Transparent pricing",
            ].map((v) => (
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
function Skills() {
  const groups = [
    {
      icon: <Cloud className="h-5 w-5" />,
      title: "Cloud Platforms",
      items: ["AWS", "Google Cloud", "Azure", "Cloudflare", "Hetzner"],
    },
    {
      icon: <GitBranch className="h-5 w-5" />,
      title: "DevOps & CI/CD",
      items: ["GitHub Actions", "GitLab CI", "ArgoCD", "Jenkins", "Nix"],
    },
    {
      icon: <Server className="h-5 w-5" />,
      title: "Infrastructure",
      items: ["Kubernetes", "Terraform", "Ansible", "Pulumi", "Helm"],
    },
    {
      icon: <Database className="h-5 w-5" />,
      title: "Data & Storage",
      items: ["PostgreSQL", "Redis", "ClickHouse", "S3", "Kafka"],
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Security",
      items: ["Zero-trust", "IAM", "SOC2 readiness", "Vault", "WAF"],
    },
    {
      icon: <Cpu className="h-5 w-5" />,
      title: "Observability",
      items: ["Prometheus", "Grafana", "Loki", "OpenTelemetry", "Sentry"],
    },
  ];

  return (
    <section id="skills" className="section-y border-t border-border/60">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">Expertise</p>
          <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">
            The complete stack, <span className="accent-gradient">operated by one team.</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => (
            <div key={g.title} className="card-surface card-hover p-6">
              <div className="mb-5 grid h-11 w-11 place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                {g.icon}
              </div>
              <h3 className="font-display text-lg font-semibold">{g.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((i) => (
                  <li key={i} className="rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs text-muted-foreground">
                    {i}
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
function Projects() {
  const projects = [
    {
      tag: "Fintech · Migration",
      title: "Zero-downtime migration to multi-region AWS",
      body: "Rebuilt a legacy monolith into a Kubernetes platform across three regions, with automated failover and cost controls.",
      metrics: [
        { k: "-42%", v: "Cloud spend" },
        { k: "99.99%", v: "Uptime" },
        { k: "12x", v: "Deploy freq." },
      ],
    },
    {
      tag: "SaaS · Platform",
      title: "Internal developer platform for a 60-engineer team",
      body: "Golden paths, self-service environments, and a paved-road CI/CD. Onboarding time dropped from days to hours.",
      metrics: [
        { k: "3h", v: "Onboarding" },
        { k: "8→80", v: "Deploys/day" },
        { k: "SOC2", v: "Ready" },
      ],
    },
    {
      tag: "E-commerce · Scale",
      title: "Peak-season autoscaling for a retail launch",
      body: "Designed traffic shaping and predictive scaling, absorbed a 20x traffic spike without a single incident.",
      metrics: [
        { k: "20x", v: "Traffic peak" },
        { k: "0", v: "Incidents" },
        { k: "-31%", v: "P95 latency" },
      ],
    },
    {
      tag: "AI · Infra",
      title: "GPU inference platform on Kubernetes",
      body: "Serverless-style GPU scheduling with warm pools and cost-aware placement across two clouds.",
      metrics: [
        { k: "-58%", v: "GPU cost" },
        { k: "120ms", v: "Cold start" },
        { k: "2 clouds", v: "Portable" },
      ],
    },
  ];

  return (
    <section id="projects" className="section-y border-t border-border/60">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">Case studies</p>
            <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">
              Selected work with measurable impact.
            </h2>
          </div>
          <a href="#contact" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
            Discuss your project <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {projects.map((p) => (
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

/* ---------- Services ---------- */
function Services() {
  const services = [
    {
      icon: <Cloud className="h-5 w-5" />,
      title: "Cloud Architecture",
      body: "From greenfield to migration — right-sized designs that don't box you in.",
      points: ["Multi-region", "Cost modelling", "Landing zones"],
    },
    {
      icon: <GitBranch className="h-5 w-5" />,
      title: "DevOps & Automation",
      body: "CI/CD, IaC, and platform tooling that lets your team ship without friction.",
      points: ["Terraform / Pulumi", "GitOps", "Release engineering"],
    },
    {
      icon: <Server className="h-5 w-5" />,
      title: "Kubernetes Operations",
      body: "Production-grade clusters, observability and incident response, day one to day 1000.",
      points: ["Cluster design", "SRE playbooks", "24/7 on-call"],
    },
    {
      icon: <Lock className="h-5 w-5" />,
      title: "Security & Compliance",
      body: "Zero-trust foundations, IAM, secrets management and SOC2 readiness.",
      points: ["IAM hardening", "Vault", "Audit trails"],
    },
  ];

  const steps = [
    { n: "01", t: "Discovery", d: "Audit, goals and constraints." },
    { n: "02", t: "Blueprint", d: "Architecture, timeline and budget." },
    { n: "03", t: "Delivery", d: "Iterative rollout with your team." },
    { n: "04", t: "Operate", d: "SLAs, monitoring and evolution." },
  ];

  return (
    <section id="services" className="section-y border-t border-border/60">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">Services</p>
          <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">
            How we work with you.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Engagements scoped to your reality — from a focused audit to fully
            managed platform operations.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {services.map((s) => (
            <div key={s.title} className="card-surface card-hover p-6 md:p-7">
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                  {s.icon}
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
            <Terminal className="h-5 w-5 text-primary" />
            <h3 className="font-display text-xl font-semibold">Engagement process</h3>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.n} className="relative">
                <div className="font-mono text-xs text-primary">{s.n}</div>
                <div className="mt-2 font-display text-lg font-semibold">{s.t}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.d}</div>
                {i < steps.length - 1 && (
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
function Testimonials() {
  const items = [
    {
      q: "Andrii rebuilt our platform in a quarter — the team ships without fear now.",
      n: "M. Kovalenko",
      r: "CTO, Fintech scale-up",
    },
    {
      q: "The most competent cloud engineer we've worked with. Communication is exceptional.",
      n: "S. Levchenko",
      r: "VP Engineering, SaaS",
    },
    {
      q: "Cut our AWS bill nearly in half without a single degradation. Recommended without reservation.",
      n: "A. Petrov",
      r: "Founder, E-commerce",
    },
  ];
  return (
    <section className="section-y border-t border-border/60">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">Testimonials</p>
          <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">
            Trusted by teams who ship.
          </h2>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {items.map((t) => (
            <figure key={t.n} className="card-surface p-7">
              <div className="font-display text-2xl leading-none text-primary">"</div>
              <blockquote className="mt-3 text-sm leading-relaxed text-foreground/90 md:text-base">
                {t.q}
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <div className="text-sm font-medium">{t.n}</div>
                <div className="text-xs text-muted-foreground">{t.r}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const items = [
    {
      q: "How do engagements typically start?",
      a: "With a discovery call. If it's a fit, we scope a focused 1–2 week audit and share a written plan before any long-term commitment.",
    },
    {
      q: "Do you work with existing infrastructure?",
      a: "Yes — most engagements start from an existing environment. We prefer incremental improvements over rewrites when it's the right call.",
    },
    {
      q: "What's your pricing model?",
      a: "Fixed-scope projects, monthly retainers, or hourly for smaller engagements. Every proposal is transparent and outcome-based.",
    },
    {
      q: "Do you provide 24/7 on-call?",
      a: "Yes, as part of managed operations. SLAs and escalation paths are agreed upfront and reviewed quarterly.",
    },
    {
      q: "Which industries do you serve?",
      a: "Fintech, SaaS, e-commerce and AI/ML platforms. We focus on teams where reliability is a business requirement, not a nice-to-have.",
    },
  ];

  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section-y border-t border-border/60">
      <div className="container-x grid gap-10 md:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">
            Answers, not sales pitches.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Still curious? Reach out on Telegram and get a reply the same day.
          </p>
        </div>
        <div className="divide-y divide-border rounded-2xl border border-border bg-card/40">
          {items.map((it, idx) => {
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
function Blog() {
  const posts = [
    {
      tag: "Kubernetes",
      title: "Cost-aware GPU scheduling patterns for inference",
      date: "Jun 2026",
    },
    {
      tag: "DevOps",
      title: "Golden paths: shipping a paved road your team will use",
      date: "May 2026",
    },
    {
      tag: "Reliability",
      title: "The quiet economics of 99.99% uptime",
      date: "Apr 2026",
    },
  ];
  return (
    <section className="section-y border-t border-border/60">
      <div className="container-x">
        <div className="flex items-end justify-between">
          <div>
            <p className="eyebrow">Journal</p>
            <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">Notes from the field.</h2>
          </div>
          <a href="#" className="hidden items-center gap-2 text-sm text-primary hover:underline sm:inline-flex">
            All articles <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {posts.map((p) => (
            <a key={p.title} href="#" className="card-surface card-hover group flex flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-border bg-secondary/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {p.tag}
                </span>
                <span className="text-xs text-muted-foreground">{p.date}</span>
              </div>
              <h3 className="mt-6 font-display text-lg font-semibold leading-snug">{p.title}</h3>
              <div className="mt-6 flex items-center gap-2 text-sm text-primary">
                Read article
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
function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    (e.currentTarget as HTMLFormElement).reset();
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="section-y border-t border-border/60">
      <div className="container-x grid gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <p className="eyebrow">Contact</p>
          <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">
            Let's build something <span className="accent-gradient">reliable.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Reply within one business day. For urgent inquiries, ping us on Telegram —
            we monitor it around the clock.
          </p>

          <div className="mt-8 space-y-3">
            <a
              href="https://t.me/crystalcloud"
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
                  <div className="text-xs text-muted-foreground">@crystalcloud · fastest reply</div>
                </div>
              </div>
              <ArrowUpRight className="h-5 w-5 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <a href="mailto:hello@crystalcloud.dev" className="flex items-center justify-between rounded-xl border border-border bg-card/40 px-5 py-4 hover:bg-card">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg border border-border">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-medium">hello@crystalcloud.dev</div>
                  <div className="text-xs text-muted-foreground">Business inquiries</div>
                </div>
              </div>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
            </a>
          </div>

          <div className="mt-8 flex gap-3">
            {[
              { href: "https://t.me/crystalcloud", icon: <TelegramIcon />, label: "Telegram" },
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
            <Field label="Name" name="name" placeholder="Your name" required />
            <Field label="Email" name="email" type="email" placeholder="you@company.com" required />
          </div>
          <Field label="Company" name="company" placeholder="Company (optional)" />
          <div>
            <label className="mb-2 block text-xs font-medium text-muted-foreground">
              Project
            </label>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Tell us about your goals, stack and timeline."
              className="w-full resize-none rounded-lg border border-input bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/60 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.01]"
          >
            {sent ? "Message sent — talk soon" : (
              <>
                Send message
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>
          <p className="text-center text-[11px] text-muted-foreground">
            We reply within 1 business day. No spam, ever.
          </p>
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
      <label className="mb-2 block text-xs font-medium text-muted-foreground">
        {props.label}
      </label>
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
function Footer() {
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
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Cloud & DevOps consulting for teams that measure success in uptime.
              Founded and led by Andrii Biedariev.
            </p>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground/70">
              Navigate
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV.map((n) => (
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
              Contact
            </div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>hello@crystalcloud.dev</li>
              <li>@crystalcloud on Telegram</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} Crystal Cloud LLC. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
