// app/components/Navbar.tsx (or wherever yours lives)

import Link from "next/link";
import Image from "next/image";
import { client } from "@/lib/sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import MobileMenu from "./MobileMenu";

const builder = createImageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

export default async function Navbar() {
  const settings = await client.fetch(`
    *[_type == "siteSettings"][0]{
      title,
      logo,
      phone
    }
  `);

  return (
    <nav id="navbar" className="border-b p-6 relative z-50">
      <div className="flex items-center justify-between">

        {/* LOGO */}
        {settings?.logo && (
          <Link href="/" className="main_logo flex items-center">
            <Image
              src={urlFor(settings.logo).width(200).url()}
              alt={settings?.title || "Logo"}
              width={200}
              height={60}
              priority
            />
          </Link>
        )}

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-6">
          <Link className="nav_link" href="/services">Services</Link>
          {/* <Link className="nav_link" href="/about">About</Link> */}
          <Link className="nav_link" href="/contact">Contact</Link>

          {settings?.phone && (
            <a href={`tel:${settings.phone}`} className="btn-custom">
              Call Now
            </a>
          )}
        </div>

        {/* MOBILE MENU BUTTON + OVERLAY */}
        <MobileMenu settings={settings} />
      </div>
    </nav>
  );
}