// components/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import { client } from "@/lib/sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

// Sanity image builder
const builder = createImageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

export default async function Footer() {
  // Fetch site settings
  const settings = await client.fetch(`
    *[_type == "siteSettings"][0]{
      title,
      tagline,
      logo,
      phone,
      email, 
      address
    }
  `);

  return (
    <footer className="border-t  border-gray-800 text-white py-10 md:py-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row justify-between gap-10">
        {/* Logo & Title */}
        <div className="flex flex-col items-start md:items-start flex-1">
          {settings?.logo && (
            <Link href="/">
              <Image
                src={urlFor(settings.logo).width(180).url()}
                alt={settings.title || "Site Logo"}
                width={180}
                height={60}
                className="mb-3"
              />
            </Link>
          )}
          {settings.tagline && (
            <h6 className="text-gray-400 text-sm sm:text-base md:text-lg">
              {settings.tagline}
            </h6>
          )}
        </div>
          {/* Quick Links */}
        <div className="flex flex-col flex-1 gap-2 sm:gap-3  text-gray-300">
          <h6>Menu</h6>
          <Link
            href="/"
            className="hover:text-white text-sm sm:text-base md:text-lg"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="hover:text-white text-sm sm:text-base md:text-lg"
          >
            About
          </Link>
          <Link
            href="/services"
            className="hover:text-white text-sm sm:text-base md:text-lg"
          >
            Services
          </Link>
          <Link
            href="/contact"
            className="hover:text-white text-sm sm:text-base md:text-lg"
          >
            Contact
          </Link>
        
        </div>

        {/* Contact Info */}
        <div className="flex flex-col flex-1 gap-2 sm:gap-3  text-gray-300">
           <h6>Contact Us</h6>
          {settings.phone && (
            <a
              href={`tel:${settings.phone}`}
              className="hover:text-white text-sm sm:text-base md:text-lg"
            >
              📞 {settings.phone}
            </a>
          )}
          {settings.email && (
            <a
              href={`mailto:${settings.email}`}
              className="hover:text-white text-sm sm:text-base md:text-lg"
            >
              ✉️ {settings.email}
            </a>
          )}
          {settings.address && (
            <p className="text-sm sm:text-base md:text-lg">
              🏠 {settings.address}
            </p>
          )}
        </div>

    
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 md:mt-16 border-t border-gray-800 pt-6 text-center text-gray-500 text-xs sm:text-sm md:text-base">
        &copy; {new Date().getFullYear()} {settings.title}. All rights reserved.
      </div>
    </footer>
  );
}
