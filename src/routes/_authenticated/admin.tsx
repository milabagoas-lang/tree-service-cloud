import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  fetchSiteContent,
  fetchPortfolio,
  uploadSiteImage,
  type SiteContentMap,
  type PortfolioItem,
  type SocialLink,
  type ServiceItem,
  type SeoContent,
} from "@/lib/site-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Loader2, LogOut, Plus, Trash2, Pencil, Upload, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminPage,
  head: () => ({ meta: [{ title: "Админ-панель · TREE SERVICE" }] }),
});

function AdminPage() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      const uid = u.user?.id;
      setEmail(u.user?.email ?? "");
      if (!uid) return;
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", uid)
        .eq("role", "admin")
        .maybeSingle();
      setIsAdmin(!!data);
    })();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  if (isAdmin === null) {
    return (
      <div className="grid min-h-dvh place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="grid min-h-dvh place-items-center bg-background px-4">
        <Card className="max-w-md p-8 text-center">
          <h1 className="font-display text-2xl font-semibold">Доступ запрещён</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Аккаунт <span className="text-foreground">{email}</span> не имеет прав администратора.
            Разрешён только <span className="text-foreground">ordinaryarborist@gmail.com</span>.
          </p>
          <Button onClick={signOut} variant="outline" className="mt-6">
            Выйти
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-background">
      <Toaster position="top-right" richColors />
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
        <div className="container-x flex h-16 items-center justify-between">
          <div>
            <div className="font-display text-lg font-semibold">Админ-панель</div>
            <div className="text-xs text-muted-foreground">{email}</div>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/">
                <ExternalLink className="mr-2 h-4 w-4" /> Открыть сайт
              </Link>
            </Button>
            <Button onClick={signOut} variant="ghost" size="sm">
              <LogOut className="mr-2 h-4 w-4" /> Выйти
            </Button>
          </div>
        </div>
      </header>

      <main className="container-x py-8">
        <Tabs defaultValue="hero" className="w-full">
          <TabsList className="mb-6 flex-wrap">
            <TabsTrigger value="hero">Главная</TabsTrigger>
            <TabsTrigger value="services">Услуги</TabsTrigger>
            <TabsTrigger value="about">Про меня</TabsTrigger>
            <TabsTrigger value="contacts">Контакты</TabsTrigger>
            <TabsTrigger value="portfolio">Портфолио</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>
          <TabsContent value="hero"><HeroEditor /></TabsContent>
          <TabsContent value="services"><ServicesEditor /></TabsContent>
          <TabsContent value="about"><AboutEditor /></TabsContent>
          <TabsContent value="contacts"><ContactsEditor /></TabsContent>
          <TabsContent value="portfolio"><PortfolioEditor /></TabsContent>
          <TabsContent value="seo"><SeoEditor /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

/* ---------------- Site content helpers ---------------- */
function useContent() {
  return useQuery({ queryKey: ["site_content"], queryFn: fetchSiteContent });
}
function useSaveContent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { key: keyof SiteContentMap; value: unknown }) => {
      const { error } = await supabase
        .from("site_content")
        .upsert({ key: input.key as string, value: input.value as never });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["site_content"] });
      toast.success("Сохранено");
    },
    onError: (e: unknown) => toast.error((e as Error).message ?? "Ошибка"),
  });
}

