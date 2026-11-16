import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { Container, Html, JsonLd, ProductGrid, WhyChooseUs } from "@/components/Sections";
import { pageMetadata } from "@/lib/seo";
import content from "@/data/pageContent.json";
import { extractFaqs } from "@/lib/faq";
import { ORG_ID, faqSchema } from "@/lib/schema";
import { CONTACT } from "@/lib/site";

const meta = content.meta.home;

export const metadata = pageMetadata({
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  path: "/",
  image: "/home/banner-image.png",
});

const EXCELLENCE = ["Eco-Friendly Approach", "Cost-Effective Solutions", "Trusted Partner", "Timely Delivery"];

const VISION_MISSION = [
  {
    title: "Our Vision",
    icon: "eye",
    card: "bg-navy",
    circle: "bg-p2",
    text: "To be a globally recognized leader in innovative and sustainable packaging solutions, creating value for our clients while preserving the environment for future generations.",
  },
  {
    title: "Our Mission",
    icon: "crosshairs",
    card: "bg-p2",
    circle: "bg-navy",
    text: "At HB Packaging and Trading, our mission is to deliver superior quality, customizable, and eco-friendly packaging solutions that exceed client expectations.",
  },
];

// Same three colour styles as the shared Why Choose Us cards, repeated across six points
const CARD_STYLES = [
  { box: "bg-p1 text-white", sub: "text-p5", circle: "bg-p2 text-white" },
  { box: "bg-cream text-p1", sub: "text-p1", circle: "bg-p2 text-white" },
  { box: "bg-p2 text-white", sub: "text-p5", circle: "bg-p1 text-white" },
];

const WHY_CHOOSE = [
  { icon: "thumbsUp", title: "Premium Quality", text: "Precisely formed trays with smooth edges, accurate cavities and a strong structure." },
  { icon: "cogs", title: "Fully Customised", text: "Size, shape, depth, cavity count and thickness made to your product." },
  { icon: "checkCircle", title: "Cost-Effective Solutions", text: "Direct manufacturer pricing, so you get quality without paying for middlemen." },
  { icon: "leaf", title: "Eco-Friendly Approach", text: "Recyclable material options for brands that care about sustainability." },
  { icon: "rocket", title: "Timely Delivery", text: "Reliable production schedules for small and bulk orders." },
  { icon: "headphonesAlt", title: "24/7 Support", text: "Our team is always available to answer questions and guide you." },
].map((f, i) => ({ ...f, ...CARD_STYLES[i % CARD_STYLES.length] }));

const SERVICE_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Blister Packaging Manufacturing",
  name: "Blister Packaging Manufacturing",
  provider: { "@id": ORG_ID },
  areaServed: { "@type": "Country", name: "India" },
  description:
    "Custom blister trays and blister packaging for biscuits, cakes, cookies, sweets, chips, rusk, muffins, toys and cosmetics, manufactured in Delhi with pan-India delivery.",
};

const faqLd = faqSchema(extractFaqs(content.homeFaq));

const SUPPLIER_POINTS = ["Small bakeries", "Growing cosmetic brands", "Large FMCG companies"];

