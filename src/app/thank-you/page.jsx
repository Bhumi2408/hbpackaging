import Link from "next/link";
import Icon from "@/components/Icon";
import { CONTACT, WHATSAPP_URL } from "@/lib/site";

// Shown after a successful contact-form submission; kept out of search results
export const metadata = {
  title: { absolute: "Thank You - HB Packaging" },
  description: "Thank you for contacting HB Packaging. Our team will get in touch with you shortly.",
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-cream px-4 pb-16 pt-[90px] lg:pt-[110px]">
      <div className="anim-fade-up w-full max-w-2xl rounded-[40px] bg-white p-8 text-center shadow-[0_10px_40px_rgba(40,75,99,0.12)] sm:p-12">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-p5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-10 w-10 text-p1"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-p2">Thank You</p>

        <h1 className="mb-4 text-3xl font-bold text-p1 sm:text-5xl">Your Enquiry Has Been Submitted</h1>

        <p className="mx-auto max-w-xl text-base leading-7 text-p3 sm:text-lg">
          Thank you for contacting HB Packaging. We have received your enquiry successfully. Our team will get in
          touch with you shortly.
        </p>

        <p className="mt-6 text-p3">Need a faster reply? Call or WhatsApp us:</p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-[50px] bg-[#25D366] px-6 py-3 font-semibold text-white transition-transform hover:scale-105"
          >
            <Icon name="whatsapp" /> WhatsApp Us
          </a>
          <a
            href={`tel:${CONTACT.phones[0].tel}`}
            className="inline-flex items-center gap-2 rounded-[50px] border-2 border-p1 px-6 py-3 font-semibold text-p1 transition-colors hover:bg-p1 hover:text-white"
          >
            <Icon name="phoneAlt" /> {CONTACT.phones[0].label}
          </a>
        </div>

        <Link
          href="/"
          className="mt-8 inline-block rounded-[3px] bg-p3 px-7 py-3 font-semibold text-white transition-colors hover:bg-p4"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
