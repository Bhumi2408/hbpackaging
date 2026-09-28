import { notFound } from "next/navigation";
import { Container, Html, JsonLd, PageHeader, ProductBlock } from "@/components/Sections";
import BlogPost from "@/components/BlogPost";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { extractFaqs } from "@/lib/faq";
import { faqSchema, productSchema } from "@/lib/schema";
import productPages from "@/data/productPages.json";
import posts from "@/data/blogPosts.json";

// Category pages and blog posts both live at the site root, keeping the existing public URLs
export const dynamicParams = false;

export function generateStaticParams() {
  return [...Object.keys(productPages), ...posts.map((p) => p.slug)].map((slug) => ({ slug }));
}

function findPost(slug) {
  return posts.find((p) => p.slug === slug);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = productPages[slug];
  if (page) {
    return pageMetadata({
      title: page.title,
      description: page.description,
      keywords: page.keywords,
      path: `/${slug}/`,
      image: page.ogImage,
    });
  }
  const post = findPost(slug);
  if (post) {
    return pageMetadata({
      title: post.title,
      description: post.description,
      keywords: post.keywords,
      path: `/${slug}/`,
      image: post.image,
      type: "article",
    });
  }
  return {};
}

export default async function SlugPage({ params }) {
  const { slug } = await params;
  const page = productPages[slug];
  if (page) return <CategoryPage slug={slug} page={page} />;
  const post = findPost(slug);
  if (post) return <BlogPost post={post} />;
  notFound();
}

function CategoryPage({ slug, page }) {
  const path = `/${slug}/`;
  const products = page.sections.filter((s) => s.type === "product");
  let productIndex = 0;

  const productsLd = products.map((p) => productSchema(p, { pagePath: path, pageTitle: page.heading }));
  const faqLd = faqSchema(extractFaqs(...page.sections.map((s) => s.html)));

  return (
    <>
      <JsonLd data={breadcrumbSchema(page.heading, path)} />
      {productsLd.map((s, i) => (
        <JsonLd key={i} data={s} />
      ))}
      {faqLd && <JsonLd data={faqLd} />}
      <PageHeader title={page.heading} />

      {page.sections.map((s, i) =>
        s.type === "product" ? (
          <ProductBlock key={i} product={s} index={productIndex++} pageTitle={page.heading} />
        ) : (
          <ContentSection key={i} html={s.html} />
        )
      )}
    </>
  );
}

// SEO text blocks: a lone heading becomes a centered title band, longer copy sits in a soft white card
function ContentSection({ html }) {
  const onlyHeading = /^<h[1-6]>[^<]*<\/h[1-6]>$/.test(html.trim());
  if (onlyHeading) {
    return (
      <section className="bg-p7 py-10">
        <Container>
          <Html html={html} className="anim-fade-up text-center [&>h2::after]:mx-auto" />
        </Container>
      </section>
    );
  }
  return (
    <section className="bg-cream py-[60px]">
      <Container className="max-w-[1100px]">
        <div className="anim-fade-up rounded-[40px] bg-white px-6 py-10 shadow-[0_10px_40px_rgba(40,75,99,0.08)] md:px-14 md:py-14">
          <Html html={html} />
        </div>
      </Container>
    </section>
  );
}
