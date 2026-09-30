import Link from "next/link";

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-p5 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-8 sm:p-12 text-center shadow-xl">

        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-p5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-10 w-10 text-p1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-p2">
          Thank You
        </p>

        <h1 className="mb-4 text-3xl font-bold text-p1 sm:text-5xl">
          Your Enquiry Has Been Submitted
        </h1>

        <p className="mx-auto max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
          Thank you for contacting HB Packaging.
          We have received your enquiry successfully.
          Our team will get in touch with you shortly.
        </p>

        <Link
          href="/"
          className="mt-8 inline-block rounded-[3px] bg-p3 px-7 py-3 font-semibold text-white transition-colors hover:bg-p4"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}