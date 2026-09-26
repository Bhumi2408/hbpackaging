import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";
import { withFaqAccordion } from "@/lib/faq";
import { PRODUCT_GRID } from "@/lib/site";

export function Container({ className = "", children }) {
  return <div className={`mx-auto w-full max-w-[1140px] px-4 ${className}`}>{children}</div>;
}

// Rich text content; any FAQ section inside it is rendered as an accordion
export function Html({ html, className = "" }) {
  return <div className={`rich-text ${className}`} dangerouslySetInnerHTML={{ __html: withFaqAccordion(html) }} />;
}

/* Inner-page title band with breadcrumb (min-height 400px desktop / 300px mobile) */
export function PageHeader({ title, as: Tag = "h2" }) {
  return (
    <section className="flex min-h-[340px] items-center bg-cream pt-10 md:min-h-[400px] lg:pt-[50px]">
      <Container className="anim-fade-up text-center">
        <Tag className="text-4xl font-black text-p1 md:text-[55px] md:leading-[1.1]">{title}</Tag>
        <nav aria-label="Breadcrumb" className="mt-5">
          <ol className="flex flex-wrap items-center justify-center gap-3 font-semibold text-p3">
            <li className="flex items-center gap-2">
              <Link href="/" className="hover:text-p2">
                Home
              </Link>
            </li>
            <li className="flex items-center gap-2" aria-current="page">
              <Icon name="angleDoubleRight" size="14" className="text-p2" />
              {title}
            </li>
          </ol>
        </nav>
      </Container>
    </section>
  );
}

/* Product cards grid used on Home ("Popular Product") and Products */
export function ProductGrid() {
  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
      {PRODUCT_GRID.map((p) => (
        <div
          key={p.href + p.title}
          className="anim-fade-up flex flex-col rounded-[10px] bg-white p-2.5 shadow-[0_0_1px_0_rgba(0,0,0,0.5)]"
        >
          <Link href={p.href} className="relative block h-[100px] overflow-hidden rounded-[10px] shadow-[0_0_2px_0_rgba(0,0,0,0.5)] md:h-[230px]">
            <Image
              src={p.image}
              alt={p.title}
              fill
              sizes="(max-width: 767px) 50vw, (max-width: 1024px) 33vw, 270px"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </Link>
          <h5 className="my-4 flex-1 text-center text-xs font-semibold text-p1 md:text-base">
            <Link href={p.href}>{p.title}</Link>
          </h5>
          <div className="text-center">
            <Link
              href={p.href}
              className="inline-block rounded-[3px] bg-p2 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-p1 md:px-6 md:py-3 md:text-[15px]"
            >
              More Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

const STATS = [
  { icon: "boxOpen", value: "10+", label: "Years of Experience" },
  { icon: "users", value: "5", label: "Customer Rate" },
  { icon: "clipboardCheck", value: "18K", label: "Project Done" },
];

const FEATURES = [
  { icon: "thumbsUp", title: "Premium Quality", text: "Exceptional packaging crafted to perfection.", box: "bg-p1 text-white", sub: "text-p5", circle: "bg-p2 text-white" },
  { icon: "leaf", title: "Eco-Friendly", text: "Sustainable solutions for a better future.", box: "bg-cream text-p1", sub: "text-p1", circle: "bg-p2 text-white" },
  { icon: "headphonesAlt", title: "24/7Support", text: "Always here for your needs.", box: "bg-p2 text-white", sub: "text-p5", circle: "bg-p1 text-white" },
];

/* Stats row + "Why Choose Us" (shared by Home and About) */
export function WhyChooseUs({ text, learnMoreHref = "/about-us/" }) {
  return (
    <section className="bg-white pt-[50px]">
      <Container>
        <div className="grid gap-8 sm:grid-cols-3 justify-between">
          {STATS.map((s) => (
            <div key={s.label} className="anim-fade-up flex items-center justify-center gap-4 text-p1">
              <Icon name={s.icon} size="60" className="text-white bg-p2 p-3 rounded-full"/>
              <div>
                <h3 className="text-[45px] font-extrabold leading-none text-p1">{s.value}</h3>
                <p className="text-p3">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="py-[26px]">
          <div className="divider-tribal" />
        </div>

        <div className="grid items-center gap-8 pb-[50px] lg:grid-cols-[24%_1fr_35%]">
          <div className="anim-fade-up">
            <h2 className="text-[32px] font-extrabold leading-tight text-p1 md:text-[40px]">
              Why
              <br />
              Choose Us
            </h2>
            <p className="my-5">{text}</p>
            <Link href={learnMoreHref} className="btn">
              <Icon name="arrowCircleRight" />
              Learn More
            </Link>
          </div>
          <div className="anim-fade relative mx-auto aspect-square w-full max-w-[460px]">
            <Image
              src="/home/why-choose.png"
              alt="Blister packaging trays by HB Packaging"
              fill
              sizes="(max-width: 1024px) 90vw, 460px"
              className="object-contain"
            />
          </div>
          <div className="space-y-5">
            {FEATURES.map((f) => (
              <div key={f.title} className={`anim-fade-up flex items-center gap-5 rounded-[90px] p-[5px] ${f.box}`}>
                <span className={`grid h-[80px] w-[80px] shrink-0 place-items-center rounded-full ${f.circle}`}>
                  <Icon name={f.icon} size="35" />
                </span>
                <div className="py-2 pr-3">
                  <h5 className="text-lg font-bold text-inherit lg:text-xl">{f.title}</h5>
                  <p className={`mt-0.5 text-[14px] leading-[1.8] ${f.sub}`}>{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* One product block on category pages: image | rating, name, price, specs, WhatsApp CTA */
export function ProductBlock({ product, index, pageTitle }) {
  const reverse = index % 2 === 1;
  const NameTag = /^h[1-6]$/.test(product.nameTag || "") ? product.nameTag : "h4";
  return (
    <section className={index % 2 === 0 ? "bg-white" : "bg-cream"}>
      <Container className="py-10 md:py-[50px]">
        <div className={`grid items-center gap-8 md:grid-cols-2 md:gap-12 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
          <div className="anim-fade relative h-[220px] overflow-hidden rounded-[20px] shadow-[0_0_10px_0_rgba(0,0,0,0.5)] md:h-[450px]">
            <Image
              src={product.image}
              alt={product.alt || product.name || pageTitle}
              fill
              sizes="(max-width: 767px) 100vw, 550px"
              className="object-cover"
              priority={index === 0}
            />
          </div>
          <div className="anim-fade-up">
            {product.rating && <Stars value={product.rating} />}
            <NameTag className="mt-3 text-2xl font-semibold text-p1">{product.name}</NameTag>
            {product.price && <p className="mt-2 text-[28px] font-semibold text-p2">{product.price}</p>}
            {product.details?.map((d, i) => (
              <div key={i} className="spec-table mt-5 overflow-x-auto" dangerouslySetInnerHTML={{ __html: d }} />
            ))}
            {product.button?.href && (
              <a
                href={product.button.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn mt-6 !px-[50px] !py-[10px] !text-lg"
              >
                <Icon name="whatsapp" />
                {product.button.text || "Interested"}
              </a>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Stars({ value = 5 }) {
  return (
    <div className="flex gap-1 text-[#f0ad4e]" role="img" aria-label={`Rated ${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.max(0, Math.min(1, value - (i - 1)));
        return (
          <span key={i} className="relative inline-block h-5 w-5">
            <Icon name="star" size="20" className="absolute inset-0 text-[#ccd6df]" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Icon name="star" size="20" />
            </span>
          </span>
        );
      })}
    </div>
  );
}

export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
