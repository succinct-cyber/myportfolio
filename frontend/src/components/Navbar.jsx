"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const active = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  // Plain text links: no box. The active page gets a thin underline; others draw it on hover.
  const linkCls = (on) =>
    `relative w-fit py-1 font-mono text-[11px] uppercase tracking-wider transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:bg-charcoal after:transition-transform after:duration-300 ${
      on
        ? "text-charcoal after:scale-x-100"
        : "text-charcoal/65 hover:text-charcoal after:scale-x-0 hover:after:scale-x-100"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-charcoal/10 bg-ivory/85 backdrop-blur print:hidden">
      <div className="container-x flex h-[72px] items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr]">
        {/* Logo: mark + spaced name, no box */}
        <Link href="/" aria-label="Yomi Fabiyi — home" className="group flex items-center gap-3 justify-self-start">
          <Image
            src="/yomi-fabiyi-mark.svg"
            alt=""
            width={50}
            height={40}
            priority
            className="h-10 w-auto transition-transform duration-300 group-hover:-rotate-3"
          />
          <span className="font-sans text-[13px] font-medium uppercase tracking-[0.2em] text-charcoal">
            Yomi Fabiyi
          </span>
        </Link>

        {/* Desktop nav: centered, wide spacing, no container */}
        <nav aria-label="Primary" className="hidden items-center gap-12 lg:flex xl:gap-14">
          {links.map((l) => (
            <Link key={l.href} href={l.href} aria-current={active(l.href) ? "page" : undefined} className={linkCls(active(l.href))}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 justify-self-end">
          {/* Resume: solid black, like the Contact button in the reference */}
          <Link
            href="/resume"
            aria-current={active("/resume") ? "page" : undefined}
            className="hidden rounded-sm bg-charcoal px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-wider text-ivory transition duration-300 hover:-translate-y-0.5 hover:bg-olive lg:inline-block"
          >
            Resume
          </Link>
          <button
            className="rounded-sm border border-charcoal/15 p-2 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Mobile" className="container-x flex flex-col gap-5 border-t border-charcoal/10 py-5 lg:hidden">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className={linkCls(active(l.href))}>
              {l.label}
            </Link>
          ))}
          <Link href="/resume" onClick={() => setOpen(false)} className="w-fit rounded-sm bg-charcoal px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-wider text-ivory">
            Resume
          </Link>
        </nav>
      )}
    </header>
  );
}