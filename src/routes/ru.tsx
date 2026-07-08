import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/Landing";
import { ru } from "@/i18n/dict";

export const Route = createFileRoute("/ru")({
  component: () => <Landing lang="ru" />,
  head: () => ({
    meta: [
      { title: ru.meta.title },
      { name: "description", content: ru.meta.description },
      { property: "og:title", content: ru.meta.ogTitle },
      { property: "og:description", content: ru.meta.ogDescription },
      { property: "og:url", content: "/ru" },
      { property: "og:locale", content: "ru_RU" },
      { property: "og:locale:alternate", content: "en_US" },
      { name: "language", content: "Russian" },
    ],
    links: [
      { rel: "canonical", href: "/ru" },
      { rel: "alternate", hrefLang: "en", href: "/" },
      { rel: "alternate", hrefLang: "ru", href: "/ru" },
      { rel: "alternate", hrefLang: "x-default", href: "/" },
    ],
  }),
});
