import { SITE_NAME, SITE_URL } from "./site";

// Keywords are optional: pass a list or a comma-separated string; empty or missing means no keywords tag
function cleanKeywords(keywords) {
  const list = Array.isArray(keywords) ? keywords : String(keywords || "").split(",");
  const clean = list.map((k) => String(k).trim()).filter(Boolean);
  return clean.length ? clean : undefined;
}

export function pageMetadata({ title, description, path = "/", image, type = "website", keywords }) {
  const url = `${SITE_URL}${path}`;
  const images = image ? [{ url: image, alt: title }] : undefined;
  return {
    title: { absolute: title },
    description,
    keywords: cleanKeywords(keywords),
    alternates: { canonical: url },
    openGraph: {
      type,
      locale: "en_US",
      url,
      siteName: SITE_NAME,
      title,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export function breadcrumbSchema(name, path) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name, item: `${SITE_URL}${path}` },
    ],
  };
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