/* ---------------- HERO ---------------- */
function HeroEditor() {
  const { data, isLoading } = useContent();
  const save = useSaveContent();
  const [uploading, setUploading] = useState(false);
  const [texts, setTexts] = useState({
    ru: { titleA: "", titleB: "", subtitle: "" },
    en: { titleA: "", titleB: "", subtitle: "" },
  });
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    if (!data) return;
    if (data.hero_texts) setTexts(data.hero_texts);
    if (data.hero_image?.url) setImageUrl(data.hero_image.url);
  }, [data]);

  if (isLoading) return <Skeleton />;

  const onUpload = async (file: File) => {
    try {
      setUploading(true);
      const url = await uploadSiteImage(file, "hero");
      setImageUrl(url);
      await save.mutateAsync({ key: "hero_image", value: { url } });
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <h3 className="mb-4 font-display text-lg font-semibold">Фоновое фото (Hero)</h3>
        {imageUrl && (
          <img src={imageUrl} alt="Hero" className="mb-4 aspect-video w-full rounded-lg border border-border object-cover" />
        )}
        <UploadInput onFile={onUpload} loading={uploading} />
        <p className="mt-2 text-xs text-muted-foreground">Оставьте пустым — будет использовано фото по умолчанию.</p>
      </Card>

      <Card className="p-6">
        <h3 className="mb-4 font-display text-lg font-semibold">Тексты (необязательно — переопределяют дефолт)</h3>
        {(["ru", "en"] as const).map((lng) => (
          <div key={lng} className="mb-6">
            <div className="mb-2 text-xs font-semibold uppercase text-muted-foreground">{lng.toUpperCase()}</div>
            <div className="grid gap-2">
              <Input
                placeholder="Заголовок (часть 1)"
                value={texts[lng].titleA}
                onChange={(e) => setTexts((t) => ({ ...t, [lng]: { ...t[lng], titleA: e.target.value } }))}
              />
              <Input
                placeholder="Заголовок (часть 2, акцент)"
                value={texts[lng].titleB}
                onChange={(e) => setTexts((t) => ({ ...t, [lng]: { ...t[lng], titleB: e.target.value } }))}
              />
              <Textarea
                placeholder="Подзаголовок"
                value={texts[lng].subtitle}
                onChange={(e) => setTexts((t) => ({ ...t, [lng]: { ...t[lng], subtitle: e.target.value } }))}
              />
            </div>
          </div>
        ))}
        <Button
          onClick={() => save.mutate({ key: "hero_texts", value: texts })}
          disabled={save.isPending}
        >
          {save.isPending ? "Сохранение…" : "Сохранить тексты"}
        </Button>
      </Card>
    </div>
  );
}

