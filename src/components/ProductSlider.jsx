"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Icon from "./Icon";

/* Product photo slider: arrows, dots and touch swipe; fills the product block's image frame.
   A slide with fit: "contain" is shown whole on white instead of cropped to fill the frame. */
export default function ProductSlider({ slides, priority = false }) {
  const [active, setActive] = useState(0);
  const touchX = useRef(null);
  const count = slides.length;

  const go = (i) => setActive((i + count) % count);

  function onTouchEnd(e) {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
  }

  return (
    <div
      className="group relative h-full w-full"
      role="region"
      aria-roledescription="carousel"
      aria-label="Product images"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={onTouchEnd}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(active - 1);
        if (e.key === "ArrowRight") go(active + 1);
      }}
    >
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {slides.map((s, i) => (
          <div
            key={s.src}
            className="relative h-full w-full shrink-0 bg-white"
            aria-hidden={i !== active}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              sizes="(max-width: 767px) 100vw, 550px"
              className={s.fit === "contain" ? "object-contain p-3" : "object-cover"}
              priority={priority && i === 0}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => go(active - 1)}
        aria-label="Previous image"
        className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-p1 shadow-md transition hover:bg-p2 hover:text-white md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
      >
        <Icon name="chevronDown" size="16" className="rotate-90" />
      </button>
      <button
        type="button"
        onClick={() => go(active + 1)}
        aria-label="Next image"
        className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-p1 shadow-md transition hover:bg-p2 hover:text-white md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
      >
        <Icon name="chevronDown" size="16" className="-rotate-90" />
      </button>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/25 px-3 py-2 backdrop-blur-sm">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => go(i)}
            aria-label={`Show image ${i + 1}`}
            aria-current={i === active}
            className={`h-2.5 rounded-full transition-all ${i === active ? "w-6 bg-white" : "w-2.5 bg-white/60 hover:bg-white"}`}
          />
        ))}
      </div>
    </div>
  );
}
