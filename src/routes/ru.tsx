import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/Landing";
import { getSeo, SEO_DEFAULTS } from "@/lib/seo.functions";

export const Route = createFileRoute("/ru")({
  component: () => <Landing lang="ru" />,
  loader: async () => {
    try {
      return { seo: await getSeo() };
    } catch {
      return { seo: SEO_DEFAULTS };
    }
  },
  head: ({ loaderData }) => {
    const s = loaderData?.seo?.ru ?? SEO_DEFAULTS.ru;
    return {
      meta: [
        { title: s.title },
        { name: "description", content: s.description },
        { property: "og:title", content: s.title },
        { property: "og:description", content: s.description },
        { property: "og:url", content: "https://crystal-cloud-shine.lovable.app/ru" },
        { property: "og:locale", content: "ru_RU" },
        { property: "og:locale:alternate", content: "en_US" },
        { name: "language", content: "Russian" },
        { name: "twitter:title", content: s.title },
        { name: "twitter:description", content: s.description },
      ],
      links: [
        { rel: "canonical", href: "https://crystal-cloud-shine.lovable.app/ru" },
        { rel: "alternate", hrefLang: "en", href: "https://crystal-cloud-shine.lovable.app/" },
        { rel: "alternate", hrefLang: "ru", href: "https://crystal-cloud-shine.lovable.app/ru" },
        { rel: "alternate", hrefLang: "x-default", href: "https://crystal-cloud-shine.lovable.app/" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Crystal Cloud LLC",
            image: "https://crystal-cloud-shine.lovable.app/og-image.jpg",
            telephone: "+1-916-890-8080",
            url: "https://crystal-cloud-shine.lovable.app/ru",
            priceRange: "$$",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Sacramento",
              addressRegion: "CA",
              addressCountry: "US",
            },
            areaServed: "Sacramento, CA",
          }),
        },
      ],
    };
  },
});
