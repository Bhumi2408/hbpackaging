// /llms.txt — a plain-text guide to the site for AI assistants (format: https://llmstxt.org)
// Built from the same data as the pages, so it stays in sync with the content.
import { CONTACT, SITE_NAME, SITE_URL, WHATSAPP_URL } from "@/lib/site";
import { getPosts } from "@/lib/blog";
import content from "@/data/pageContent.json";
import productPages from "@/data/productPages.json";

export const dynamic = "force-static";

const url = (path) => `${SITE_URL}${path}`;

function productLines() {
  return Object.entries(productPages).map(([slug, page]) => {
    const items = page.sections
      .filter((s) => s.type === "product")
      .map((p) => `${p.name.trim()} (${p.price.replace(/\s+/g, " ").trim()})`);
    return `- [${page.heading}](${url(`/${slug}/`)}): ${page.description}${items.length ? ` Items: ${items.join("; ")}.` : ""}`;
  });
}

export function GET() {
  const m = content.meta;
  const posts = getPosts();

  const text = `# ${SITE_NAME}

> ${SITE_NAME} (HB Packaging and Trading) is a blister packaging manufacturer and supplier based in Bawana Industrial Area, Delhi, India. It makes food-grade PET/PVC plastic blister trays and boxes for biscuits, cookies, cakes, muffins, rusk, sweets, chips, toys and cosmetics, with custom sizes, bulk orders and pan-India delivery.

Key facts:
- Founded: 2022, in-house manufacturing using vacuum thermoforming
- Experience: 10+ years in blister packaging, 18,000+ projects delivered
- Materials: food-grade, BPA-free PET and PVC plastic; thickness options 1mm to 4mm
- Customization: tray size, shape, cavity/compartment count, depth and thickness made to order
- Typical pricing: about ₹180–₹210 per kg for biscuit trays; some trays are priced per piece (see products below). Minimum order for most per-piece trays is 5,000 pieces
- Delivery: across India from Delhi; also exports to Nepal
- Quotes: by phone or WhatsApp, usually the same day

## Contact

- Phone: ${CONTACT.phones.map((p) => p.label).join(", ")}
- WhatsApp: ${WHATSAPP_URL}
- Email: ${CONTACT.email}
- Address: ${CONTACT.address}
- [Contact page](${url("/contact-us/")}): enquiry form, phone numbers and map

## Main pages

- [Home](${url("/")}): ${m.home.description}
- [About us](${url("/about-us/")}): ${m["about-us"].description}
- [All products](${url("/products/")}): ${m.products.description}
- [Contact us](${url("/contact-us/")}): Phone, email, address and enquiry form.

## Products

${productLines().join("\n")}

## Blog

${posts.map((p) => `- [${p.heading}](${url(`/${p.slug}/`)}): ${p.description}`).join("\n")}

## Optional

- [Blog index](${url("/blog/")}): ${m.blog.description}
- [Sitemap](${url("/sitemap.xml")}): Full list of page URLs
`;

  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
