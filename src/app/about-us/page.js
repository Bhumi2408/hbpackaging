import Image from "next/image";
import Icon from "@/components/Icon";
import { Container, Html, JsonLd, PageHeader, WhyChooseUs } from "@/components/Sections";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import content from "@/data/pageContent.json";

const meta = content.meta["about-us"];

export const metadata = pageMetadata({
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  path: "/about-us/",
  image: "/about.jpg",
});

const SERVICES = [
  { icon: "cogs", title: "Product Assembly", text: "Streamlined Solutions" },
  { icon: "lightbulbO", title: "Branding Support", text: "Elevate Identity" },
  { icon: "boxOpen", title: "Custom Packaging", text: "Tailored Designs" },
];

const QUALITIES = [
  { icon: "thumbsUpO", title: "Best Quality", text: "Our packaging uses premium materials to ensure top-notch quality and protection for your products." },
  { icon: "lightbulb", title: "Creative Design", text: "We create unique and visually appealing packaging that enhances your brand's identity." },
  { icon: "userFriends", title: "Eco-Friendly", text: "Our eco-friendly packaging options help reduce environmental impact while maintaining product safety." },
];

// "Key Highlights" block from the original page (everything after the image)
const highlights = content.about[1].split(/<img[^>]*>/)[1];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema("About us", "/about-us/")} />
      <PageHeader title="About us"/>

      <section className="bg-p1 py-[50px] rounded-[50px]">
      
          <Html html={content.about[0]} className="anim-fade-up px-5 lg:px-20 text-white [&_h2]:text-white [&_h2]:text-[35px] [&_h2]:font-semibold" />
      </section>

      <WhyChooseUs
        learnMoreHref="/contact-us/"
        text="We deliver durable, eco-friendly blister packaging solutions with a focus on quality, innovation, and customer satisfaction. Trust us for reliability and excellence in every product."
      />

      {/* Other Services + qualities (left) | image + key highlights (right) */}
      <section className="bg-cream py-[30px] lg:py-[60px]">
        <div className="mx-auto grid items-start gap-7 px-4 lg:grid-cols-[547fr_1079fr] lg:gap-[60px] lg:px-[80px]">
          <div className="space-y-9">
            <div className="anim-fade-up rounded-[50px] bg-p2 px-6 py-10 text-center lg:px-6 lg:pb-6 lg:pt-6">
              <h4 className="text-[18px] font-bold text-white lg:text-[20px]">Other Services</h4>
              <p className="mt-5 leading-[1.65] text-white">
                “Discover Our End-to-End Packaging Solutions
                <br />
                for Every Business Need”
              </p>
              <div className="mt-7 space-y-5">
                {SERVICES.map((s) => (
                  <div key={s.title} className="flex items-center gap-5 rounded-[90px] bg-cream py-[15px] pl-[15px] pr-6 text-left">
                    <span className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full bg-p1 text-white">
                      <Icon name={s.icon} size="25" />
                    </span>
                    <div>
                      <h5 className=" font-black tracking-wide text-p1 lg:text-[20px]">{s.title}</h5>
                      <p className=" text-p3">{s.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {QUALITIES.map((q) => (
              <div key={q.title} className="anim-fade-up rounded-[50px] bg-p1 px-8 pb-6 pt-6 text-white lg:px-[34px]">
                <span className="grid h-[60px] w-[60px] place-items-center rounded-full bg-white text-p1">
                  <Icon name={q.icon} size="30" />
                </span>
                <h4 className="mt-3 text-[20px] font-bold text-white lg:text-[25px]">{q.title}</h4>
                <p className="mt-1 leading-[1.65]">{q.text}</p>
              </div>
            ))}
          </div>

          <div>
            <div className="anim-fade relative aspect-[1079/630] overflow-hidden rounded-[50px]">
              <Image
                src="/about.jpg"
                alt="About Us"
                fill
                sizes="(max-width: 1024px) 100vw, 1080px"
                className="object-cover"
              />
            </div>
            <Html
              html={highlights}
              className="anim-fade-up mt-12 [&_h4]:text-[25px] [&_h4]:font-black [&_h4]:leading-[1.2] [&_h4]:tracking-normal lg:[&_h4]:text-[35px] [&_li_p:first-child]:font-bold [&_strong]:font-bold [&_li_p:first-child]:text-p3 [&_li_p+p]:mt-6 [&_ul]:mt-8"
            />
          </div>
        </div>
      </section>
    </>
  );
}
