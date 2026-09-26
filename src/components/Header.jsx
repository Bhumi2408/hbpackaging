"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Icon from "./Icon";
import { CONTACT, NAV } from "@/lib/site";

function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

// A menu item with a dropdown is active on its own page and on any page inside the dropdown
function isItemActive(pathname, item) {
  return isActive(pathname, item.href) || (item.children || []).some((c) => pathname === c.href);
}

// The desktop menu has no "Contact Us" item — that is the big button on the right
const DESKTOP_NAV = NAV.filter((item) => item.href !== "/contact-us/");

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  // Hides the desktop dropdown right after a product is clicked, until the mouse leaves the menu item
  const [dropdownClosed, setDropdownClosed] = useState(false);

  // Close the mobile menu after navigating
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setSubOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="relative z-40 -mb-10 lg:-mb-[50px]">
      {/* Blue band runs down to the middle of the white nav pill */}
      <div className="absolute inset-x-0 top-0 h-[calc(100%-40px)] bg-p1 lg:h-[calc(100%-50px)]" aria-hidden="true" />

      {/* Top contact bar */}
      <div className="relative flex items-center justify-center px-4 pb-3 pt-4 text-[15px] text-white lg:pb-[14px] lg:pt-[25px] lg:text-base">
        <div className="flex flex-col items-center gap-1 text-center text-sm md:flex-row md:gap-[50px]">
          <p className="flex flex-wrap items-center justify-center gap-x-1.5">
            <Icon name="phoneAlt" size="0.80em" className="mr-1" />
            {CONTACT.phones.map((p, i) => (
              <span key={p.tel}>
                <a href={`tel:${p.tel}`} className="transition-colors hover:text-[#fff3bf]">
                  {p.label}
                </a>
                {i < CONTACT.phones.length - 1 && ","}
              </span>
            ))}
          </p>
          <p className="flex items-center gap-2.5">
            <Icon name="envelope" size="0.80em" />
            <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-[#fff3bf]">
              {CONTACT.email}
            </a>
          </p>
        </div>
      </div>

      {/* Main navigation pill (rounded 50px), half over the band and half over the section below */}
      <div className="relative px-4">
        <div className="mx-auto flex h-20 max-w-[1100px] items-center justify-between rounded-[50px] bg-white px-6 lg:h-[80px] lg:px-[54px]">
          <Link href="/" aria-label="HB Packaging home" className="shrink-0">
            <Image
              src="/logo.png"
              alt="HB Packaging"
              width={546}
              height={277}
              priority
              className="h-11 w-auto lg:h-[70px]"
            />
          </Link>

          <nav aria-label="Main" className="hidden h-full ml-10 lg:block">
            <ul className="flex h-full items-center gap-12 xl:gap-[90px]">
              {DESKTOP_NAV.map((item) => {
                const active = isItemActive(pathname, item);
                return (
                  <li
                    key={item.href}
                    className="group relative flex h-full items-center"
                    onMouseLeave={item.children ? () => setDropdownClosed(false) : undefined}
                  >
                    <Link
                      href={item.href}
                      className={`relative flex items-center gap-3 font-menu text-base font-bold capitalize transition-colors hover:text-p2 ${
                        active ? "text-p2" : "text-p1"
                      }`}
                    >
                      {item.label}
                      {item.children ? (
                        <Icon name="chevronDown" size="0.55em" />
                      ) : (
                        <span
                          className={`absolute -bottom-3 left-0 h-0.5 bg-p2 transition-all duration-300 ${
                            active ? "w-full" : "w-0 group-hover:w-full"
                          }`}
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                    {item.children && (
                      <ul
                        className={`invisible absolute left-1/2 top-full z-50 w-[300px] -translate-x-1/2 translate-y-2 overflow-hidden rounded-[10px] bg-white py-2 opacity-0 shadow-[0_10px_20px_rgba(41,51,61,0.1)] transition-all duration-200 ${
                          dropdownClosed
                            ? ""
                            : "group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
                        }`}
                      >
                        {item.children.map((c) => {
                          const current = pathname === c.href;
                          return (
                            <li key={c.href}>
                              <Link
                                href={c.href}
                                aria-current={current ? "page" : undefined}
                                onClick={(e) => {
                                  setDropdownClosed(true);
                                  e.currentTarget.blur();
                                }}
                                className={`block border-l-4 px-5 py-2.5 font-menu text-base font-bold transition-colors hover:bg-p1 hover:text-white ${
                                  current ? "border-p2 bg-p5 text-p2" : "border-transparent text-p1"
                                }`}
                              >
                                {c.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <Link
            href="/contact-us/"
            className="ml-12 hidden h-[52px] w-[180px] shrink-0 items-center justify-center rounded-[50px] bg-p1 text-base text-white transition-colors hover:bg-p2 lg:inline-flex"
          >
            Contact Us
          </Link>

          <button
            type="button"
            onClick={() => {
              setOpen(true);
              // On a product page, show the Products submenu already expanded
              setSubOpen(NAV.some((item) => item.children?.some((c) => c.href === pathname)));
            }}
            className="p-2 text-p1 lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Icon name="bars" size="24" />
          </button>
        </div>
      </div>

      {/* Mobile off-canvas */}
      <div
        className={`fixed inset-0 z-[100] bg-black/40 transition-opacity lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div
        className={`fixed right-0 top-0 z-[101] flex h-full w-[90vw] max-w-[500px] flex-col overflow-y-auto bg-p1 p-8 shadow-[0_0_70px_rgba(0,0,0,0.35)] transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="ml-auto p-2 text-white"
          aria-label="Close menu"
        >
          <Icon name="times" size="18" />
        </button>
        <ul className="mt-6 space-y-4">
          {NAV.map((item) => (
            <li key={item.href}>
              <div className="flex items-center justify-between">
                <Link href={item.href} className="text-xl font-bold text-white">
                  {item.label}
                </Link>
                {item.children && (
                  <button
                    type="button"
                    onClick={() => setSubOpen((v) => !v)}
                    className="p-2 text-white"
                    aria-label="Toggle products menu"
                    aria-expanded={subOpen}
                  >
                    <Icon
                      name="chevronDown"
                      size="14"
                      className={`transition-transform ${subOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                )}
              </div>
              {item.children && subOpen && (
                <ul className="mt-3 space-y-3 border-l border-white/20 pl-4">
                  {item.children.map((c) => (
                    <li key={c.href}>
                      <Link
                        href={c.href}
                        aria-current={pathname === c.href ? "page" : undefined}
                        className={`block rounded-md text-base font-bold ${
                          pathname === c.href ? "-ml-2 bg-white/15 px-2 py-1 text-white" : "text-white/80 hover:text-white"
                        }`}
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
