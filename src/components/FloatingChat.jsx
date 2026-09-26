"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";
import { WHATSAPP_URL } from "@/lib/site";

/* Floating buttons: WhatsApp chat on the bottom-left, rocket "back to top" on the bottom-right */
export default function FloatingChat() {
  const [seen, setSeen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        onClick={() => setSeen(true)}
        className="fixed bottom-[25px] left-[25px] z-[90] grid h-[60px] w-[60px] place-items-center rounded-full bg-[#49E670] text-white shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition-transform hover:scale-110"
      >
        <Icon name="whatsapp" size="32" />
        {!seen && (
          <span className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-[#dd0000] text-[11px] font-bold text-white">
            1
          </span>
        )}
      </a>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`fixed bottom-[25px] right-[25px] z-[90] grid h-[60px] w-[60px] place-items-center rounded-full bg-[#F2B01E] text-white shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 ${
          showTop ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <Icon name="rocket" size="26" className="-rotate-45" />
      </button>
    </>
  );
}
