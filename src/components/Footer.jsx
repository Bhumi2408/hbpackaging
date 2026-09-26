import Link from "next/link";
import Icon from "./Icon";
import { CONTACT, FOOTER_LINKS, FOOTER_PRODUCTS } from "@/lib/site";

function LinkList({ title, links }) {
  return (
    <div>
      <h5 className="mb-4 text-lg font-bold text-white">{title}</h5>
      <ul className="space-y-[5px]">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="flex items-center gap-2 text-white transition-colors hover:text-[#fff3bf]">
              <Icon name="angleDoubleRight" size="12" />
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-p6">
      <div className="rounded-t-[50px] bg-navy px-4 py-[50px]">
        <div className="mx-auto grid max-w-[1140px] gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.4fr]">
          <div>
            <h2 className="mb-4 text-[28px] font-bold text-white">HB Packaging</h2>
            <p className="text-white">
              We specialize in providing durable, customizable, and cost-effective packaging solutions designed to
              meet the diverse needs of our clients across various industries.
            </p>
          </div>

          <LinkList title="Products" links={FOOTER_PRODUCTS} />
          <LinkList title="Quick Links" links={FOOTER_LINKS} />

          <div>
            <h5 className="mb-4 text-lg font-bold capitalize text-white">locations</h5>
            <ul className="space-y-3 text-white">
              <li className="flex gap-3">
                <Icon name="mapMarkerAlt" size="16" className="mt-1 shrink-0" />
                <span>{CONTACT.address}</span>
              </li>
              <li className="flex gap-3">
                <Icon name="phoneAlt" size="16" className="mt-1 shrink-0" />
                <span className="flex flex-col">
                  {CONTACT.phones.map((p) => (
                    <a key={p.tel} href={`tel:${p.tel}`} className="hover:text-[#fff3bf]">
                      {p.label}
                    </a>
                  ))}
                </span>
              </li>
              <li className="flex gap-3">
                <Icon name="envelope" size="16" className="mt-1 shrink-0" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-[#fff3bf]">
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mx-auto max-w-[1140px] py-[26px]">
          <div className="divider-tribal" />
        </div>

        <p className="text-center text-[15px] text-white">
          Copyright © {new Date().getFullYear()} HB Packaging | Powered by <Link href="https://www.cybertricksmedia.com/" target="_blank">Cybertricksmedia Pvt Ltd</Link>
        </p>
      </div>
    </footer>
  );
}
