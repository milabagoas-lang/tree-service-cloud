import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Calendar, Tag } from "lucide-react";
import { getArticle, listArticles, type Article, type Block } from "@/i18n/articles";
import type { Lang } from "@/i18n/dict";
import { getArticleBySlug, type DbArticle } from "@/lib/articles.functions";

export const Route = createFileRoute("/blog/$slug")({
  validateSearch: (search: Record<string, unknown>) => {
    const l = search.lang;
    const lang: Lang = l === "ru" ? "ru" : "en";
    return { lang };
  },
  loaderDeps: ({ search: { lang } }) => ({ lang }),
  loader: async ({ params, deps }) => {
    const db = await getArticleBySlug({ data: { slug: params.slug, lang: deps.lang } }).catch(
      () => null,
    );
    const article: Article | undefined = db
      ? dbToArticle(db)
      : getArticle(params.slug, deps.lang);
    if (!article) throw notFound();
    return { article, lang: deps.lang };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article not found — TREE SERVICE" }, { name: "robots", content: "noindex" }] };
    }
    const { article, lang } = loaderData;
    const url = `https://treeservicebiz.com/blog/${article.slug}${lang === "ru" ? "?lang=ru" : ""}`;
    return {
      meta: [
        { title: `${article.title} — TREE SERVICE` },
        { name: "description", content: article.excerpt },
        { property: "og:title", content: article.title },
        { property: "og:description", content: article.excerpt },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: article.title },
        { name: "twitter:description", content: article.excerpt },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: ArticlePage,
  errorComponent: ({ error }) => (
    <div className="container-x section-y">
      <p className="text-muted-foreground">{error.message}</p>
    </div>
  ),
  notFoundComponent: () => <ArticleNotFound />,
});

function dbToArticle(db: DbArticle): Article {
  return {
    slug: db.slug,
    category: db.category,
    date: db.date_label,
    tags: db.tags ?? [],
    title: db.title,
    excerpt: db.excerpt,
    blocks: parseContent(db.content),
  };
}

/**
 * Lightweight markdown-ish parser. Blocks are separated by blank lines.
 * Supported per block:
 *   "## Heading"        → h2
 *   "> quote text"      → quote (may span multiple lines)
 *   "- item" lines      → ul
 *   "1. item" lines     → ol
 *   anything else       → p
 */
function parseContent(raw: string): Block[] {
  if (!raw?.trim()) return [];
  const chunks = raw.replace(/\r\n/g, "\n").split(/\n\s*\n/);
  const blocks: Block[] = [];
  for (const chunk of chunks) {
    const lines = chunk.split("\n").map((l) => l.trimEnd()).filter((l) => l.length > 0);
    if (lines.length === 0) continue;

    if (lines[0].startsWith("## ")) {
      blocks.push({ type: "h2", text: lines[0].slice(3).trim() });
      continue;
    }
    if (lines.every((l) => l.startsWith("> "))) {
      blocks.push({ type: "quote", text: lines.map((l) => l.slice(2)).join(" ").trim() });
      continue;
    }
    if (lines.every((l) => /^-\s+/.test(l))) {
      blocks.push({ type: "ul", items: lines.map((l) => l.replace(/^-\s+/, "").trim()) });
      continue;
    }
    if (lines.every((l) => /^\d+\.\s+/.test(l))) {
      blocks.push({ type: "ol", items: lines.map((l) => l.replace(/^\d+\.\s+/, "").trim()) });
      continue;
    }
    blocks.push({ type: "p", text: lines.join(" ") });
  }
  return blocks;
}

function ArticleNotFound() {
  const { lang } = Route.useSearch();
  const backTo = lang === "ru" ? "/ru" : "/";
  return (
    <div className="container-x section-y">
      <h1 className="font-display text-3xl font-semibold">
        {lang === "ru" ? "Статья не найдена" : "Article not found"}
      </h1>
      <Link to={backTo} className="mt-6 inline-flex items-center gap-2 text-primary hover:underline">
        <ArrowLeft className="h-4 w-4" /> {lang === "ru" ? "На главную" : "Back home"}
      </Link>
    </div>
  );
}

function ArticlePage() {
  const { article, lang } = Route.useLoaderData();
  const homeTo = lang === "ru" ? "/ru" : "/";
  const backLabel = lang === "ru" ? "Все статьи" : "All articles";
  const relatedLabel = lang === "ru" ? "Другие статьи" : "More articles";
  const related = listArticles(lang).filter((a) => a.slug !== article.slug);

  return (
    <main className="relative min-h-dvh bg-background text-foreground">
      <div className="container-x pt-28 pb-8">
        <Link
          to={homeTo}
          hash="blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> {backLabel}
        </Link>
      </div>

      <article className="container-x pb-20">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="rounded-full border border-border bg-secondary/40 px-2.5 py-1 font-mono uppercase tracking-widest text-muted-foreground">
              {article.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" /> {article.date}
            </span>
          </div>

          <h1 className="mt-6 font-display text-3xl font-semibold leading-tight md:text-5xl">
            {article.title}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">{article.excerpt}</p>

          {article.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Tag className="h-3.5 w-3.5 text-muted-foreground" />
              {article.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full border border-border/60 px-2.5 py-0.5 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-12 space-y-6 text-base leading-relaxed text-foreground/90">
            {article.blocks.map((block: Block, i: number) => (
              <BlockView key={i} block={block} />
            ))}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-border/60 section-y">
          <div className="container-x">
            <h2 className="font-display text-2xl font-semibold md:text-3xl">{relatedLabel}</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  to="/blog/$slug"
                  params={{ slug: a.slug }}
                  search={{ lang }}
                  className="card-surface card-hover group flex flex-col p-6"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="rounded-full border border-border bg-secondary/40 px-2.5 py-1 font-mono uppercase tracking-widest text-muted-foreground">
                      {a.category}
                    </span>
                    <span className="text-muted-foreground">{a.date}</span>
                  </div>
                  <h3 className="mt-6 font-display text-lg font-semibold leading-snug">{a.title}</h3>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm text-primary">
                    {lang === "ru" ? "Читать статью" : "Read article"}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return <h2 className="mt-10 font-display text-2xl font-semibold text-foreground md:text-3xl">{block.text}</h2>;
    case "p":
      return <p>{block.text}</p>;
    case "ul":
      return (
        <ul className="list-disc space-y-2 pl-6 marker:text-primary">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal space-y-2 pl-6 marker:text-primary">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote className="border-l-2 border-primary bg-secondary/20 px-5 py-4 italic text-foreground/90">
          {block.text}
        </blockquote>
      );
  }
}

// Silence unused-import warning when Lang is only used indirectly.
export type _Lang = Lang;
