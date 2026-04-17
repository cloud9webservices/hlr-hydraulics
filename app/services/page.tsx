import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/image";
import { PortableText } from "@portabletext/react";

async function getServices() {
  return await client.fetch(`*[_type == "service"]`);
}

export const metadata = {
  title: "Hydraulic Repair Services | HLR Hydraulics",
  description:
    "Expert 24/7 mobile hydraulic repair services in Orangeville and surrounding Ontario areas.",
};
export default async function ServicesPage() {
  const services = await getServices();

  const thispage = await client.fetch(
    `*[_type == "page" && _id == $id][0]{
      title,
      content,
      heroImage
    }`,
    {
      id: "5b00ffb9-92e3-4c71-8443-d117ed3bc008",
    },
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

  const service_page_cta = await client.fetch(
    `*[_type == "page" && _id == $id][0]{
      title,
      content,
      heroImage
    }`,
    {
      id: "4a4cdef2-0e11-4f2d-8f97-a84f090c8104",
    },
    { cache: "no-store" },
  );

  return (
    <main id="services_page">
      <div className="p-10 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-10! md:text-center">
          {thispage?.title}
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service: any) => (
            <div
              key={service._id}
              className="single_service border rounded-xl shadow-sm hover:shadow-lg transition"
            >
              <div className="services_image_wrapper">
                {service?.image && (
                  <img
                    className="img-full"
                    src={urlFor(service.image).width(500).url()}
                    alt={service?.title || "image"}
                  />
                )}
              </div>

              <div className="content_wrapper p-6">
                <div className="subheading_wrapper">
                  <h4 className="mb-0">{service.title}</h4>
                </div>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div id="service_page_cta">
        <div className="flex flex-col md:flex-row">
          <div className="image_wrapper md:w-1/2">
            {service_page_cta?.heroImage && (
              <img
                className="img-full"
                src={urlFor(service_page_cta.heroImage).width(1200).url()}
                alt={service_page_cta?.title || "image"}
              />
            )}
          </div>

          <div className="content_wrapper md:flex md:flex-col md:justify-center p-6 md:p-10 lg:p-25 md:w-1/2">
            <h2>{service_page_cta?.title}</h2>

            {service_page_cta?.content && (
              <PortableText value={service_page_cta.content} />
            )}

            <a href={`tel:${settings.phone}`} className="btn-custom">
            call us today
          </a>
        
          </div>
        </div>
      </div>
    </main>
  );
}
