import { Container, Html, JsonLd, PageHeader, ProductGrid } from "@/components/Sections";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import content from "@/data/pageContent.json";
import { extractFaqs } from "@/lib/faq";
import { faqSchema, productCategoryListSchema } from "@/lib/schema";
import { PRODUCT_GRID } from "@/lib/site";

const meta = content.meta.products;

export const metadata = pageMetadata({
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  path: "/products/",
  image: "/products/biscuit-packaging.jpg",
});

const faqLd = faqSchema(extractFaqs(content.productsSeo));

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema("Products", "/products/")} />
      <JsonLd data={productCategoryListSchema(PRODUCT_GRID)} />
      {faqLd && <JsonLd data={faqLd} />}
      <PageHeader title="Products" />

      <section className="py-[50px] px-5 lg:px-14">
     
          <ProductGrid />
      </section>

      <section className="bg-cream py-[60px]">
        <Container className="max-w-[1100px]">
          <div className="rounded-[40px] bg-white px-6 py-10 shadow-[0_10px_40px_rgba(40,75,99,0.08)] md:px-14 md:py-14">
            <Html html={content.productsSeo} />
          </div>
        </Container>
      </section>
    </>
  );
}