/* ---------------- ABOUT ---------------- */
function AboutEditor() {
  const { data, isLoading } = useContent();
  const save = useSaveContent();
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [texts, setTexts] = useState({
    ru: { body: "", values: [] as string[] },
    en: { body: "", values: [] as string[] },
  });

  useEffect(() => {
    if (!data) return;
    if (data.founder_image?.url) setImageUrl(data.founder_image.url);
    if (data.about_texts) setTexts(data.about_texts);
  }, [data]);

  if (isLoading) return <Skeleton />;

  const onUpload = async (file: File) => {
    try {
      setUploading(true);
      const url = await uploadSiteImage(file, "founder");
      setImageUrl(url);
      await save.mutateAsync({ key: "founder_image", value: { url } });
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
      <Card className="p-6">
        <h3 className="mb-4 font-display text-lg font-semibold">Ваше фото</h3>
        {imageUrl && (
          <img src={imageUrl} alt="Founder" className="mb-4 aspect-[4/5] w-full rounded-lg border border-border object-cover" />
        )}
        <UploadInput onFile={onUpload} loading={uploading} />
      </Card>

      <Card className="p-6">
        <h3 className="mb-4 font-display text-lg font-semibold">Текст «Про меня»</h3>
        {(["ru", "en"] as const).map((lng) => (
          <div key={lng} className="mb-6">
            <div className="mb-2 text-xs font-semibold uppercase text-muted-foreground">{lng.toUpperCase()}</div>
            <Textarea
              rows={5}
              placeholder="Основной текст"
              value={texts[lng].body}
              onChange={(e) => setTexts((t) => ({ ...t, [lng]: { ...t[lng], body: e.target.value } }))}
            />
            <Label className="mt-3 block text-xs">Ценности (по одной в строке)</Label>
            <Textarea
              rows={4}
              value={texts[lng].values.join("\n")}
              onChange={(e) =>
                setTexts((t) => ({
                  ...t,
                  [lng]: { ...t[lng], values: e.target.value.split("\n").filter(Boolean) },
                }))
              }
            />
          </div>
        ))}
        <Button onClick={() => save.mutate({ key: "about_texts", value: texts })} disabled={save.isPending}>
          {save.isPending ? "Сохранение…" : "Сохранить"}
        </Button>
      </Card>
    </div>
  );
}

/* ---------------- SERVICES ---------------- */
function ServicesEditor() {
  const { data, isLoading } = useContent();
  const save = useSaveContent();
  const [items, setItems] = useState<ServiceItem[]>([]);

  useEffect(() => {
    if (data?.services) setItems(data.services);
  }, [data]);

  if (isLoading) return <Skeleton />;

  const empty = (): ServiceItem => ({
    ru: { title: "", body: "", points: [] },
    en: { title: "", body: "", points: [] },
  });

  const updateItem = (i: number, next: ServiceItem) =>
    setItems((arr) => arr.map((it, idx) => (idx === i ? next : it)));

  return (
    <div className="space-y-4">
      {items.map((it, i) => (
        <Card key={i} className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="font-display font-semibold">Услуга #{i + 1}</div>
            <Button size="sm" variant="ghost" onClick={() => setItems((a) => a.filter((_, x) => x !== i))}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {(["ru", "en"] as const).map((lng) => (
              <div key={lng} className="space-y-2 rounded-lg border border-border p-4">
                <div className="text-xs font-semibold uppercase text-muted-foreground">{lng}</div>
                <Input
                  placeholder="Название"
                  value={it[lng].title}
                  onChange={(e) => updateItem(i, { ...it, [lng]: { ...it[lng], title: e.target.value } })}
                />
                <Textarea
                  placeholder="Описание"
                  value={it[lng].body}
                  onChange={(e) => updateItem(i, { ...it, [lng]: { ...it[lng], body: e.target.value } })}
                />
                <Label className="text-xs">Особенности (по одной в строке)</Label>
                <Textarea
                  rows={3}
                  value={it[lng].points.join("\n")}
                  onChange={(e) =>
                    updateItem(i, {
                      ...it,
                      [lng]: { ...it[lng], points: e.target.value.split("\n").filter(Boolean) },
                    })
                  }
                />
              </div>
            ))}
          </div>
        </Card>
      ))}
      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setItems((a) => [...a, empty()])}>
          <Plus className="mr-2 h-4 w-4" /> Добавить услугу
        </Button>
        <Button onClick={() => save.mutate({ key: "services", value: items })} disabled={save.isPending}>
          {save.isPending ? "Сохранение…" : "Сохранить всё"}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Если список пуст — на сайте будут показаны услуги по умолчанию.
      </p>
    </div>
  );
}

/* ---------------- CONTACTS ---------------- */
const SOCIAL_PLATFORMS = ["Telegram", "Instagram", "Facebook", "TikTok", "YouTube", "WhatsApp", "Другое"];

