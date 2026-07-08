import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/Landing";
import { en } from "@/i18n/dict";

export const Route = createFileRoute("/")({
  component: () => <Landing lang="en" />,
  head: () => ({
    meta: [
      { title: en.meta.title },
      { name: "description", content: en.meta.description },
      { property: "og:title", content: en.meta.ogTitle },
      { property: "og:description", content: en.meta.ogDescription },
      { property: "og:url", content: "/" },
      { property: "og:locale", content: "en_US" },
      { property: "og:locale:alternate", content: "ru_RU" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "alternate", hrefLang: "en", href: "/" },
      { rel: "alternate", hrefLang: "ru", href: "/ru" },
      { rel: "alternate", hrefLang: "x-default", href: "/" },
    ],
  }),
});
