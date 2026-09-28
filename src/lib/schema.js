// Structured data (JSON-LD) builders. Every schema points back to the one Organization via ORG_ID.
import { CONTACT, SITE_NAME, SITE_URL } from "./site";

export const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const abs = (path) => (path?.startsWith("http") ? path : `${SITE_URL}${path}`);

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    legalName: "HB Packaging and Trading",
    url: `${SITE_URL}/`,
    logo: { "@type": "ImageObject", url: abs("/logo.png"), width: 512, height: 512 },
    image: abs("/home/banner-image.png"),
    description:
      "HB Packaging is a trusted Blister Packaging Manufacturer and Blister Packaging Supplier in India, offering durable, affordable and customized blister trays for food, bakery, cosmetic, toy and retail product packaging.",
    foundingDate: "2022",
    email: CONTACT.email,
    telephone: `+${CONTACT.phones[0].tel}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plot No. E-31, Sector - 2, Industrial Area, Bawana",
      addressLocality: "Delhi",
      addressRegion: "Delhi",
      postalCode: "110039",
      addressCountry: "IN",
    },
    contactPoint: CONTACT.phones.map((p) => ({
      "@type": "ContactPoint",
      telephone: `+${p.tel}`,
      contactType: "sales",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    })),
    areaServed: { "@type": "Country", name: "India" },
    knowsAbout: ["Blister packaging", "Blister trays", "Food packaging", "Thermoforming"],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    inLanguage: "en-US",
    publisher: { "@id": ORG_ID },
  };
}

// Only returns a schema when the page really shows FAQs
export function faqSchema(faqs) {
  if (!faqs?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

function textOf(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Spec table rows ("Material | PVC") → schema PropertyValue list
function specProperties(detailsHtml) {
  const rows = [...detailsHtml.matchAll(/<tr>([\s\S]*?)<\/tr>/g)];
  return rows
    .map((r) => [...r[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((c) => textOf(c[1])))
    .filter((cells) => cells.length === 2 && cells[0] && cells[1])
    .map(([name, value]) => ({ "@type": "PropertyValue", name, value }));
}

// "₹ 180/ Kg" → { price: "180", unit: "Kg" }
function parsePrice(text) {
  const m = (text || "").replace(/,/g, "").match(/([\d.]+)\s*\/?\s*([A-Za-z]+)?/);
  return m ? { price: m[1], unit: m[2] } : null;
}

export function productSchema(product, { pagePath, pageTitle, category }) {
  const details = (product.details || []).join(" ");
  const properties = specProperties(details);
  const paragraphs = textOf(details.replace(/<table[\s\S]*?<\/table>/g, " "));
  const description =
    paragraphs ||
    (properties.length
      ? `${product.name} by HB Packaging — ${properties.map((p) => `${p.name}: ${p.value}`).join(", ")}.`
      : `${product.name} manufactured by HB Packaging, Delhi.`);
  const price = parsePrice(product.price);
  const nextYearEnd = `${new Date().getFullYear() + 1}-12-31`;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: abs(product.image),
    description,
    category: category || pageTitle,
    brand: { "@type": "Brand", name: SITE_NAME },
    manufacturer: { "@id": ORG_ID },
    ...(properties.length && { additionalProperty: properties }),
    ...(price && {
      offers: {
        "@type": "Offer",
        url: abs(pagePath),
        priceCurrency: "INR",
        price: price.price,
        ...(price.unit && {
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: price.price,
            priceCurrency: "INR",
            unitText: price.unit,
          },
        }),
        priceValidUntil: nextYearEnd,
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
        seller: { "@id": ORG_ID },
      },
    }),
  };
}

// Products page: the list of product categories
export function productCategoryListSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Blister Tray Packaging Products",
    itemListElement: items.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      url: abs(p.href),
      image: abs(p.image),
    })),
  };
}
