import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type SeoLang = { title: string; description: string };
export type SeoContent = { ru: SeoLang; en: SeoLang };

export const SEO_DEFAULTS: SeoContent = {
  en: {
    title: "TREE SERVICE — Tree Removal & Arborist in Sacramento, CA",
    description:
      "Licensed & insured tree removal, pruning, palm cleaning and emergency storm cleanup in Sacramento, CA. Free same-day estimates. Call 916-890-8080.",
  },
  ru: {
    title: "CRYSTAL CLOUD LLC — Спил и обрезка деревьев в Sacramento",
    description:
      "Безопасное удаление деревьев любой сложности, чистка пальм, обрезка веток и услуги арбориста в Sacramento, CA. Бесплатная оценка. 📞 916-890-8080.",
  },
};

function trim(s: string, n: number) {
  return s.length > n ? s.slice(0, n) : s;
}

export const getSeo = createServerFn({ method: "GET" }).handler(async (): Promise<SeoContent> => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return SEO_DEFAULTS;

  const client = createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });

  try {
    const { data } = await client.from("site_content").select("value").eq("key", "seo").maybeSingle();
    const val = (data?.value ?? {}) as Partial<SeoContent>;
    const merged: SeoContent = {
      en: {
        title: trim(val.en?.title?.trim() || SEO_DEFAULTS.en.title, 60),
        description: trim(val.en?.description?.trim() || SEO_DEFAULTS.en.description, 160),
      },
      ru: {
        title: trim(val.ru?.title?.trim() || SEO_DEFAULTS.ru.title, 60),
        description: trim(val.ru?.description?.trim() || SEO_DEFAULTS.ru.description, 160),
      },
    };
    return merged;
  } catch {
    return SEO_DEFAULTS;
  }
});
