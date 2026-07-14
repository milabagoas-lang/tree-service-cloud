import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow justify-center">Error 404</p>
        <h1 className="mt-4 text-6xl font-bold text-gradient">Page not found</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow justify-center">Something went wrong</p>
        <h1 className="mt-4 text-2xl font-semibold text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-border bg-transparent px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0A0F0D" },
      { title: "CRYSTAL CLOUD LLC — Профессиональный спил и обрезка деревьев" },
      {
        name: "description",
        content:
          "Безопасное удаление деревьев любой сложности, чистка пальм, обрезка веток над домом и услуги арбориста в Sacramento. 📞 916-890-8080",
      },
      { name: "author", content: "Crystal Cloud LLC" },
      { property: "og:site_name", content: "Crystal Cloud LLC" },
      { property: "og:title", content: "CRYSTAL CLOUD LLC — Профессиональный спил и обрезка деревьев" },
      {
        property: "og:description",
        content:
          "Безопасное удаление деревьев любой сложности, чистка пальм, обрезка веток над домом и услуги арбориста в Sacramento. 📞 916-890-8080",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "CRYSTAL CLOUD LLC — Профессиональный спил и обрезка деревьев" },
      {
        name: "twitter:description",
        content: "Безопасное удаление деревьев любой сложности, чистка пальм, обрезка веток над домом и услуги арбориста в Sacramento. 📞 916-890-8080",
      },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0806870e-a7ae-4dc0-8ba6-6da1c95b6239/id-preview-917701a4--7436ffef-2f6b-4dd8-9b92-d6a5e0e56de1.lovable.app-1783544069979.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0806870e-a7ae-4dc0-8ba6-6da1c95b6239/id-preview-917701a4--7436ffef-2f6b-4dd8-9b92-d6a5e0e56de1.lovable.app-1783544069979.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Crystal Cloud LLC",
          url: "https://crystal-cloud-shine.lovable.app",
          telephone: "+1-916-890-8080",
          areaServed: "Sacramento, CA",
          description:
            "Licensed & insured tree removal, pruning, palm cleaning and emergency storm cleanup in Sacramento, CA.",
          sameAs: ["https://t.me/crystalcloudllc_bot"],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
