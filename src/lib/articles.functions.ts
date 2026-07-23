import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type DbArticle = {
  slug: string;
  lang: "ru" | "en";
  title: string;
  excerpt: string;
  category: string;
  date_label: string;
  tags: string[];
  content: string;
};

function serverClient() {
  const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
  return createClient<Database>(process.env.SUPABASE_URL!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const getArticleBySlug = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string; lang: "ru" | "en" }) => data)
  .handler(async ({ data }): Promise<DbArticle | null> => {
    const supabase = serverClient();
    const { data: row, error } = await supabase
      .from("articles")
      .select("slug, lang, title, excerpt, category, date_label, tags, content")
      .eq("slug", data.slug)
      .eq("lang", data.lang)
      .eq("published", true)
      .maybeSingle();
    if (error) return null;
    return (row as DbArticle | null) ?? null;
  });
