import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/image";
import Link from "next/link";

export default async function ContactPage() {
  const thispage = await client.fetch(
    `*[_type == "page" && _id == $id][0]{
      title,
      content,
      heroImage
    }`,
    {
      id: "f913ae72-ccfc-41ba-939b-bb36db6f53f3",
    },
    { cache: "no-store" },
  );
   const feature_photo = await client.fetch(
    `*[_type == "page" && _id == $id][0]{
      title,
      content,
      heroImage
    }`,
    {
      id: "bc07577e-c24c-4133-af6f-9d0f84b72474",
    },
    { cache: "no-store" },
  );
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
    <main className="flex flex-col">
      {/* HERO SECTION (IMAGE) */}
      {thispage?.heroImage && (
        <div className="w-full h-[400px] md:h-[500px] relative">
          <img
            src={urlFor(thispage.heroImage).url()}
            alt={thispage?.title || "Contact hero image"}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* CONTENT SECTION */}
      <section className="px-6 md:px-12 py-12">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          {/* LEFT INFO */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">
                {thispage?.title || "Contact Us"}
              </h1>

              <p className="text-gray-600 mt-4">
                {thispage?.content
                  ? "Reach out and we’ll get back to you as soon as possible."
                  : "Have a question or need a repair? We’re here to help."}
              </p>
            </div>

            <div className="space-y-4 text-gray-700">
              <div>
                <p className="font-semibold">Phone</p>
                <a href={`tel:${settings.phone}`} className="text-blue-600">
                  {settings.phone}
                </a>
              </div>

              <div>
                <p className="font-semibold">Email</p>
                <a href={`mailto:${settings.email}`} className="text-blue-600">
                  {settings.email}
                </a>
              </div>

              <div>
                <p className="font-semibold">Location</p>
                <p>
                  Unit 3 - 23 Robb Blvd
                  <br />
                  Orangeville, ON <br />
                  L9W 3L1{" "}
                </p>
              </div>

              <div>
                <p className="font-semibold">Shop Hours</p>
                <p>
                  Mon–Fri: 8am – 4pm
                  <br />
                </p>
              </div>
              <div>
                <p className="font-semibold">
                  Mobile repair service available 24/7{" "}
                </p>
              </div>
            </div>

            <a href={`tel:${settings.phone}`} className="btn-custom">
              call us today
            </a>
          </div>

          {/* RIGHT SIDE (REPLACED FORM → IMAGE/CONTENT AREA) */}
          <div className="flex items-center justify-center">
            {feature_photo?.heroImage && (
              <img
                src={urlFor(feature_photo.heroImage).url()}
                alt="Contact visual"
                className="w-full h-[350px] object-cover rounded-xl shadow-md"
              />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
