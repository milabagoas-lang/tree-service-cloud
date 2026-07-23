import type { Lang } from "./dict";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string };

export type Article = {
  slug: string;
  category: string;
  date: string;
  tags: string[];
  title: string;
  excerpt: string;
  blocks: Block[];
};

type Articles = Record<string, Record<Lang, Article>>;

export const ARTICLES: Articles = {
  "kogda-derevo-opasno": {
    ru: {
      slug: "kogda-derevo-opasno",
      category: "Спил деревьев",
      date: "Июнь 2026",
      tags: ["Аварийные деревья", "Безопасность", "Арборист"],
      title: "Когда дерево слишком опасно, чтобы его оставлять?",
      excerpt:
        "Как распознать аварийное дерево у дома, какие признаки нельзя игнорировать и когда пора вызывать сертифицированного арбориста.",
      blocks: [
        {
          type: "p",
          text:
            "Красивое взрослое дерево во дворе — это тень, приватность и приятный вид из окна. Но с возрастом или после болезни то же самое дерево может стать источником серьёзной угрозы для дома, машины и людей. Разберём, по каким признакам понять, что дерево пора снимать, а не «дать ему ещё сезон».",
        },
        { type: "h2", text: "Явные признаки аварийного дерева" },
        {
          type: "ul",
          items: [
            "Наклон ствола заметно увеличился за последний год, у основания появились приподнятые корни или трещины в земле.",
            "На стволе видны глубокие продольные трещины, дупла, гниль или колонии грибов-трутовиков.",
            "Крупные сухие ветки (диаметром 5 см и более) над крышей, парковкой или дорожкой.",
            "После шторма отломились крупные скелетные ветки — это часто предвестник дальнейших обломов.",
            "Дерево стоит вплотную к линии электропередач или задевает провода при ветре.",
          ],
        },
        { type: "h2", text: "Скрытые причины, о которых часто забывают" },
        {
          type: "p",
          text:
            "Даже внешне здоровое дерево может быть внутренне пустым из-за корневой гнили или повреждений после стройки на участке. Прокладка траншей, уплотнение почвы техникой, изменение уровня грунта — всё это подрезает корни и ослабляет опору. Первые признаки такого стресса появляются только через 2–5 лет.",
        },
        { type: "h2", text: "Что делает арборист при осмотре" },
        {
          type: "ol",
          items: [
            "Визуальная оценка по методике ISA: наклон, крона, кора, корневая зона.",
            "Инструментальная проверка ствола на внутреннюю гниль (резистограф или простукивание).",
            "Оценка «мишени» — что именно попадёт под удар при падении: дом, авто, соседи, ЛЭП.",
            "Рекомендация: обрезка, кабельная стяжка кроны, снижение высоты или полное удаление.",
          ],
        },
        { type: "h2", text: "Когда решение — только удаление" },
        {
          type: "p",
          text:
            "Если ствол наклонён более чем на 15° в сторону дома, обнаружена активная корневая гниль или после шторма ушла значительная часть кроны, восстановить дерево уже нельзя. В этом случае мы снимаем дерево по частям с использованием риггинга — контролируем каждый фрагмент верёвкой, чтобы ничего не задело кровлю и забор.",
        },
        {
          type: "quote",
          text:
            "Дерево, которое «пока ещё стоит», после первого же шторма может обойтись дороже, чем ремонт кровли и страховая франшиза вместе взятые. Лучше вызвать арбориста на бесплатную оценку, чем узнавать диагноз по факту.",
        },
      ],
    },
    en: {
      slug: "kogda-derevo-opasno",
      category: "Tree removal",
      date: "Jun 2026",
      tags: ["Hazard trees", "Safety", "Arborist"],
      title: "When is a tree too dangerous to keep?",
      excerpt:
        "How to spot a hazard tree next to your home, which warning signs you can't ignore, and when it's time to call a certified arborist.",
      blocks: [
        {
          type: "p",
          text:
            "A mature tree in the yard gives you shade, privacy and a beautiful view. But with age or after disease the same tree can become a serious threat to your house, cars and family. Here's how to tell that it's time to remove it — not to give it one more season.",
        },
        { type: "h2", text: "Clear signs of a hazard tree" },
        {
          type: "ul",
          items: [
            "The trunk has visibly tilted over the past year, roots are lifting or the ground is cracking near the base.",
            "Deep vertical cracks, cavities, decay or shelf fungi on the trunk.",
            "Large dead branches (2\" or more) hanging over the roof, driveway or walkway.",
            "Major scaffold branches broke off after a storm — usually a sign more failures are coming.",
            "The tree is touching or growing into a power line.",
          ],
        },
        { type: "h2", text: "Hidden causes people often miss" },
        {
          type: "p",
          text:
            "A tree that looks healthy can be hollow inside because of root rot or damage from construction. Trenching, heavy equipment on the soil and grade changes all cut roots and weaken the anchor. The first visible symptoms often show up only 2–5 years later.",
        },
        { type: "h2", text: "What an arborist checks on site" },
        {
          type: "ol",
          items: [
            "ISA-style visual inspection: lean, canopy, bark, root zone.",
            "Trunk soundness check for internal decay (resistograph or sounding).",
            "Target assessment — what would actually be hit on failure: house, cars, neighbors, power lines.",
            "Recommendation: pruning, cabling, height reduction or full removal.",
          ],
        },
        { type: "h2", text: "When removal is the only option" },
        {
          type: "p",
          text:
            "If the trunk leans more than 15° toward the house, active root rot is confirmed, or a storm took out a big part of the crown, the tree can't be saved. In that case we take it down in sections using rigging — every piece is controlled by rope so nothing hits the roof or fence.",
        },
        {
          type: "quote",
          text:
            "A tree that's \"still standing for now\" can cost more after the next storm than a new roof and the insurance deductible combined. A free arborist estimate is a much cheaper diagnosis.",
        },
      ],
    },
  },

  "kak-obrezat-vetki-nad-kryshey": {
    ru: {
      slug: "kak-obrezat-vetki-nad-kryshey",
      category: "Обрезка",
      date: "Май 2026",
      tags: ["Обрезка", "Крыша", "Риггинг"],
      title: "Как безопасно обрезать ветки над крышей",
      excerpt:
        "Почему обрезка веток над домом — работа для профессионалов и как арбористы делают это без повреждений кровли.",
      blocks: [
        {
          type: "p",
          text:
            "Крона дерева, нависающая над домом — это одновременно живописный вид и серьёзная скрытая угроза. Во время сильного ветра ветки могут тереться о кровлю, повреждать покрытие, забивать желоба листвой или рухнуть на крышу под тяжестью снега и наледи. Однако самостоятельная опиловка деревьев над кровлей входит в топ самых опасных загородных работ.",
        },
        { type: "h2", text: "Главные риски самостоятельной обрезки" },
        {
          type: "ul",
          items: [
            "Удар по кровле: неконтролируемо падающая ветка способна проломить шифер, погнуть металлочерепицу или повредить стропильную систему. Ремонт обойдётся в разы дороже вызова специалистов.",
            "Травмоопасность на высоте: скользкая крыша — худшее место для работы с режущим инструментом. Попытка удержать равновесие и тяжёлую ветку одновременно часто приводит к падению.",
            "Задир коры: неправильный спил «сверху вниз» приводит к тому, что тяжёлая ветка отламывается посередине и сдирает огромный пласт живой коры со ствола. Это сильно ослабляет дерево и открывает путь инфекциям.",
          ],
        },
        { type: "h2", text: "Профессиональный подход" },
        {
          type: "ol",
          items: [
            "Работа без опоры на кровлю. Арборист поднимается в крону на страховочной системе или работает с автовышки. Кровля не испытывает механической нагрузки.",
            "Риггинг (завешивание веток). Каждая крупная ветка фиксируется грузовой верёвкой за верхние крепкие развилки. Напарник внизу плавно спускает фрагмент через тормозное устройство — ни одна ветка не падает свободно.",
            "Трёхсторонний безопасный рез. Предварительный подпил снизу, основной рез сверху и удаление пенька по «воротнику коры» — так дерево быстро затягивает рану без задиров.",
          ],
        },
        { type: "h2", text: "Когда пора срочно вызывать арбориста" },
        {
          type: "ul",
          items: [
            "Толщина ветки превышает 10–15 см, и её падение может повредить дом.",
            "Ветки запутались в проводах ЛЭП или во вводе в дом.",
            "У дерева видны признаки сухостоя, трещины в стволе или сильный наклон в сторону строения.",
          ],
        },
        {
          type: "quote",
          text:
            "Не рискуйте своим здоровьем и целостностью крыши. Доверьте уход за крупномерами арбористам с профильными навыками и страховочным снаряжением.",
        },
      ],
    },
    en: {
      slug: "kak-obrezat-vetki-nad-kryshey",
      category: "Pruning",
      date: "May 2026",
      tags: ["Pruning", "Roof", "Rigging"],
      title: "How to prune branches over your roof safely",
      excerpt:
        "Why pruning limbs over a house is a job for pros — and how arborists get it done without damaging the roof.",
      blocks: [
        {
          type: "p",
          text:
            "A canopy hanging over the house looks great, but it's also a hidden risk. In strong wind branches abrade the roof, gutters clog with leaves, and heavy limbs can drop after a storm. DIY pruning over a roofline is one of the most dangerous jobs you can do around a home.",
        },
        { type: "h2", text: "Main risks of DIY pruning" },
        {
          type: "ul",
          items: [
            "Roof strike: an uncontrolled falling branch can crack shingles, dent metal roofing or damage rafters. A roof repair costs many times more than a professional visit.",
            "Height injury: a slippery roof is the worst place to hold a saw and a heavy limb at the same time. Balance is lost quickly.",
            "Bark stripping: cutting from the top down makes the limb snap mid-way and tear a huge strip of live bark off the trunk. That weakens the tree and lets disease in.",
          ],
        },
        { type: "h2", text: "The professional approach" },
        {
          type: "ol",
          items: [
            "No load on the roof. The climber ascends into the canopy on a rope system or works from a bucket truck. The roof carries none of the weight.",
            "Rigging. Every large limb is tied off to strong upper unions before it's cut. A groundie lowers each piece through a friction device — nothing falls freely.",
            "Three-cut technique. Undercut first, then the top cut, then a clean finish at the branch collar so the tree can seal the wound without bark tearing.",
          ],
        },
        { type: "h2", text: "When to call an arborist right away" },
        {
          type: "ul",
          items: [
            "Branches are 4–6\" thick and could damage the house on impact.",
            "Limbs are tangled in power lines or the service drop.",
            "The tree shows dead wood, cracks in the trunk or a hard lean toward the building.",
          ],
        },
        {
          type: "quote",
          text:
            "Don't gamble your health and your roof. Leave big trees to arborists with the right training and rated safety gear.",
        },
      ],
    },
  },

  "pochemu-chistka-palm-vazhna": {
    ru: {
      slug: "pochemu-chistka-palm-vazhna",
      category: "Уход за пальмами",
      date: "Апр 2026",
      tags: ["Пальмы", "Пожарная безопасность", "Калифорния"],
      title: "Почему чистка пальм важна для домов Калифорнии",
      excerpt:
        "Пожарная безопасность, вредители и здоровье дерева — пять причин чистить пальмы каждый сезон.",
      blocks: [
        {
          type: "p",
          text:
            "Пальмы — символ калифорнийских пейзажей, но за экзотической красотой скрывается серьёзная зона ответственности. Регулярная профессиональная чистка пальм (удаление сухих листьев, соцветий и плодовых гроздей) — это не только эстетика, а вопрос безопасности, здоровья деревьев и защиты дома.",
        },
        { type: "h2", text: "5 главных причин регулярно чистить пальмы" },
        { type: "h2", text: "1. Пожарная безопасность" },
        {
          type: "p",
          text:
            "Сухие пальмовые «юбки» — легковоспламеняющийся материал. В жарком калифорнийском климате и при суховеях искра от барбекю, фейерверка или окурок могут мгновенно превратить пальму в факел. Чистая крона значительно снижает риск возгорания рядом с жильём.",
        },
        { type: "h2", text: "2. Защита от вредителей и грызунов" },
        {
          type: "p",
          text:
            "Плотные слои сухой листвы создают идеальный тёплый микроклимат для крыс, мышей, летучих мышей и опасных насекомых, включая термитов. Освободив ствол от мусора, вы лишаете вредителей убежища и не даёте им перебраться в подкровельные пространства.",
        },
        { type: "h2", text: "3. Безопасность людей и имущества" },
        {
          type: "p",
          text:
            "Старые листья и тяжёлые грозди с финиками могут сорваться под собственным весом или при порыве ветра. Падение массивной «юбки» с высоты повреждает автомобиль, кровлю, забор или травмирует прохожих.",
        },
        { type: "h2", text: "4. Здоровье и эстетика дерева" },
        {
          type: "p",
          text:
            "Удаление отмерших вай перенаправляет силы растения на рост новых зелёных побегов и укрепление ствола. Ухоженная пальма выглядит аккуратно и подчёркивает статус придомовой территории.",
        },
        { type: "h2", text: "5. Доверьте уход профессионалам" },
        {
          type: "p",
          text:
            "Самостоятельная обрезка высоких пальм сопряжена с риском падения, а работа возле ЛЭП смертельно опасна. Чрезмерное срезание зелёных листьев («стрижка под ананас» или «под ноль») может серьёзно навредить дереву. Сертифицированные арбористы знают биологию Вашингтонии и Канарского финика, используют профессиональное снаряжение и работают по нормам безопасности.",
        },
        {
          type: "quote",
          text:
            "Позаботьтесь о безопасности своего дома и долговечности сада — запланируйте сезонную чистку пальм уже сегодня.",
        },
      ],
    },
    en: {
      slug: "pochemu-chistka-palm-vazhna",
      category: "Palm care",
      date: "Apr 2026",
      tags: ["Palms", "Fire safety", "California"],
      title: "Why palm cleaning matters for California homes",
      excerpt:
        "Fire safety, pests and tree health — five reasons to clean your palms every season.",
      blocks: [
        {
          type: "p",
          text:
            "Palms are the signature of California landscapes, but that exotic beauty comes with real responsibility. Regular professional palm cleaning — removing dead fronds, flower stalks and fruit clusters — isn't just aesthetics. It's about safety, tree health and protecting your home.",
        },
        { type: "h2", text: "5 reasons to clean palms on a schedule" },
        { type: "h2", text: "1. Fire safety" },
        {
          type: "p",
          text:
            "A dry palm \"skirt\" of dead fronds is highly flammable. In California heat and dry winds a spark from a BBQ, fireworks or a cigarette can turn a palm into a torch in seconds. A clean canopy significantly reduces fire risk near the house.",
        },
        { type: "h2", text: "2. Protection from pests and rodents" },
        {
          type: "p",
          text:
            "Thick layers of dead fronds create a perfect warm micro-climate for rats, mice, bats and dangerous insects including termites. Clearing the trunk denies them shelter and stops them from moving into attic and eave spaces.",
        },
        { type: "h2", text: "3. Safety for people and property" },
        {
          type: "p",
          text:
            "Old fronds and heavy date clusters can drop under their own weight or in a gust. A large skirt falling from height dents cars, damages roofs and fences, or injures people walking underneath.",
        },
        { type: "h2", text: "4. Tree health and curb appeal" },
        {
          type: "p",
          text:
            "Removing dead fronds redirects energy into new green growth and a stronger trunk. A well-maintained palm looks sharp and lifts the whole property.",
        },
        { type: "h2", text: "5. Leave it to professionals" },
        {
          type: "p",
          text:
            "DIY on tall palms carries a real fall risk, and working near power lines is deadly. Over-pruning green fronds (\"pineapple cut\" or \"hurricane cut\") can seriously harm the tree. Certified arborists know the biology of Washingtonia and Canary Island date palms, use proper gear and follow safety code.",
        },
        {
          type: "quote",
          text:
            "Protect your home and the longevity of your garden — book a seasonal palm cleaning today.",
        },
      ],
    },
  },
};

export function getArticle(slug: string, lang: Lang): Article | undefined {
  return ARTICLES[slug]?.[lang];
}

export function listArticles(lang: Lang): Article[] {
  return Object.values(ARTICLES).map((byLang) => byLang[lang]);
}
