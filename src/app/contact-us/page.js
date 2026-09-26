import Icon from "@/components/Icon";
import ContactForm from "@/components/ContactForm";
import { JsonLd, PageHeader } from "@/components/Sections";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { CONTACT } from "@/lib/site";
import content from "@/data/pageContent.json";

const meta = content.meta["contact-us"];

export const metadata = pageMetadata({
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  path: "/contact-us/",
});

const CARDS = [
  { icon: "phoneAlt", title: CONTACT.phones[0].label, sub: "Request Callback", href: `tel:${CONTACT.phones[0].tel}` },
  { icon: "mailBulk", title: CONTACT.email, sub: "Send a Mail", href: `mailto:${CONTACT.email}` },
  { icon: "mapMarkerAlt", title: CONTACT.address, sub: "Request Callback", href: `tel:${CONTACT.phones[1].tel}` },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema("Contact Us", "/contact-us/")} />
      <PageHeader title="Contact Us" />

      {/* Contact card: teal info panel | white form, sitting over the cream/white split */}
      <section className="bg-[linear-gradient(var(--cream)_0,var(--cream)_68px,#fff_68px)] px-4 pb-[60px] pt-[10px] lg:pt-[30px]">
        <div className="mx-auto grid max-w-[1000px] overflow-hidden rounded-[50px] bg-white shadow-[0_0_10px_rgba(0,0,0,0.25)] lg:grid-cols-2">
          <div className="anim-fade-up bg-p2 px-6 py-10 sm:px-8 lg:pb-14 lg:pt-11">
            <h4 className="text-[20px] font-bold text-white lg:text-[25px]">Get In Touch!!</h4>
            <p className="mt-3 max-w-[510px] leading-[1.4] text-white">
              For more information about our products or to send requests, comments and suggestions you can contact
              us at the following addresses:
            </p>
            <div className="mt-6 max-w-[460px] space-y-[18px]">
              {CARDS.map((c) => (
                <a
                  key={c.title}
                  href={c.href}
                  className="group flex items-center gap-[18px] rounded-[50px] bg-cream py-1 pl-[11px] pr-6 transition-transform hover:-translate-y-0.5"
                >
                  <span className="grid h-[50px] w-[50px] shrink-0 place-items-center rounded-full bg-p1 text-white transition-colors group-hover:bg-p4">
                    <Icon name={c.icon} size="22" />
                  </span>
                  <span className="py-1">
                    <span className="block text-[18px] font-bold leading-[1.55] text-p1 lg:text-[20px]">{c.title}</span>
                    <span className="block text-p3">{c.sub}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="anim-fade-up px-6 py-8 sm:px-11 lg:pt-[50px]">
            <ContactForm />
          </div>
        </div>
      </section>

      <section>
        <iframe
          src={CONTACT.mapEmbed}
          title="HB Packaging location - Bawana Industrial Area, Delhi"
          className="block h-[450px] w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </section>
    </>
  );
}