function ContactsEditor() {
  const { data, isLoading } = useContent();
  const save = useSaveContent();
  const [socials, setSocials] = useState<SocialLink[]>([]);

  useEffect(() => {
    if (data?.contacts_socials) setSocials(data.contacts_socials);
  }, [data]);

  if (isLoading) return <Skeleton />;

  return (
    <Card className="p-6">
      <h3 className="mb-4 font-display text-lg font-semibold">Ссылки на соцсети</h3>
      <div className="space-y-3">
        {socials.map((s, i) => (
          <div key={i} className="grid gap-2 md:grid-cols-[180px_1fr_1fr_auto]">
            <select
              value={s.platform}
              onChange={(e) =>
                setSocials((a) => a.map((x, idx) => (idx === i ? { ...x, platform: e.target.value } : x)))
              }
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            >
              {SOCIAL_PLATFORMS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <Input
              placeholder="https://…"
              value={s.url}
              onChange={(e) =>
                setSocials((a) => a.map((x, idx) => (idx === i ? { ...x, url: e.target.value } : x)))
              }
            />
            <Input
              placeholder="Подпись (необязательно)"
              value={s.label ?? ""}
              onChange={(e) =>
                setSocials((a) => a.map((x, idx) => (idx === i ? { ...x, label: e.target.value } : x)))
              }
            />
            <Button variant="ghost" size="icon" onClick={() => setSocials((a) => a.filter((_, idx) => idx !== i))}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-3">
        <Button variant="outline" onClick={() => setSocials((a) => [...a, { platform: "Instagram", url: "", label: "" }])}>
          <Plus className="mr-2 h-4 w-4" /> Добавить
        </Button>
        <Button onClick={() => save.mutate({ key: "contacts_socials", value: socials })} disabled={save.isPending}>
          {save.isPending ? "Сохранение…" : "Сохранить"}
        </Button>
      </div>
    </Card>
  );
}

/* ---------------- PORTFOLIO ---------------- */
const CATEGORIES = ["Спил", "Обрезка", "Пальмы", "Уход", "Другое"];

function PortfolioEditor() {
  const qc = useQueryClient();
  const { data: items = [], isLoading } = useQuery({ queryKey: ["portfolio"], queryFn: fetchPortfolio });
  const [editing, setEditing] = useState<Partial<PortfolioItem> | null>(null);

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("portfolio_items").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["portfolio"] });
      toast.success("Удалено");
    },
    onError: (e: unknown) => toast.error((e as Error).message),
  });

  if (isLoading) return <Skeleton />;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setEditing({ title: "", description: "", category: CATEGORIES[0], sort_order: 0 })}>
          <Plus className="mr-2 h-4 w-4" /> Добавить работу
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <Card key={it.id} className="overflow-hidden p-0">
            {it.cover_url ? (
              <img src={it.cover_url} alt={it.title} className="aspect-video w-full object-cover" />
            ) : (
              <div className="grid aspect-video w-full place-items-center bg-secondary text-xs text-muted-foreground">
                Без обложки
              </div>
            )}
            <div className="space-y-2 p-4">
              <div className="text-xs text-primary">{it.category}</div>
              <div className="font-display font-semibold">{it.title || "—"}</div>
              <div className="line-clamp-2 text-xs text-muted-foreground">{it.description}</div>
              <div className="truncate text-[11px] text-muted-foreground">{it.video_url}</div>
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" onClick={() => setEditing(it)}>
                  <Pencil className="mr-1 h-3 w-3" /> Изменить
                </Button>
                <Button size="sm" variant="ghost" onClick={() => confirm("Удалить?") && del.mutate(it.id)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
        {items.length === 0 && (
          <div className="col-span-full py-12 text-center text-sm text-muted-foreground">
            Работ пока нет. Нажмите «Добавить работу».
          </div>
        )}
      </div>

      {editing && (
        <PortfolioForm
          item={editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            qc.invalidateQueries({ queryKey: ["portfolio"] });
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

function PortfolioForm({
  item,
  onClose,
  onSaved,
}: {
  item: Partial<PortfolioItem>;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<Partial<PortfolioItem>>(item);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const onUpload = async (file: File) => {
    try {
      setUploading(true);
      const url = await uploadSiteImage(file, "portfolio");
      setForm((f) => ({ ...f, cover_url: url }));
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    setSaving(true);
    try {
      const payload = {
        title: form.title ?? "",
        description: form.description ?? "",
        category: form.category ?? "",
        cover_url: form.cover_url ?? null,
        video_url: form.video_url ?? null,
        sort_order: form.sort_order ?? 0,
      };
      const { error } = form.id
        ? await supabase.from("portfolio_items").update(payload).eq("id", form.id)
        : await supabase.from("portfolio_items").insert(payload);
      if (error) throw error;
      toast.success("Сохранено");
      onSaved();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{form.id ? "Изменить работу" : "Новая работа"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label>Название</Label>
            <Input value={form.title ?? ""} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div>
            <Label>Описание</Label>
            <Textarea value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Категория</Label>
              <select
                value={form.category ?? CATEGORIES[0]}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>Порядок сортировки</Label>
              <Input
                type="number"
                value={form.sort_order ?? 0}
                onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
              />
            </div>
          </div>
          <div>
            <Label>Ссылка на видео (YouTube / Instagram / TikTok)</Label>
            <Input
              placeholder="https://youtube.com/watch?v=… или instagram.com/reel/… или tiktok.com/…"
              value={form.video_url ?? ""}
              onChange={(e) => setForm({ ...form, video_url: e.target.value })}
            />
          </div>
          <div>
            <Label>Обложка</Label>
            {form.cover_url && (
              <img src={form.cover_url} alt="" className="mb-2 aspect-video w-full rounded-md border object-cover" />
            )}
            <UploadInput onFile={onUpload} loading={uploading} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Отмена</Button>
          <Button onClick={save} disabled={saving}>{saving ? "Сохранение…" : "Сохранить"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ---------------- Shared ---------------- */
function UploadInput({ onFile, loading }: { onFile: (f: File) => void; loading: boolean }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-secondary">
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
      <span>{loading ? "Загрузка…" : "Загрузить изображение"}</span>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
          e.target.value = "";
        }}
      />
    </label>
  );
}

/* ---------------- SEO ---------------- */
const SEO_FALLBACK: SeoContent = {
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

function SeoEditor() {
  const { data, isLoading } = useContent();
  const save = useSaveContent();
  const [seo, setSeo] = useState<SeoContent>(SEO_FALLBACK);

  useEffect(() => {
    if (data?.seo) {
      setSeo({
        en: { title: data.seo.en?.title ?? "", description: data.seo.en?.description ?? "" },
        ru: { title: data.seo.ru?.title ?? "", description: data.seo.ru?.description ?? "" },
      });
    }
  }, [data]);

  if (isLoading) return <Skeleton />;

  const update = (lng: "en" | "ru", field: "title" | "description", v: string) =>
    setSeo((s) => ({ ...s, [lng]: { ...s[lng], [field]: v } }));

  const LIMITS = { title: 60, description: 160 };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {(["ru", "en"] as const).map((lng) => (
        <Card key={lng} className="p-6">
          <h3 className="mb-1 font-display text-lg font-semibold">
            SEO — {lng === "ru" ? "Русская версия (/ru)" : "English version (/)"}
          </h3>
          <p className="mb-4 text-xs text-muted-foreground">
            Плейсхолдеры показывают значения по умолчанию — если оставить поле пустым, используется дефолт.
          </p>

          <Label className="text-xs">
            Title (до {LIMITS.title} символов) — {seo[lng].title.length}/{LIMITS.title}
          </Label>
          <Input
            className="mt-1"
            maxLength={LIMITS.title}
            placeholder={SEO_FALLBACK[lng].title}
            value={seo[lng].title}
            onChange={(e) => update(lng, "title", e.target.value)}
          />

          <Label className="mt-4 text-xs">
            Description (до {LIMITS.description} символов) — {seo[lng].description.length}/{LIMITS.description}
          </Label>
          <Textarea
            className="mt-1"
            rows={4}
            maxLength={LIMITS.description}
            placeholder={SEO_FALLBACK[lng].description}
            value={seo[lng].description}
            onChange={(e) => update(lng, "description", e.target.value)}
          />
        </Card>
      ))}

      <div className="lg:col-span-2 flex items-center gap-3">
        <Button
          onClick={() => {
            const clean: SeoContent = {
              en: {
                title: seo.en.title.trim().slice(0, 60),
                description: seo.en.description.trim().slice(0, 160),
              },
              ru: {
                title: seo.ru.title.trim().slice(0, 60),
                description: seo.ru.description.trim().slice(0, 160),
              },
            };
            save.mutate({ key: "seo", value: clean });
          }}
          disabled={save.isPending}
        >
          {save.isPending ? "Сохранение…" : "Сохранить SEO"}
        </Button>
        <p className="text-xs text-muted-foreground">
          После сохранения обновите страницу сайта (Ctrl+F5) — новые метаданные будут в исходном коде страницы.
        </p>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="grid place-items-center py-16">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  );
}
