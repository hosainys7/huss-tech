import { readFile } from "node:fs/promises";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const rawPort = process.env.PORT ?? "5173";
const port = Number(rawPort);
if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

// Force base to "/" for production builds (LWS / any external host).
// In dev on Replit, BASE_PATH is set by the platform to the artifact proxy path.
const isProduction = process.env.NODE_ENV === "production";
const basePath = isProduction ? "/" : (process.env.BASE_PATH ?? "/");

function injectMetadata(
  html: string,
  head: { title: string; description: string; canonicalUrl: string },
) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${head.title}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${head.description}" />`,
    )
    .replace(
      /<link rel="canonical" href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${head.canonicalUrl}" />`,
    )
    .replace(
      /<meta property="og:url" content="[^"]*"\s*\/?>/,
      `<meta property="og:url" content="${head.canonicalUrl}" />`,
    )
    .replace(
      /<meta property="og:title" content="[^"]*"\s*\/?>/,
      `<meta property="og:title" content="${head.title}" />`,
    )
    .replace(
      /<meta property="og:description" content="[^"]*"\s*\/?>/,
      `<meta property="og:description" content="${head.description}" />`,
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
      `<meta name="twitter:title" content="${head.title}" />`,
    )
    .replace(
      /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
      `<meta name="twitter:description" content="${head.description}" />`,
    );
}

function developmentSsr(): Plugin {
  const publicRoutes = new Set([
    "/",
    "/services",
    "/a-propos",
    "/processus",
    "/contact",
    "/faq",
  ]);

  return {
    name: "huss-tech-development-ssr",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        if (request.method !== "GET" || !request.headers.accept?.includes("text/html")) {
          next();
          return;
        }

        const requestUrl = new URL(request.url ?? "/", "http://localhost");
        const routePath =
          basePath !== "/" && requestUrl.pathname.startsWith(basePath)
            ? requestUrl.pathname.slice(basePath.length - 1)
            : requestUrl.pathname;
        const normalizedPath =
          routePath !== "/" && routePath.endsWith("/")
            ? routePath.slice(0, -1)
            : routePath;

        if (!publicRoutes.has(normalizedPath)) {
          next();
          return;
        }

        try {
          const templatePath = path.resolve(import.meta.dirname, "index.html");
          const template = await readFile(templatePath, "utf8");
          const transformed = await server.transformIndexHtml(
            requestUrl.pathname,
            template,
          );
          const serverEntry = await server.ssrLoadModule("/src/entry-server.tsx");
          const rendered = serverEntry.render(normalizedPath);
          const html = injectMetadata(transformed, rendered.head).replace(
            '<div id="root"></div>',
            `<div id="root">${rendered.appHtml}</div>`,
          );

          response.statusCode = 200;
          response.setHeader("Content-Type", "text/html; charset=utf-8");
          response.end(html);
        } catch (error) {
          server.ssrFixStacktrace(error as Error);
          next(error);
        }
      });
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    developmentSsr(),
    ...(isProduction ? [] : [runtimeErrorOverlay()]),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
