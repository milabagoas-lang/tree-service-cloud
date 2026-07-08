export type Lang = "en" | "ru";

export const LANGS: Lang[] = ["en", "ru"];

export const pathFor = (lang: Lang) => (lang === "en" ? "/" : "/ru");

export type Dict = typeof en;

export const en = {
  meta: {
    title: "Crystal Cloud LLC — Cloud & DevOps Consulting by Andrii Biedariev",
    description:
      "Andrii Biedariev and Crystal Cloud LLC design resilient cloud infrastructure, DevOps automation and platform engineering for modern teams.",
    ogTitle: "Crystal Cloud LLC — Cloud & DevOps Consulting",
    ogDescription:
      "Premium cloud, DevOps and platform engineering by Andrii Biedariev. Case studies, services and expertise.",
  },
  nav: {
    about: "About",
    skills: "Expertise",
    projects: "Case Studies",
    services: "Services",
    faq: "FAQ",
    contact: "Contact",
    order: "Order service",
    menu: "Toggle menu",
    switchTo: "Switch to Russian",
  },
  hero: {
    badge: "AVAILABLE FOR NEW ENGAGEMENTS · Q3",
    titleA: "Cloud infrastructure",
    titleB: "engineered for scale.",
    subtitleA: "Crystal Cloud LLC partners with growing teams to design, automate and operate resilient cloud platforms. Founded by ",
    subtitleFounder: "Andrii Biedariev",
    subtitleB: " — 10+ years building infrastructure that ships.",
    ctaPrimary: "Order a service",
    ctaSecondary: "View case studies",
    stats: [
      { k: "10+", v: "Years experience" },
      { k: "60+", v: "Projects delivered" },
      { k: "99.98%", v: "Uptime achieved" },
      { k: "24/7", v: "Support coverage" },
    ],
  },
  marquee: { label: "Trusted stack" },
  about: {
    eyebrow: "About",
    titleA: "A boutique studio for teams that ",
    titleAccent: "refuse downtime.",
    body: "Crystal Cloud LLC is an independent cloud & DevOps practice. We help product teams move faster without sacrificing reliability — from architecture through 24/7 operations. Every engagement is led directly by the founder, backed by a hand-picked network of senior engineers.",
    values: [
      "Senior-only engineering",
      "Founder-led delivery",
      "SLA-backed reliability",
      "Transparent pricing",
    ],
    founderRole: "Founder & Principal Engineer",
  },
  skills: {
    eyebrow: "Expertise",
    titleA: "The complete stack, ",
    titleAccent: "operated by one team.",
    groups: [
      { title: "Cloud Platforms", items: ["AWS", "Google Cloud", "Azure", "Cloudflare", "Hetzner"] },
      { title: "DevOps & CI/CD", items: ["GitHub Actions", "GitLab CI", "ArgoCD", "Jenkins", "Nix"] },
      { title: "Infrastructure", items: ["Kubernetes", "Terraform", "Ansible", "Pulumi", "Helm"] },
      { title: "Data & Storage", items: ["PostgreSQL", "Redis", "ClickHouse", "S3", "Kafka"] },
      { title: "Security", items: ["Zero-trust", "IAM", "SOC2 readiness", "Vault", "WAF"] },
      { title: "Observability", items: ["Prometheus", "Grafana", "Loki", "OpenTelemetry", "Sentry"] },
    ],
  },
  projects: {
    eyebrow: "Case studies",
    title: "Selected work with measurable impact.",
    discuss: "Discuss your project",
    items: [
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
    ],
  },
  services: {
    eyebrow: "Services",
    title: "How we work with you.",
    subtitle:
      "Engagements scoped to your reality — from a focused audit to fully managed platform operations.",
    items: [
      {
        title: "Cloud Architecture",
        body: "From greenfield to migration — right-sized designs that don't box you in.",
        points: ["Multi-region", "Cost modelling", "Landing zones"],
      },
      {
        title: "DevOps & Automation",
        body: "CI/CD, IaC, and platform tooling that lets your team ship without friction.",
        points: ["Terraform / Pulumi", "GitOps", "Release engineering"],
      },
      {
        title: "Kubernetes Operations",
        body: "Production-grade clusters, observability and incident response, day one to day 1000.",
        points: ["Cluster design", "SRE playbooks", "24/7 on-call"],
      },
      {
        title: "Security & Compliance",
        body: "Zero-trust foundations, IAM, secrets management and SOC2 readiness.",
        points: ["IAM hardening", "Vault", "Audit trails"],
      },
    ],
    processTitle: "Engagement process",
    steps: [
      { n: "01", t: "Discovery", d: "Audit, goals and constraints." },
      { n: "02", t: "Blueprint", d: "Architecture, timeline and budget." },
      { n: "03", t: "Delivery", d: "Iterative rollout with your team." },
      { n: "04", t: "Operate", d: "SLAs, monitoring and evolution." },
    ],
  },
  testimonials: {
    eyebrow: "Testimonials",
    title: "Trusted by teams who ship.",
    items: [
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
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Answers, not sales pitches.",
    subtitle: "Still curious? Reach out on Telegram and get a reply the same day.",
    items: [
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
    ],
  },
  blog: {
    eyebrow: "Journal",
    title: "Notes from the field.",
    all: "All articles",
    read: "Read article",
    posts: [
      { tag: "Kubernetes", title: "Cost-aware GPU scheduling patterns for inference", date: "Jun 2026" },
      { tag: "DevOps", title: "Golden paths: shipping a paved road your team will use", date: "May 2026" },
      { tag: "Reliability", title: "The quiet economics of 99.99% uptime", date: "Apr 2026" },
    ],
  },
  contact: {
    eyebrow: "Contact",
    titleA: "Let's build something ",
    titleAccent: "reliable.",
    subtitle:
      "Reply within one business day. For urgent inquiries, ping us on Telegram — we monitor it around the clock.",
    telegramNote: "@crystalcloud · fastest reply",
    emailNote: "Business inquiries",
    form: {
      name: "Name",
      namePh: "Your name",
      email: "Email",
      emailPh: "you@company.com",
      company: "Company",
      companyPh: "Company (optional)",
      project: "Project",
      projectPh: "Tell us about your goals, stack and timeline.",
      send: "Send message",
      sent: "Message sent — talk soon",
      disclaimer: "We reply within 1 business day. No spam, ever.",
    },
  },
  footer: {
    tagline:
      "Cloud & DevOps consulting for teams that measure success in uptime. Founded and led by Andrii Biedariev.",
    navigate: "Navigate",
    contact: "Contact",
    telegram: "@crystalcloud on Telegram",
    rights: "All rights reserved.",
    ops: "All systems operational",
  },
};

export const ru: Dict = {
  meta: {
    title: "Crystal Cloud LLC — Облачный консалтинг и DevOps · Андрей Бедарев",
    description:
      "Андрей Бедарев и Crystal Cloud LLC проектируют отказоустойчивую облачную инфраструктуру, автоматизацию DevOps и платформенный инжиниринг для современных команд.",
    ogTitle: "Crystal Cloud LLC — Cloud и DevOps консалтинг",
    ogDescription:
      "Премиальный облачный, DevOps и платформенный инжиниринг от Андрея Бедарева. Кейсы, услуги и экспертиза.",
  },
  nav: {
    about: "О нас",
    skills: "Экспертиза",
    projects: "Кейсы",
    services: "Услуги",
    faq: "FAQ",
    contact: "Контакты",
    order: "Заказать услугу",
    menu: "Открыть меню",
    switchTo: "Switch to English",
  },
  hero: {
    badge: "ОТКРЫТЫ ДЛЯ НОВЫХ ПРОЕКТОВ · Q3",
    titleA: "Спил деревьев любой сложности",
    titleB: "в Сакраменто и по всей Калифорнии",
    subtitleA:
      "Crystal Cloud LLC помогает растущим командам проектировать, автоматизировать и эксплуатировать отказоустойчивые облачные платформы. Основана ",
    subtitleFounder: "Андреем Бедаревым",
    subtitleB: " — 10+ лет строим инфраструктуру, которая работает.",
    ctaPrimary: "Заказать услугу",
    ctaSecondary: "Смотреть кейсы",
    stats: [
      { k: "10+", v: "Лет опыта" },
      { k: "60+", v: "Реализованных проектов" },
      { k: "99.98%", v: "Достигнутый uptime" },
      { k: "24/7", v: "Поддержка" },
    ],
  },
  marquee: { label: "Проверенный стек" },
  about: {
    eyebrow: "О нас",
    titleA: "Бутиковая студия для команд, которые ",
    titleAccent: "не терпят простоя.",
    body: "Crystal Cloud LLC — независимая практика Cloud и DevOps. Мы помогаем продуктовым командам двигаться быстрее без потерь в надёжности — от архитектуры до эксплуатации 24/7. Каждый проект ведёт основатель совместно с сетью тщательно отобранных senior-инженеров.",
    values: [
      "Только senior-инженеры",
      "Проект ведёт основатель",
      "Надёжность на уровне SLA",
      "Прозрачное ценообразование",
    ],
    founderRole: "Основатель и главный инженер",
  },
  skills: {
    eyebrow: "Экспертиза",
    titleA: "Полный стек, ",
    titleAccent: "который ведёт одна команда.",
    groups: [
      { title: "Облачные платформы", items: ["AWS", "Google Cloud", "Azure", "Cloudflare", "Hetzner"] },
      { title: "DevOps и CI/CD", items: ["GitHub Actions", "GitLab CI", "ArgoCD", "Jenkins", "Nix"] },
      { title: "Инфраструктура", items: ["Kubernetes", "Terraform", "Ansible", "Pulumi", "Helm"] },
      { title: "Данные и хранилища", items: ["PostgreSQL", "Redis", "ClickHouse", "S3", "Kafka"] },
      { title: "Безопасность", items: ["Zero-trust", "IAM", "SOC2 готовность", "Vault", "WAF"] },
      { title: "Наблюдаемость", items: ["Prometheus", "Grafana", "Loki", "OpenTelemetry", "Sentry"] },
    ],
  },
  projects: {
    eyebrow: "Кейсы",
    title: "Отобранные проекты с измеримым результатом.",
    discuss: "Обсудить проект",
    items: [
      {
        tag: "Финтех · Миграция",
        title: "Миграция в мультирегиональный AWS без простоя",
        body: "Переписали устаревший монолит в платформу на Kubernetes в трёх регионах с автоматическим failover и контролем расходов.",
        metrics: [
          { k: "-42%", v: "Расходы на облако" },
          { k: "99.99%", v: "Uptime" },
          { k: "12x", v: "Частота релизов" },
        ],
      },
      {
        tag: "SaaS · Платформа",
        title: "Внутренняя платформа для команды из 60 инженеров",
        body: "Golden paths, self-service окружения и paved-road CI/CD. Онбординг сократился с дней до часов.",
        metrics: [
          { k: "3ч", v: "Онбординг" },
          { k: "8→80", v: "Деплоев/день" },
          { k: "SOC2", v: "Готовность" },
        ],
      },
      {
        tag: "E-commerce · Масштаб",
        title: "Автоскейлинг под пик сезонной распродажи",
        body: "Разработали traffic shaping и прогнозируемое масштабирование — выдержали 20-кратный всплеск трафика без инцидентов.",
        metrics: [
          { k: "20x", v: "Пик трафика" },
          { k: "0", v: "Инцидентов" },
          { k: "-31%", v: "P95 задержка" },
        ],
      },
      {
        tag: "AI · Инфраструктура",
        title: "GPU-платформа для инференса на Kubernetes",
        body: "Serverless-подобное расписание GPU с warm pools и cost-aware размещением в двух облаках.",
        metrics: [
          { k: "-58%", v: "Стоимость GPU" },
          { k: "120мс", v: "Cold start" },
          { k: "2 облака", v: "Переносимость" },
        ],
      },
    ],
  },
  services: {
    eyebrow: "Услуги",
    title: "Как мы работаем.",
    subtitle:
      "Форматы подстраиваем под вашу ситуацию — от точечного аудита до полной managed-эксплуатации платформы.",
    items: [
      {
        title: "Облачная архитектура",
        body: "От greenfield до миграции — сбалансированные решения без vendor lock-in.",
        points: ["Мультирегион", "Модель расходов", "Landing zones"],
      },
      {
        title: "DevOps и автоматизация",
        body: "CI/CD, IaC и платформенный тулинг — команда релизит без трения.",
        points: ["Terraform / Pulumi", "GitOps", "Release engineering"],
      },
      {
        title: "Kubernetes эксплуатация",
        body: "Production-кластеры, observability и реагирование на инциденты с первого дня.",
        points: ["Дизайн кластера", "SRE плейбуки", "24/7 on-call"],
      },
      {
        title: "Безопасность и compliance",
        body: "Zero-trust, IAM, управление секретами и подготовка к SOC2.",
        points: ["Усиление IAM", "Vault", "Audit trails"],
      },
    ],
    processTitle: "Процесс работы",
    steps: [
      { n: "01", t: "Discovery", d: "Аудит, цели и ограничения." },
      { n: "02", t: "Blueprint", d: "Архитектура, сроки и бюджет." },
      { n: "03", t: "Delivery", d: "Итеративный запуск с вашей командой." },
      { n: "04", t: "Operate", d: "SLA, мониторинг и развитие." },
    ],
  },
  testimonials: {
    eyebrow: "Отзывы",
    title: "Нам доверяют команды, которые релизят.",
    items: [
      {
        q: "Андрей перестроил нашу платформу за квартал — команда релизит без страха.",
        n: "М. Коваленко",
        r: "CTO, финтех-скейлап",
      },
      {
        q: "Самый компетентный cloud-инженер, с которым мы работали. Коммуникация — на высшем уровне.",
        n: "С. Левченко",
        r: "VP Engineering, SaaS",
      },
      {
        q: "Сократили счёт AWS почти вдвое без единой деградации. Рекомендую без оговорок.",
        n: "А. Петров",
        r: "Основатель, E-commerce",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Ответы, а не продажи.",
    subtitle: "Остались вопросы? Напишите в Telegram — ответим в тот же день.",
    items: [
      {
        q: "Как обычно начинается работа?",
        a: "С discovery-звонка. Если совпадаем — предлагаем сфокусированный аудит на 1–2 недели и письменный план до долгосрочных обязательств.",
      },
      {
        q: "Работаете с уже существующей инфраструктурой?",
        a: "Да — большинство проектов начинается с существующего окружения. Предпочитаем инкрементальные улучшения переписыванию, когда это оправдано.",
      },
      {
        q: "Какая модель ценообразования?",
        a: "Fixed-scope проекты, ежемесячный ретейнер или почасовая оплата для небольших задач. Каждое предложение прозрачно и ориентировано на результат.",
      },
      {
        q: "Есть ли 24/7 on-call?",
        a: "Да, в рамках managed-эксплуатации. SLA и эскалации согласуем заранее и пересматриваем ежеквартально.",
      },
      {
        q: "С какими индустриями работаете?",
        a: "Финтех, SaaS, e-commerce и AI/ML-платформы. Фокусируемся на командах, где надёжность — бизнес-требование, а не приятный бонус.",
      },
    ],
  },
  blog: {
    eyebrow: "Блог",
    title: "Заметки с боевой практики.",
    all: "Все статьи",
    read: "Читать статью",
    posts: [
      { tag: "Kubernetes", title: "Экономный шедулинг GPU для инференса", date: "Июнь 2026" },
      { tag: "DevOps", title: "Golden paths: как построить paved road, которым пользуются", date: "Май 2026" },
      { tag: "Надёжность", title: "Тихая экономика 99.99% uptime", date: "Апр 2026" },
    ],
  },
  contact: {
    eyebrow: "Контакты",
    titleA: "Построим что-то ",
    titleAccent: "надёжное.",
    subtitle:
      "Отвечаем в течение одного рабочего дня. Срочные вопросы — в Telegram, мы на связи круглосуточно.",
    telegramNote: "@crystalcloud · самый быстрый ответ",
    emailNote: "Деловые запросы",
    form: {
      name: "Имя",
      namePh: "Ваше имя",
      email: "Email",
      emailPh: "you@company.com",
      company: "Компания",
      companyPh: "Компания (необязательно)",
      project: "Проект",
      projectPh: "Расскажите о целях, стеке и сроках.",
      send: "Отправить сообщение",
      sent: "Сообщение отправлено — скоро свяжемся",
      disclaimer: "Отвечаем в течение 1 рабочего дня. Без спама.",
    },
  },
  footer: {
    tagline:
      "Cloud и DevOps консалтинг для команд, которые измеряют успех в uptime. Основана и ведётся Андреем Бедаревым.",
    navigate: "Навигация",
    contact: "Контакты",
    telegram: "@crystalcloud в Telegram",
    rights: "Все права защищены.",
    ops: "Все системы работают",
  },
};

export const dicts: Record<Lang, Dict> = { en, ru };
