import { renderToString } from "react-dom/server";
import App from "./App";
import { metadataForPath, PUBLIC_PAGES, SITE_URL } from "./seo";

export { PUBLIC_PAGES };

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function render(pathname: string) {
  const metadata = metadataForPath(pathname);
  const canonicalUrl = `${SITE_URL}${metadata.path}`;

  return {
    appHtml: renderToString(<App ssrPath={metadata.path} />),
    head: {
      title: escapeHtml(metadata.title),
      description: escapeHtml(metadata.description),
      canonicalUrl,
    },
  };
}