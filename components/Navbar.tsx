import Link from "next/link";
import Image from "next/image";
import { client } from "@/lib/sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

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
    <nav className="flex justify-between items-center p-6 border-b">
      {settings?.logo && (
        <Link href="/">
          <Image
            src={urlFor(settings.logo).width(200).url()}
            alt={settings.title}
            width={200}
            height={60}
          />
        </Link>
      )}

      <div className="space-x-6">
        <Link href="/services">Services</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
         <a href={`tel:${settings.phone}`} className="btn-custom">
              call now
          </a>
      </div>
    </nav>
  );
}