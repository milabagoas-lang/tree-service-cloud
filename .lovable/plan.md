## План

### 1. Lovable Cloud (Supabase) + Google Auth
- Увімкнути Lovable Cloud.
- Активувати Google OAuth провайдер.
- Таблиця `user_roles` (enum `app_role: admin`) + функція `has_role`.
- Тригер `on_auth_user_created`: якщо `email = 'ordinaryarborist@gmail.com'` і `email_confirmed_at IS NOT NULL` → автоматично видає роль `admin`. Ніхто інший не отримує доступ.

### 2. Схема БД
- `site_content(key text pk, value jsonb, updated_at)` — по одному запису на секцію: `hero`, `about`, `contacts`, `services`. Значення — jsonb з підполями для RU/EN.
- `portfolio_items(id uuid pk, title text, description text, category text, cover_url text, video_url text, sort_order int, created_at timestamptz default now())`.
- RLS: `SELECT` — публічно (anon+authenticated); `INSERT/UPDATE/DELETE` — тільки `has_role(auth.uid(),'admin')`.
- GRANT для anon/authenticated/service_role згідно правил.

### 3. Storage
- Bucket `site-images` (public) для: hero-фото, founder-фото, обкладинок портфоліо.

### 4. Роутинг
- `_authenticated/route.tsx` — керується інтеграцією (redirect на `/auth`).
- `/auth` — Google-логін кнопка (тільки Google).
- `/admin` — dashboard, вкладки:
  - **Головна** — редактор hero (заголовки, підзаголовки RU/EN, кнопки, upload hero photo).
  - **Послуги** — список карток послуг з іконкою (лишаємо emoji/lucide name), заголовок, опис (RU/EN), сортування.
  - **Про мене** — bio RU/EN + завантаження фото.
  - **Контакти** — телефон, email, адреса + масив соцмереж `[{platform, url}]` (Instagram, Facebook, TikTok, YouTube, Telegram тощо).
  - **Портфоліо** — таблиця робіт з кнопками Додати/Редагувати/Видалити. Форма: назва, опис, категорія (select), відео-URL (YT/Instagram/TikTok), upload обкладинки.
- Гейт: у `_authenticated/route.tsx` додатково перевіряти роль admin, інакше redirect на `/`.

### 5. Публічний сайт (`Landing.tsx`)
- Завантажує `site_content` та `portfolio_items` через public server fn (SSR-safe, publishable key, тільки SELECT).
- Fallback на `dict.ts` якщо запис ще не створено.
- Портфоліо-секція: сітка з обкладинками. Клік → **модальне вікно** з embed:
  - YouTube → `youtube.com/embed/{id}`
  - Instagram → `instagram.com/reel/{id}/embed`
  - TikTok → офіційний embed iframe
- Секція Контакти рендерить іконки соцмереж з БД.

### 6. Технічні деталі
- Server fns у `src/lib/*.functions.ts`:
  - `getSiteContent`, `getPortfolio` — публічні (server publishable client).
  - `upsertSiteContent`, `createPortfolioItem`, `updatePortfolioItem`, `deletePortfolioItem`, `uploadImage` — `requireSupabaseAuth` + перевірка ролі admin.
- UI адмінки — shadcn (Card, Tabs, Input, Textarea, Dialog, Button, Table).
- Мова адмінки: RU.

### 7. Приймальні критерії
- Логін через Google працює тільки для `ordinaryarborist@gmail.com`; інші акаунти бачать "Доступ заборонено".
- Зміни в адмінці одразу відображаються на сайті (invalidate query).
- Портфоліо-роботи з YouTube/Instagram/TikTok відкриваються у модалці.
- Форма контактів на сайті + Телеграм-бот працюють без змін.
