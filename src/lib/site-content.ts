import { supabase } from "@/integrations/supabase/client";

export type SocialLink = { platform: string; url: string; label?: string };
export type ServiceItem = {
  ru: { title: string; body: string; points: string[] };
  en: { title: string; body: string; points: string[] };
};
export type HeroTexts = {
  ru: { titleA: string; titleB: string; subtitle: string };
  en: { titleA: string; titleB: string; subtitle: string };
};
export type AboutTexts = {
  ru: { body: string; values: string[] };
  en: { body: string; values: string[] };
};

export type SeoLang = { title: string; description: string };
export type SeoContent = { ru: SeoLang; en: SeoLang };

export type SiteContentMap = {
  hero_image?: { url: string };
  founder_image?: { url: string };
  hero_texts?: HeroTexts;
  about_texts?: AboutTexts;
  services?: ServiceItem[];
  contacts_socials?: SocialLink[];
  seo?: SeoContent;
};

export async function fetchSiteContent(): Promise<SiteContentMap> {
  const { data, error } = await supabase.from("site_content").select("key, value");
  if (error) throw error;
  const map: SiteContentMap = {};
  for (const row of data ?? []) {
    (map as Record<string, unknown>)[row.key] = row.value as unknown;
  }
  return map;
}

export type PortfolioItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  cover_url: string | null;
  video_url: string | null;
  sort_order: number;
};

export async function fetchPortfolio(): Promise<PortfolioItem[]> {
  const { data, error } = await supabase
    .from("portfolio_items")
    .select("id, title, description, category, cover_url, video_url, sort_order")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function uploadSiteImage(file: File, prefix: string): Promise<string> {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${prefix}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error: upErr } = await supabase.storage
    .from("site-images")
    .upload(path, file, { contentType: file.type, upsert: false });
  if (upErr) throw upErr;
  // Signed URL for ~10 years
  const { data, error } = await supabase.storage
    .from("site-images")
    .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
  if (error || !data) throw error ?? new Error("Signed URL error");
  return data.signedUrl;
}

/* ---------- Video embed helpers ---------- */

export type VideoEmbed = { type: "youtube" | "instagram" | "tiktok" | "unknown"; embedUrl: string; originalUrl: string };

export function parseVideoUrl(url: string): VideoEmbed {
  const u = url.trim();
  // YouTube
  const yt = u.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
  if (yt) {
    return { type: "youtube", embedUrl: `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0`, originalUrl: u };
  }
  // Instagram
  const ig = u.match(/instagram\.com\/(?:reel|p|tv)\/([A-Za-z0-9_-]+)/);
  if (ig) {
    return { type: "instagram", embedUrl: `https://www.instagram.com/p/${ig[1]}/embed/`, originalUrl: u };
  }
  // TikTok - use full URL in official embed
  if (/tiktok\.com/.test(u)) {
    const m = u.match(/tiktok\.com\/@[^/]+\/video\/(\d+)/) || u.match(/tiktok\.com\/v\/(\d+)/);
    if (m) return { type: "tiktok", embedUrl: `https://www.tiktok.com/embed/v2/${m[1]}`, originalUrl: u };
  }
  return { type: "unknown", embedUrl: u, originalUrl: u };
}
