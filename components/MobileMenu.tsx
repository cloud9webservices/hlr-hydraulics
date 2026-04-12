"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileMenu({ settings }: any) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger */}
      <button
        className="md:hidden flex flex-col gap-1"
        onClick={() => setOpen(true)}
      >
        <span className="w-6 h-0.5 bg-black"></span>
        <span className="w-6 h-0.5 bg-black"></span>
        <span className="w-6 h-0.5 bg-black"></span>
      </button>

      {/* OVERLAY (always rendered for animation) */}
      <div
        className={`
          fixed inset-0 bg-white z-50 flex flex-col items-center justify-center gap-8 text-xl
          transition-all duration-300 ease-in-out
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      >
        {/* Close */}
        <button
          className="absolute top-6 right-6 text-2xl"
          onClick={() => setOpen(false)}
        >
          ✕
        </button>

        <Link href="/services" onClick={() => setOpen(false)}>
          Services
        </Link>

        <Link href="/about" onClick={() => setOpen(false)}>
          About
        </Link>

        <Link href="/contact" onClick={() => setOpen(false)}>
          Contact
        </Link>

        {settings?.phone && (
          <a
            href={`tel:${settings.phone}`}
            className="btn-custom"
            onClick={() => setOpen(false)}
          >
            Call Now
          </a>
        )}
      </div>
    </>
  );
}