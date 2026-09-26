import posts from "@/data/blogPosts.json";

export function getPosts() {
  return [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPost(slug) {
  return posts.find((p) => p.slug === slug);
}

export function readingTime(html) {
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/*
 * Adds ids to the post's section headings (h2–h4) so they can be linked from a table of contents,
 * and drops the inline copy of the featured image (it is already shown at the top of the post).
 */
export function preparePost(post) {
  const toc = [];
  const used = new Set();
  let html = post.html.replace(/<p>\s*<img[^>]*src="([^"]+)"[^>]*>\s*<\/p>/, (m, src) => (src === post.image ? "" : m));
  html = html.replace(/<(h[2-4])>([\s\S]*?)<\/\1>/g, (m, tag, inner) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    let id = slugify(text) || "section";
    while (used.has(id)) id += "-2";
    used.add(id);
    toc.push({ id, text });
    return `<${tag} id="${id}">${inner}</${tag}>`;
  });
  return { html, toc };
}
