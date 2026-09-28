import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { Container, JsonLd, PageHeader } from "@/components/Sections";
import { getPosts, readingTime } from "@/lib/blog";
import { breadcrumbSchema, formatDate, pageMetadata } from "@/lib/seo";
import { CONTACT, WHATSAPP_URL } from "@/lib/site";
import content from "@/data/pageContent.json";

const meta = content.meta.blog;

export const metadata = pageMetadata({
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  path: "/blog/",
});

function PostMeta({ post, light = false }) {
  return (
    <ul className={`flex flex-wrap items-center gap-x-5 gap-y-1 text-sm ${light ? "text-white/80" : "text-p3"}`}>
      <li>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </li>
      <li className="flex items-center gap-1.5">
        <span className={`h-1 w-1 rounded-full ${light ? "bg-white/60" : "bg-p2"}`} />
        {readingTime(post.html)} min read
      </li>
      <li className="flex items-center gap-1.5">
        <span className={`h-1 w-1 rounded-full ${light ? "bg-white/60" : "bg-p2"}`} />
        By {post.author}
      </li>
    </ul>
  );
}

function FeaturedPost({ post }) {
  const href = `/${post.slug}/`;
  return (
    <article className="anim-fade-up group grid overflow-hidden rounded-[40px] bg-white shadow-[0_10px_40px_rgba(40,75,99,0.12)] lg:grid-cols-[1.05fr_1fr]">
      <Link href={href} className="relative block min-h-[280px] overflow-hidden bg-cream lg:min-h-[440px]" tabIndex={-1}>
        <Image
          src={post.image}
          alt={post.heading}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 600px"
          className="object-contain p-8 transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-6 top-6 rounded-full bg-p1 px-4 py-1.5 text-sm font-semibold text-white">
          Featured
        </span>
      </Link>
      <div className="flex flex-col justify-center p-7 md:p-12">
        <span className="w-fit rounded-full bg-p5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-p2">
          {post.category}
        </span>
        <h2 className="mt-4 text-2xl font-extrabold leading-tight text-p1 md:text-[34px]">
          <Link href={href} className="transition-colors hover:text-p2">
            {post.heading}
          </Link>
        </h2>
        <div className="mt-4">
          <PostMeta post={post} />
        </div>
        <p className="mt-5 text-[17px] leading-relaxed">{post.excerpt}</p>
        <Link href={href} className="btn mt-8 w-fit">
          Read Article
          <Icon name="arrowCircleRight" />
        </Link>
      </div>
    </article>
  );
}

function PostCard({ post }) {
  const href = `/${post.slug}/`;
  return (
    <article className="anim-fade-up group flex flex-col overflow-hidden rounded-[30px] bg-white shadow-[0_6px_24px_rgba(40,75,99,0.10)] transition-shadow hover:shadow-[0_12px_36px_rgba(40,75,99,0.18)]">
      <Link href={href} className="relative block aspect-[16/10] overflow-hidden bg-cream" tabIndex={-1}>
        <Image
          src={post.image}
          alt={post.heading}
          fill
          sizes="(max-width: 767px) 100vw, 360px"
          className="object-contain p-5 transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-p2 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          {post.category}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <PostMeta post={post} />
        <h3 className="mt-3 text-xl font-bold leading-snug text-p1">
          <Link href={href} className="transition-colors hover:text-p2">
            {post.heading}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-[15px]">{post.excerpt}</p>
        <Link href={href} className="mt-5 inline-flex items-center gap-2 font-semibold text-p2 hover:text-p1">
          Read More <Icon name="arrowCircleRight" />
        </Link>
      </div>
    </article>
  );
}

export default function BlogPage() {
  const [featured, ...rest] = getPosts();

  return (
    <>
      <JsonLd data={breadcrumbSchema("Blog", "/blog/")} />
      <PageHeader title="Blog" />

      <section className="bg-[linear-gradient(var(--cream)_0,var(--cream)_120px,#fff_120px)] pb-[70px] pt-6">
        <Container className="max-w-[1260px]">
          {featured && <FeaturedPost post={featured} />}

          {rest.length > 0 && (
            <>
              <h2 className="mb-8 mt-16 text-[30px] font-extrabold text-p1">More Articles</h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((p) => (
                  <PostCard key={p.slug} post={p} />
                ))}
              </div>
            </>
          )}

          {/* Quote banner */}
          <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-[40px] bg-p1 px-8 py-10 md:flex-row md:items-center md:px-14">
            <div>
              <h2 className="text-2xl font-extrabold text-white md:text-[32px]">Need blister trays for your product?</h2>
              <p className="mt-2 text-lg text-p5">Get a quick quote from HB Packaging — custom sizes, bulk orders, pan-India delivery.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn !shadow-none">
                <Icon name="whatsapp" /> WhatsApp Us
              </a>
              <a
                href={`tel:${CONTACT.phones[0].tel}`}
                className="inline-flex items-center gap-2 rounded-[50px] border-2 border-white/70 px-8 py-[18px] font-medium text-white transition-colors hover:bg-white hover:text-p1"
              >
                <Icon name="phoneAlt" /> Call Now
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
