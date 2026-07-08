export type Lang = "en" | "ru";

export const LANGS: Lang[] = ["en", "ru"];

export const pathFor = (lang: Lang) => (lang === "en" ? "/" : "/ru");

export type Dict = typeof en;

export const en = {
  meta: {
    title: "Crystal Cloud LLC — Tree Removal & Arborist Services in Sacramento, CA",
    description:
      "Licensed and insured tree removal, branch pruning, palm cleaning, and tree care in Sacramento and throughout California. Free same-day estimates.",
    ogTitle: "Crystal Cloud LLC — Tree Removal & Arborist Services",
    ogDescription:
      "Safe tree removal, pruning, palm cleaning, and emergency storm cleanup in Sacramento and all of California. Licensed & insured.",
  },
  nav: {
    about: "About",
    skills: "Services",
    projects: "Work",
    services: "Services",
    faq: "FAQ",
    contact: "Contact",
    order: "Free estimate",
    menu: "Toggle menu",
    switchTo: "Switch to Russian",
  },
  hero: {
    badge: "LICENSED & INSURED · SAME-DAY QUOTES",
    titleA: "Safe tree removal",
    titleB: "any difficulty, done right.",
    subtitleA:
      "Crystal Cloud LLC provides professional arborist services in Sacramento and across California. Founded by ",
    subtitleFounder: "Andrii Biedariev",
    subtitleB: " — a licensed, insured crew ready for residential and commercial jobs.",
    ctaPrimary: "Get a free estimate",
    ctaSecondary: "View our work",
    stats: [
      { k: "10+", v: "Years experience" },
      { k: "500+", v: "Trees removed" },
      { k: "Licensed", v: "Fully insured" },
      { k: "24/7", v: "Emergency service" },
    ],
  },
  marquee: {
    label: "Trusted services",
    items: ["Tree Removal", "Pruning", "Palm Cleaning", "Stump Grinding", "Emergency", "Licensed & Insured"],
  },
  about: {
    eyebrow: "About",
    titleA: "A team that protects ",
    titleAccent: "your property and trees.",
    body: "Crystal Cloud LLC is a licensed and insured tree service company based in Sacramento, serving the entire state of California. We specialize in safe tree removals, precision pruning, palm cleaning, stump grinding, and emergency storm response. Every job is planned to protect your home, landscape, and family.",
    values: [
      "Licensed & insured",
      "Zero-damage approach",
      "Same-day estimates",
      "Emergency response",
    ],
    founderRole: "Founder & Lead Arborist",
  },
  skills: {
    eyebrow: "Services",
    titleA: "The equipment and expertise ",
    titleAccent: "for every tree job.",
    groups: [
      { title: "Safe Removal", items: ["Large trees", "Tight spaces", "Crane-assisted", "Sectional dismantling"] },
      { title: "Pruning & Trimming", items: ["Canopy reduction", "Deadwood removal", "Clearance over roofs", "Structural pruning"] },
      { title: "Palm Care", items: ["Palm cleaning", "Skinning", "Frond removal", "Seed pod removal"] },
      { title: "Stump Grinding", items: ["Below-grade removal", "Root chasing", "Replanting prep", "Clean finish"] },
      { title: "Emergency Response", items: ["Storm damage", "Fallen trees", "Hazardous limbs", "24/7 dispatch"] },
      { title: "Tree Health", items: ["Diagnosis", "Cabling & bracing", "Pest advice", "Long-term care plans"] },
    ],
  },
  projects: {
    eyebrow: "Case studies",
    title: "Selected work with real results.",
    discuss: "Request a quote",
    items: [
      {
        tag: "Removal · Residential",
        title: "Large oak removal in a tight backyard",
        body: "A 60-foot oak standing within feet of a home. Removed piece by piece with a crane, leaving the yard and fence untouched.",
        metrics: [
          { k: "0", v: "Damage claims" },
          { k: "1 day", v: "Turnaround" },
          { k: "100%", v: "Debris cleared" },
        ],
      },
      {
        tag: "Pruning · Residential",
        title: "Branch clearance over a two-story roof",
        body: "Trimmed overhanging branches threatening the roof and gutters. Improved sunlight and eliminated storm-risk contact.",
        metrics: [
          { k: "100%", v: "Roof protected" },
          { k: "-40%", v: "Wind load" },
          { k: "Same day", v: "Completed" },
        ],
      },
      {
        tag: "Palm · Commercial",
        title: "Palm cleaning for a commercial property",
        body: "Cleaned and skinned dozens of palm trees across a retail property, improving curb appeal and safety.",
        metrics: [
          { k: "24", v: "Palms cleaned" },
          { k: "2 days", v: "On-site" },
          { k: "Licensed", v: "Commercial permit" },
        ],
      },
      {
        tag: "Storm · Emergency",
        title: "Storm cleanup after a wind event",
        body: "Responded overnight to remove fallen trees and broken limbs blocking driveways and endangering structures.",
        metrics: [
          { k: "3", v: "Properties cleared" },
          { k: "4h", v: "Response time" },
          { k: "24/7", v: "Dispatch" },
        ],
      },
    ],
  },
  services: {
    eyebrow: "Services",
    title: "How we work with you.",
    subtitle:
      "From a single limb to an entire property, we scope every job safely and transparently.",
    items: [
      {
        title: "Tree Removal",
        body: "Safe removal of dead, diseased, or unwanted trees — even in tight spaces or near structures.",
        points: ["Crane-assisted", "Sectional dismantling", "Debris removal"],
      },
      {
        title: "Pruning & Trimming",
        body: "Precision pruning that improves tree health, clearance, and appearance without over-cutting.",
        points: ["Roof clearance", "Deadwood removal", "Canopy shaping"],
      },
      {
        title: "Palm Cleaning",
        body: "Regular palm maintenance that keeps palms healthy and your property looking sharp.",
        points: ["Frond removal", "Skinning", "Seed pod cleanup"],
      },
      {
        title: "Stump Grinding",
        body: "Complete stump and surface root removal so you can reclaim and replant the area.",
        points: ["Below-grade grind", "Replanting prep", "Clean topsoil"],
      },
    ],
    processTitle: "Our process",
    steps: [
      { n: "01", t: "Request", d: "Call or message with photos and details." },
      { n: "02", t: "Estimate", d: "Free, written quote with no hidden fees." },
      { n: "03", t: "Schedule", d: "We arrive on time, fully equipped." },
      { n: "04", t: "Done", d: "Tree work complete, site cleaned, payment easy." },
    ],
  },
  testimonials: {
    eyebrow: "Testimonials",
    title: "Trusted by homeowners and businesses.",
    items: [
      {
        q: "They removed a huge tree inches from our house without a single scratch. True professionals.",
        n: "M. Kovalenko",
        r: "Homeowner, Sacramento",
      },
      {
        q: "Fast quote, on-time crew, and the yard was cleaner than when they arrived. Highly recommend.",
        n: "S. Levchenko",
        r: "Property manager, Roseville",
      },
      {
        q: "Came out the same night after a storm. Removed a fallen tree blocking our driveway in hours.",
        n: "A. Petrov",
        r: "Homeowner, Folsom",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Answers, not sales pitches.",
    subtitle: "Still curious? Reach out on Telegram or WhatsApp and get a reply the same day.",
    items: [
      {
        q: "Are you licensed and insured?",
        a: "Yes. Crystal Cloud LLC carries full liability insurance and all required California contractor licensing for tree work.",
      },
      {
        q: "Do you provide free estimates?",
        a: "Absolutely. We provide free written estimates, often the same day you contact us, with no hidden fees.",
      },
      {
        q: "Can you remove trees close to houses or power lines?",
        a: "Yes — tight spaces, near structures, and difficult access are our specialty. We use sectional dismantling and cranes when needed.",
      },
      {
        q: "Do you offer emergency service?",
        a: "Yes. We have 24/7 emergency response for storm damage, fallen trees, and hazardous limbs.",
      },
      {
        q: "What areas do you serve?",
        a: "Sacramento and the surrounding region, plus tree work across all of California. Travel and permitting are handled by our team.",
      },
    ],
  },
  blog: {
    eyebrow: "Journal",
    title: "Tree care notes from the field.",
    all: "All articles",
    read: "Read article",
    posts: [
      { tag: "Tree removal", title: "When is a tree too dangerous to keep?", date: "Jun 2026" },
      { tag: "Pruning", title: "How to prune branches over your roof safely", date: "May 2026" },
      { tag: "Palm care", title: "Why palm cleaning matters for California homes", date: "Apr 2026" },
    ],
  },
  contact: {
    eyebrow: "Contact",
    titleA: "Get your free ",
    titleAccent: "estimate today.",
    subtitle:
      "Reply within one business day. For urgent tree emergencies, message us on Telegram — we monitor it around the clock.",
    telegramNote: "@crystalcloud · fastest reply",
    emailNote: "Free estimates",
    form: {
      name: "Name",
      namePh: "Your name",
      email: "Phone or email",
      emailPh: "you@email.com or (916) 000-0000",
      company: "Address",
      companyPh: "Property address (optional)",
      project: "Job details",
      projectPh: "Describe the tree work, location, and any urgency.",
      send: "Request estimate",
      sent: "Request sent — we'll reply soon",
      disclaimer: "We reply within 1 business day. No spam, ever.",
    },
  },
  footer: {
    tagline:
      "Licensed and insured tree removal, pruning, and palm care in Sacramento and throughout California. Founded and led by Andrii Biedariev.",
    navigate: "Navigate",
    contact: "Contact",
    telegram: "@crystalcloud on Telegram",
    rights: "All rights reserved.",
    ops: "All systems operational",
  },
};

export const ru: Dict = {
  meta: {
    title: "Crystal Cloud LLC — Спил деревьев и услуги арбориста в Сакраменто, Калифорния",
    description:
      "Лицензированная и застрахованная команда. Спил деревьев, обрезка веток, чистка пальм, уход за деревьями в Сакраменто и по всей Калифорнии. Бесплатные оценки в тот же день.",
    ogTitle: "Crystal Cloud LLC — Спил деревьев и услуги арбориста",
    ogDescription:
      "Безопасный спил деревьев, обрезка, чистка пальм и устранение последствий штормов в Сакраменто и по всей Калифорнии. Лицензия и страховка.",
  },
  nav: {
    about: "О нас",
    skills: "Услуги",
    projects: "Работы",
    services: "Услуги",
    faq: "FAQ",
    contact: "Контакты",
    order: "Бесплатная оценка",
    menu: "Открыть меню",
    switchTo: "Switch to English",
  },
  hero: {
    badge: "ЛИЦЕНЗИЯ И СТРАХОВКА · ОЦЕНКА В ТОТ ЖЕ ДЕНЬ",
    titleA: "Безопасный спил деревьев",
    titleB: "любой сложности.",
    subtitleA:
      "Crystal Cloud LLC оказывает профессиональные услуги арбориста в Сакраменто и по всей Калифорнии. Основана ",
    subtitleFounder: "Андреем Бедаревым",
    subtitleB: " — лицензированная и застрахованная бригада для частных и коммерческих объектов.",
    ctaPrimary: "Бесплатная оценка",
    ctaSecondary: "Смотреть работы",
    stats: [
      { k: "10+", v: "Лет опыта" },
      { k: "500+", v: "Спиленных деревьев" },
      { k: "Лицензия", v: "Полная страховка" },
      { k: "24/7", v: "Экстренный выезд" },
    ],
  },
  marquee: {
    label: "Проверенные услуги",
    items: ["Спил деревьев", "Обрезка", "Чистка пальм", "Удаление пней", "Экстренно", "Лицензия и страховка"],
  },
  about: {
    eyebrow: "О нас",
    titleA: "Команда, которая защищает ",
    titleAccent: "вашу недвижимость и деревья.",
    body: "Crystal Cloud LLC — лицензированная и застрахованная компания по обслуживанию деревьев из Сакраменто, работающая по всему штату Калифорния. Мы специализируемся на безопасном спиле деревьев, точечной обрезке, чистке пальм, удалении пней и экстренном реагировании на штормы. Каждая работа планируется так, чтобы защитить ваш дом, ландшафт и семью.",
    values: [
      "Лицензия и страховка",
      "Подход без повреждений",
      "Оценка в тот же день",
      "Экстренный выезд",
    ],
    founderRole: "Основатель и главный арборист",
  },
  skills: {
    eyebrow: "Услуги",
    titleA: "Оборудование и экспертиза ",
    titleAccent: "для любой работы с деревьями.",
    groups: [
      { title: "Безопасный спил", items: ["Крупные деревья", "Тесные пространства", "С помощью крана", "Секционный демонтаж"] },
      { title: "Обрезка и подрезка", items: ["Сокращение кроны", "Удаление сухих веток", "Просвет над крышей", "Структурная обрезка"] },
      { title: "Уход за пальмами", items: ["Чистка пальм", "Шкурение", "Удаление листьев", "Удаление семенных гроздей"] },
      { title: "Удаление пней", items: ["Полное удаление", "Прорезка корней", "Подготовка к посадке", "Чистая поверхность"] },
      { title: "Экстренная помощь", items: ["Последствия штормов", "Падшие деревья", "Опасные ветки", "Дежурство 24/7"] },
      { title: "Здоровье деревьев", items: ["Диагностика", "Кабельная/распорная фиксация", "Консультации по вредителям", "Долгосрочный уход"] },
    ],
  },
  projects: {
    eyebrow: "Кейсы",
    title: "Отобранные работы с реальным результатом.",
    discuss: "Запросить оценку",
    items: [
      {
        tag: "Спил · Частный дом",
        title: "Спил большого дуба в тесном дворе",
        body: "18-метровый дуб в нескольких футах от дома. Демонтировали по секциям с краном, не задев двор и забор.",
        metrics: [
          { k: "0", v: "Страховых случаев" },
          { k: "1 день", v: "Выполнение" },
          { k: "100%", v: "Мусор вывезен" },
        ],
      },
      {
        tag: "Обрезка · Частный дом",
        title: "Обрезка веток над двухэтажной крышей",
        body: "Убрали нависающие ветки, угрожавшие крыше и водостокам. Улучшили освещённость и устранили риск при шторме.",
        metrics: [
          { k: "100%", v: "Крыша защищена" },
          { k: "-40%", v: "Парусность" },
          { k: "В тот же день", v: "Готово" },
        ],
      },
      {
        tag: "Пальмы · Коммерция",
        title: "Чистка пальм для коммерческого объекта",
        body: "Почистили и ободрали десятки пальм на территории торгового центра, улучшив внешний вид и безопасность.",
        metrics: [
          { k: "24", v: "Пальмы очищены" },
          { k: "2 дня", v: "На объекте" },
          { k: "Лицензия", v: "Коммерческий допуск" },
        ],
      },
      {
        tag: "Шторм · Экстренно",
        title: "Уборка после шторма",
        body: "Выехали ночью, убрали упавшие деревья и обломанные ветки, перекрывавшие подъезды и угрожавшие постройкам.",
        metrics: [
          { k: "3", v: "Участка очищено" },
          { k: "4 ч", v: "Время реакции" },
          { k: "24/7", v: "Дежурство" },
        ],
      },
    ],
  },
  services: {
    eyebrow: "Услуги",
    title: "Как мы работаем с вами.",
    subtitle:
      "От одной ветки до всего участка — каждая работа оценивается безопасно и прозрачно.",
    items: [
      {
        title: "Спил деревьев",
        body: "Безопасный спил сухих, больных или нежелательных деревьев — даже в тесноте и рядом с постройками.",
        points: ["С краном", "Секционный демонтаж", "Вывоз мусора"],
      },
      {
        title: "Обрезка и подрезка",
        body: "Точечная обрезка, которая улучшает здоровье дерева, просвет и внешний вид без избыточного среза.",
        points: ["Просвет над крышей", "Удаление сухих веток", "Формирование кроны"],
      },
      {
        title: "Чистка пальм",
        body: "Регулярный уход за пальмами, который поддерживает их здоровье и аккуратный вид участка.",
        points: ["Удаление листьев", "Шкурение", "Уборка семенных гроздей"],
      },
      {
        title: "Удаление пней",
        body: "Полное удаление пня и поверхностных корней, чтобы вы могли засеять или посадить новое растение.",
        points: ["Полное измельчение", "Подготовка к посадке", "Чистый грунт"],
      },
    ],
    processTitle: "Наш процесс",
    steps: [
      { n: "01", t: "Заявка", d: "Позвоните или напишите с фото и описанием." },
      { n: "02", t: "Оценка", d: "Бесплатная письменная смета без скрытых платежей." },
      { n: "03", t: "Выезд", d: "Приезжаем вовремя, полностью экипированы." },
      { n: "04", t: "Готово", d: "Работа выполнена, участок убран, оплата удобна." },
    ],
  },
  testimonials: {
    eyebrow: "Отзывы",
    title: "Нам доверяют владельцы домов и бизнеса.",
    items: [
      {
        q: "Убрали огромное дерево в нескольких дюймах от дома без единой царапины. Настоящие профессионалы.",
        n: "М. Коваленко",
        r: "Владелец дома, Сакраменто",
      },
      {
        q: "Быстрая оценка, пунктуальная бригада, и двор стал чище, чем до их приезда. Очень рекомендую.",
        n: "С. Левченко",
        r: "Управляющий недвижимостью, Розвилл",
      },
      {
        q: "Приехали той же ночью после шторма. Убрали упавшее дерево, блокировавшее подъезд, за несколько часов.",
        n: "А. Петров",
        r: "Владелец дома, Фолсом",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Ответы, а не продажи.",
    subtitle: "Остались вопросы? Напишите в Telegram или WhatsApp — ответим в тот же день.",
    items: [
      {
        q: "У вас есть лицензия и страховка?",
        a: "Да. Crystal Cloud LLC имеет полное страхование ответственности и все необходимые лицензии подрядчика Калифорнии для работы с деревьями.",
      },
      {
        q: "Вы даёте бесплатные оценки?",
        a: "Конечно. Мы предоставляем бесплатные письменные сметы, часто в тот же день обращения, без скрытых платежей.",
      },
      {
        q: "Можете ли вы спилить дерево рядом с домом или линиями электропередач?",
        a: "Да — тесные пространства, близость к постройкам и сложный доступ — наша специализация. При необходимости используем секционный демонтаж и краны.",
      },
      {
        q: "Есть ли экстренная служба?",
        a: "Да. У нас есть круглосуточная экстренная помощь при штормовых повреждениях, падении деревьев и опасных ветках.",
      },
      {
        q: "Какие районы вы обслуживаете?",
        a: "Сакраменто и окрестности, а также работы с деревьями по всей Калифорнии. Дорогу и разрешения берём на себя.",
      },
    ],
  },
  blog: {
    eyebrow: "Блог",
    title: "Заметки об уходе за деревьями из практики.",
    all: "Все статьи",
    read: "Читать статью",
    posts: [
      { tag: "Спил деревьев", title: "Когда дерево слишком опасно, чтобы его оставлять?", date: "Июнь 2026" },
      { tag: "Обрезка", title: "Как безопасно обрезать ветки над крышей", date: "Май 2026" },
      { tag: "Уход за пальмами", title: "Почему чистка пальм важна для домов Калифорнии", date: "Апр 2026" },
    ],
  },
  contact: {
    eyebrow: "Контакты",
    titleA: "Получите бесплатную ",
    titleAccent: "оценку сегодня.",
    subtitle:
      "Отвечаем в течение одного рабочего дня. Срочные случаи — в Telegram, мы на связи круглосуточно.",
    telegramNote: "@crystalcloud · самый быстрый ответ",
    emailNote: "Бесплатные оценки",
    form: {
      name: "Имя",
      namePh: "Ваше имя",
      email: "Телефон или email",
      emailPh: "you@email.com или (916) 000-0000",
      company: "Адрес",
      companyPh: "Адрес объекта (необязательно)",
      project: "Детали работы",
      projectPh: "Опишите работу с деревьями, местоположение и срочность.",
      send: "Запросить оценку",
      sent: "Запрос отправлен — скоро свяжемся",
      disclaimer: "Отвечаем в течение 1 рабочего дня. Без спама.",
    },
  },
  footer: {
    tagline:
      "Лицензированный и застрахованный спил деревьев, обрезка и чистка пальм в Сакраменто и по всей Калифорнии. Основана и ведётся Андреем Бедаревым.",
    navigate: "Навигация",
    contact: "Контакты",
    telegram: "@crystalcloud в Telegram",
    rights: "Все права защищены.",
    ops: "Все системы работают",
  },
};

export const dicts: Record<Lang, Dict> = { en, ru };
