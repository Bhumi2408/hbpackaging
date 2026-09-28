import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";
import { Container, Html, JsonLd } from "./Sections";
import { getPosts, preparePost, readingTime } from "@/lib/blog";
import { formatDate } from "@/lib/seo";
import { extractFaqs } from "@/lib/faq";
import { faqSchema, ORG_ID } from "@/lib/schema";
import { CONTACT, PRODUCT_MENU, SITE_URL, WHATSAPP_URL } from "@/lib/site";

function SidebarCard({ title, children, className = "" }) {
  return (
    <div className={`rounded-[30px] bg-white p-7 shadow-[0_6px_24px_rgba(40,75,99,0.10)] ${className}`}>
      {title && (
        <h3 className="mb-5 text-xl font-extrabold text-p1 after:mt-2.5 after:block after:h-[3px] after:w-10 after:rounded after:bg-p2">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

export default function BlogPost({ post }) {
  const path = `/${post.slug}/`;
  const { html, toc } = preparePost(post);
  const minutes = readingTime(post.html);
  const faqLd = faqSchema(extractFaqs(post.html));
  const others = getPosts().filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog/` },
            { "@type": "ListItem", position: 3, name: post.heading, item: `${SITE_URL}${path}` },
          ],
        }}
      />
      {faqLd && <JsonLd data={faqLd} />}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.heading,
          description: post.description,
          image: `${SITE_URL}${post.image}`,
          datePublished: post.date,
          wordCount: post.html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length,
          author: { "@type": "Person", name: post.author },
          publisher: { "@id": ORG_ID },
          mainEntityOfPage: `${SITE_URL}${path}`,
        }}
      />

      {/* Hero */}
      <section className="bg-cream pb-[150px] pt-[90px] lg:pb-[190px] lg:pt-[110px]">
        <Container className="anim-fade-up max-w-[980px] text-center">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center justify-center gap-2 text-sm font-semibold text-p3">
              <li>
                <Link href="/" className="hover:text-p2">
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="angleDoubleRight" size="12" className="text-p2" />
                <Link href="/blog/" className="hover:text-p2">
                  Blog
                </Link>
              </li>
              <li className="flex items-center gap-2 text-p2" aria-current="page">
                <Icon name="angleDoubleRight" size="12" />
                Article
              </li>
            </ol>
          </nav>
          <span className="mt-6 inline-block rounded-full bg-p1 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
            {post.category}
          </span>
          <h1 className="mt-5 text-[30px] font-black leading-[1.15] text-p1 md:text-[50px]">{post.heading}</h1>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-p3">
            <li className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-p2 text-sm font-bold uppercase text-white">
                {post.author.charAt(0)}
              </span>
              By <strong className="text-p1">{post.author}</strong>
            </li>
            <li>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </li>
            <li>{minutes} min read</li>
          </ul>
        </Container>
      </section>

      {/* Featured image overlapping the hero */}
      <Container className="max-w-[1260px]">
        <div className="anim-fade relative -mt-[110px] aspect-[16/8] overflow-hidden rounded-[40px] bg-[#eef4f2] shadow-[0_20px_50px_rgba(40,75,99,0.18)] lg:-mt-[150px]">
          <Image
            src={post.image}
            alt={post.heading}
            fill
            priority
            sizes="(max-width: 1260px) 100vw, 1230px"
            className="object-contain p-6 md:p-10"
          />
        </div>
      </Container>

      {/* Body + sidebar */}
      <section className="pb-[70px] pt-12 lg:pt-16">
        <Container className="grid max-w-[1260px] gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
          <article className="min-w-0">
            <Html html={html} className="text-[18px]" />

            <div className="mt-14 flex flex-col items-start justify-between gap-5 rounded-[30px] bg-p6 p-7 sm:flex-row sm:items-center">
              <p className="text-lg font-semibold text-p1">Found this helpful? Talk to our packaging experts.</p>
              <Link href="/contact-us/" className="btn shrink-0 !px-8 !py-4">
                Contact Us <Icon name="arrowCircleRight" />
              </Link>
            </div>

            <Link href="/blog/" className="mt-8 inline-flex items-center gap-2 font-semibold text-p2 hover:text-p1">
              <Icon name="arrowCircleRight" className="rotate-180" /> Back to Blog
            </Link>
          </article>

          <aside className="space-y-8 lg:sticky lg:top-6 lg:self-start">
            {toc.length > 0 && (
              <SidebarCard title="In This Article" className="hidden lg:block">
                <ol className="max-h-[48vh] space-y-2.5 overflow-y-auto pr-2 text-[15px]">
                  {toc.map((t, i) => (
                    <li key={t.id} className="flex gap-3">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-p5 text-[11px] font-bold text-p1">
                        {i + 1}
                      </span>
                      <a href={`#${t.id}`} className="leading-snug text-p3 transition-colors hover:text-p2">
                        {t.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </SidebarCard>
            )}

            <div className="rounded-[30px] bg-p1 p-7 text-white">
              <h3 className="text-xl font-extrabold text-white">Get a Free Quote</h3>
              <p className="mt-2 text-p5">Custom blister trays, bulk orders and pan-India delivery from Delhi.</p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-center justify-center gap-2 rounded-[50px] bg-[#25D366] py-3.5 font-semibold text-white transition-transform hover:scale-[1.03]"
              >
                <Icon name="whatsapp" size="18" /> WhatsApp Us
              </a>
              <a
                href={`tel:${CONTACT.phones[0].tel}`}
                className="mt-3 flex items-center justify-center gap-2 rounded-[50px] border-2 border-white/60 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-p1"
              >
                <Icon name="phoneAlt" /> {CONTACT.phones[0].label}
              </a>
            </div>

            <SidebarCard title="Our Products">
              <ul className="space-y-1">
                {PRODUCT_MENU.map((p) => (
                  <li key={p.href}>
                    <Link
                      href={p.href}
                      className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[15px] text-p3 transition-colors hover:bg-p6 hover:text-p1"
                    >
                      <Icon name="angleDoubleRight" size="11" className="shrink-0 text-p2" />
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </SidebarCard>

            {others.length > 0 && (
              <SidebarCard title="Recent Posts">
                <ul className="space-y-4">
                  {others.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/${p.slug}/`} className="font-semibold leading-snug text-p1 hover:text-p2">
                        {p.heading}
                      </Link>
                      <p className="mt-1 text-sm text-p3">{formatDate(p.date)}</p>
                    </li>
                  ))}
                </ul>
              </SidebarCard>
            )}
          </aside>
        </Container>
      </section>
    </>
  );
}