export default function Home() {
  return (
    <>
      <JsonLd data={SERVICE_LD} />
      {faqLd && <JsonLd data={faqLd} />}
      {/* Hero */}
      <section className="bg-cream pb-[25px] pt-[65px] lg:pt-[75px]">
        <Container className="grid items-center gap-8 md:grid-cols-2">
          <div className="anim-fade-up py-8">
            {/* Display heading only; the page's H1 sits in its own band below the hero */}
            <p>
              <span className="block text-[40px] font-black leading-tight text-p1 md:text-[55px]">Make The Best</span>
              <span className="-mt-2 block text-[42px] font-black leading-tight text-p2 md:-mt-5 md:text-[70px]">
                Packaging
              </span>
            </p>
            <p className="my-6 text-p3">
              Choosing the right packaging can decide how your product looks, travels and sells. HB Packaging is a
              leading blister packaging manufacturer and supplier based in Bawana, Delhi, delivering durable, customised
              and cost-effective blister trays to businesses across India. With over 10 years of experience and 18,000+
              projects completed, we help brands protect their products and present them beautifully on the shelf.
            </p>
            <Link href="/about-us/" className="btn">
              <Icon name="arrowCircleRight" />
              Learn More
            </Link>
          </div>
          <div className="anim-fade relative mx-auto aspect-[2000/1833] w-full max-w-[560px]">
            <Image
              src="/home/banner-image.png"
              alt="Blister Packaging Manufacturer"
              fill
              priority
              sizes="(max-width: 767px) 100vw, 560px"
              className="object-contain"
            />
          </div>
        </Container>
      </section>

      <section className="bg-cream pb-[40px] pt-[15px]">
        <Container>
          <h1 className="anim-fade-up text-center text-[28px] font-black leading-tight text-p1 md:text-[40px]">
            Blister Packaging Manufacturer &amp; <span className="text-p2">Supplier in Delhi NCR</span>
          </h1>
        </Container>
      </section>

      {/* Vision / Mission / Excellence */}
      <section className="bg-[linear-gradient(var(--cream)_50%,#fff_50%)]">
        <div className="grid items-center gap-10 rounded-[50px] bg-p1 px-5 pb-12 pt-[70px] sm:px-10 lg:grid-cols-[57%_1fr] lg:gap-[45px] lg:pb-[100px] lg:pl-[93px] lg:pr-10 lg:pt-[110px]">
          <div className="grid gap-[80px] sm:grid-cols-2 sm:gap-[37px]">
            {VISION_MISSION.map((c) => (
              <div
                key={c.title}
                className={`anim-fade-up relative flex flex-col items-center justify-center rounded-[50px] px-5 pb-6 pt-[70px] text-center text-white ${c.card}`}
              >
                <span
                  className={`absolute -top-[50px] left-1/2 grid h-[100px] w-[100px] -translate-x-1/2 place-items-center rounded-full text-white ${c.circle}`}
                >
                  <Icon name={c.icon} size="50" />
                </span>
                <h4 className="text-lg font-bold text-white lg:text-[25px]">{c.title}</h4>
                <p className="mt-2 leading-[1.65] lg:text-base">{c.text}</p>
              </div>
            ))}
          </div>
          <div className="anim-fade-up">
            <h2 className="text-[30px] font-black leading-[0.9] text-white md:text-[40px]">
              Excellence In Blister Packaging
            </h2>
            <ul className="mt-7 space-y-[10px]">
              {EXCELLENCE.map((t) => (
                <li key={t} className="flex items-center gap-3 text-white">
                  <Icon name="checkCircle" size="24" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <WhyChooseUs
        title="Why Choose HB Packaging as Your Blister Packaging Manufacturer?"
        text="As a dedicated blister packaging manufacturer, we focus on quality at every stage, from design to delivery."
        features={WHY_CHOOSE}
      />

      {/* Popular Product */}
      <section className="py-[50px] bg-cream">
        <Container>
          <h2 className="mb-8 text-center text-[32px] font-extrabold text-p1 md:text-[40px]">Popular Product</h2>
          <ProductGrid />
        </Container>
      </section>

      {/* Trusted supplier + quote card */}
      <section className="bg-white py-[60px] lg:py-[90px]">
        <Container className="grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,500px)] lg:gap-16">
          <div className="anim-fade-up">
            <span className="inline-block rounded-full bg-cream px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-p2">
              Manufacturer &amp; Supplier
            </span>
            <h2 className="mt-4 text-[30px] font-extrabold leading-tight text-p1 md:text-[40px]">
              Your Trusted Blister Packaging Supplier
            </h2>
            <div className="mt-4 h-1 w-14 rounded bg-p2" />
            <p className="mt-6 text-[17px] leading-[1.8] text-p3">
              Beyond manufacturing, we work as a dependable blister packaging supplier for businesses that need
              consistent quality and steady supply. Whether you are a small bakery, a growing cosmetic brand or a large
              FMCG company, we supply blister trays in the quantity and specification you need, with clear
              communication from enquiry to dispatch.
            </p>
            <ul className="mt-7 flex flex-wrap gap-3">
              {SUPPLIER_POINTS.map((t) => (
                <li key={t} className="flex items-center gap-2 rounded-full border border-p5 px-4 py-2 text-p1">
                  <Icon name="checkCircle" size="18" className="text-p2" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="anim-fade-up relative overflow-hidden rounded-[40px] bg-p1 p-8 text-white shadow-[0_20px_50px_rgba(40,75,99,0.25)] md:p-10">
            <span className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-p2/40" aria-hidden="true" />
            <span className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-white/5" aria-hidden="true" />
            <div className="relative">
              <h3 className="text-[26px] font-extrabold text-white md:text-[30px]">Get a Quote Today</h3>
              <p className="mt-3 leading-[1.75] text-p5">
                Looking for a reliable blister packaging manufacturer and supplier? Share your product size or sample
                with HB Packaging and our team will suggest the best tray design and quote.
              </p>
              <ul className="mt-7 space-y-5">
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-p2">
                    <Icon name="mapMarkerAlt" size="18" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold uppercase tracking-wider text-p5">Address</span>
                    Plot No. E-31, Sector-2, Industrial Area, Bawana, Delhi – 110039
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-p2">
                    <Icon name="phoneAlt" size="18" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold uppercase tracking-wider text-p5">Phone</span>
                    <span className="flex flex-wrap gap-x-3 gap-y-1">
                      {CONTACT.phones.map((p) => (
                        <a key={p.tel} href={`tel:+${p.tel}`} className="whitespace-nowrap hover:text-[#fff3bf]">
                          {p.label}
                        </a>
                      ))}
                    </span>
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-p2">
                    <Icon name="envelope" size="18" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold uppercase tracking-wider text-p5">Email</span>
                    <a href={`mailto:${CONTACT.email}`} className="hover:text-[#fff3bf]">
                      {CONTACT.email}
                    </a>
                  </span>
                </li>
              </ul>
              <Link href="/contact-us" className="btn mt-8 !shadow-none">
                <Icon name="arrowCircleRight" />
                Get a Quote
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQs (accordion + FAQPage schema both come from content.homeFaq) */}
      <section className="bg-cream py-[60px] lg:py-[80px]">
        <Container>
          <Html
            html={content.homeFaq}
            className="anim-fade-up [&>h2]:mb-8 [&>h2]:text-center [&>h2]:after:mx-auto"
          />
        </Container>
      </section>
    </>
  );
}
