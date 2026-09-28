import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { Container, JsonLd, ProductGrid, WhyChooseUs } from "@/components/Sections";
import { pageMetadata } from "@/lib/seo";
import content from "@/data/pageContent.json";
import { ORG_ID } from "@/lib/schema";

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

export default function Home() {
  return (
    <>
      <JsonLd data={SERVICE_LD} />
      {/* Hero */}
      <section className="bg-cream pb-[25px] pt-[65px] lg:pt-[75px]">
        <Container className="grid items-center gap-8 md:grid-cols-2">
          <div className="anim-fade-up py-8">
            <h1>
              <span className="block text-[40px] font-black leading-tight text-p1 md:text-[55px]">Make The Best</span>
              <span className="-mt-2 block text-[42px] font-black leading-tight text-p2 md:-mt-5 md:text-[70px]">
                Packaging
              </span>
            </h1>
            <p className="my-6 text-p3">
              We are a leading blister packaging manufacturer and blister packaging supplier, offering expensive,
              long-lasting, and able to change packaging options. Our products serve a range of sectors and guarantee
              creative and affordable packaging to keep and present your goods
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

      <WhyChooseUs text="As a leading blister packaging manufacturer and blister packaging supplier, We provide creative, long-term, and environmentally responsible packaging options." />

      {/* Popular Product */}
      <section className="py-[50px] bg-cream">
        <Container>
          <h2 className="mb-8 text-center text-[32px] font-extrabold text-p1 md:text-[40px]">Popular Product</h2>
          <ProductGrid />
        </Container>
      </section>
    </>
  );
}
