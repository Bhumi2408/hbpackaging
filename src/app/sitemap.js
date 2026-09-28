import { SITE_URL } from "@/lib/site";
import productPages from "@/data/productPages.json";
import posts from "@/data/blogPosts.json";

export default function sitemap() {
  const now = new Date();
  const staticPages = [
    { path: "/", priority: 1 },
    { path: "/about-us/", priority: 0.8 },
    { path: "/products/", priority: 0.9 },
    { path: "/contact-us/", priority: 0.8 },
    { path: "/blog/", priority: 0.6 },
  ];
  return [
    ...staticPages.map((p) => ({ url: `${SITE_URL}${p.path}`, lastModified: now, changeFrequency: "daily", priority: p.priority })),
    ...Object.keys(productPages).map((slug) => ({
      url: `${SITE_URL}/${slug}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    })),
    ...posts.map((p) => ({ url: `${SITE_URL}/${p.slug}/`, lastModified: new Date(p.date), changeFrequency: "daily", priority: 0.6 })),
  ];
}
