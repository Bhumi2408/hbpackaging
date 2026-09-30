"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";

const ACCESS_KEY = "2cb92532-99dc-4714-8974-83094ccc72d0";

const inputCls =
  "w-full rounded-[3px] border border-[#c9c9c9] bg-white px-4 py-1 text-p4 outline-none transition-colors placeholder:text-[#8a8a8a] focus:border-p2 focus:ring-2 focus:ring-p2/20";

export default function ContactForm() {
  const router = useRouter();

  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;

    setStatus("sending");
    setError("");

    const data = new FormData(form);

    const name =
      `${data.get("first_name")} ${data.get("last_name")}`.trim();

    data.append("access_key", ACCESS_KEY);
    data.append("name", name);
    data.append(
      "subject",
      `New enquiry from ${name} - hbpackaging.in`
    );
    data.append("from_name", "HB Packaging Website");

    try {
      const res = await fetch(WEB3FORMS_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: data,
      });

      const json = await res.json();

      console.log("Web3Forms Response:", json);

      if (!res.ok || !json.success) {
        throw new Error(
          json.message || "Something went wrong. Please try again."
        );
      }

      form.reset();

      // Custom Thank You Page
      router.push("/thank-you");

    } catch (err) {
      console.error("Web3Forms Error:", err);

      setStatus("error");
      setError(
        err.message || "Something went wrong. Please try again."
      );
    }
  }



  return (
    <form onSubmit={onSubmit} className="space-y-[28px]">

      {/* Honeypot for spam bots */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid gap-[20px] sm:grid-cols-2 sm:gap-5">
        <label className="block">
          <span className="sr-only">First Name</span>
          <input
            name="first_name"
            required
            placeholder="First Name"
            className={inputCls}
            autoComplete="given-name"
          />
        </label>

        <label className="block">
          <span className="sr-only">Last Name</span>
          <input
            name="last_name"
            required
            placeholder="Last Name"
            className={inputCls}
            autoComplete="family-name"
          />
        </label>
      </div>

      <label className="block">
        <span className="sr-only">Email</span>
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className={inputCls}
          autoComplete="email"
        />
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
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Message"
          className={`${inputCls} resize-y`}
        />
      </label>

      <div className="space-y-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-[3px] bg-p3 px-[22px] py-1 text-[20px] text-white transition-colors hover:bg-p4 disabled:cursor-wait disabled:opacity-70"
        >
          {status === "sending" ? "Sending..." : "Submit"}
        </button>

        {status === "error" && (
          <p
            className="rounded-lg bg-red-50 px-4 py-3 font-medium text-red-700"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    </form>
  );
}