"use client";

import { useState } from "react";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

const inputCls =
  "w-full rounded-[3px] border border-[#c9c9c9] bg-white px-4 py-1 text-p4 outline-none transition-colors placeholder:text-[#8a8a8a] focus:border-p2 focus:ring-2 focus:ring-p2/20";

/* Contact form (same fields as the original site), delivered by email through Web3Forms */
export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;

    if (!ACCESS_KEY) {
      setStatus("error");
      setError("Form is not configured yet. Please call or WhatsApp us instead.");
      return;
    }

    const data = new FormData(form);
    const name = `${data.get("first_name")} ${data.get("last_name")}`.trim();
    data.append("access_key", ACCESS_KEY);
    data.append("name", name);
    data.append("subject", `New enquiry from ${name} - hbpackaging.in`);
    data.append("from_name", "HB Packaging Website");

    setStatus("sending");
    setError("");
    try {
      const res = await fetch(WEB3FORMS_URL, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Something went wrong.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-[28px]">
      {/* Honeypot for spam bots (Web3Forms ignores submissions where this is checked) */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="grid gap-[20px] sm:grid-cols-2 sm:gap-5">
        <label className="block">
          <span className="sr-only">First Name</span>
          <input name="first_name" required placeholder="First Name" className={inputCls} autoComplete="given-name" />
        </label>
        <label className="block">
          <span className="sr-only">Last Name</span>
          <input name="last_name" required placeholder="Last Name" className={inputCls} autoComplete="family-name" />
        </label>
      </div>
      <label className="block">
        <span className="sr-only">Email</span>
        <input name="email" type="email" required placeholder="Email" className={inputCls} autoComplete="email" />
      </label>
      <label className="block">
        <span className="sr-only">Mobile Number</span>
        <input
          name="mobile"
          type="tel"
          required
          placeholder="Mobile Number"
          pattern="[0-9+\-\s]{10,15}"
          title="Enter a valid mobile number"
          className={inputCls}
          autoComplete="tel"
        />
      </label>
      <label className="block">
        <span className="sr-only">Message</span>
        <textarea name="message" required rows={5} placeholder="Message" className={`${inputCls} resize-y`} />
      </label>

      <div className="space-y-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-[3px] bg-p3 px-[22px] py-1 text-[20px] text-white transition-colors hover:bg-p4 disabled:cursor-wait disabled:opacity-70"
        >
          {status === "sending" ? "Sending..." : "Submit"}
        </button>
        {status === "success" && (
          <p className="rounded-lg bg-p5 px-4 py-3 font-medium text-p1" role="status">
            Thanks for contacting us! We will be in touch with you shortly.
          </p>
        )}
        {status === "error" && (
          <p className="rounded-lg bg-red-50 px-4 py-3 font-medium text-red-700" role="alert">
            {error}
          </p>
        )}
      </div>
    </form>
  );
}
