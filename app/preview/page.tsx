import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";

export default async function PreviewPage() {
  const thispage = await client.fetch(
    `*[_type == "page" && _id == $id][0]{
      title,
      content,
      heroImage
    }`,
    {
      id: "3208b0d3-2c2b-473d-9de2-26928b6cdd77",
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

  const who_we_are = await client.fetch(
    `*[_type == "page" && _id == $id][0]{
      title,
      content,
      heroImage
    }`,
    {
      id: "7246ecd8-e53d-4bfd-8de5-db0e0e4a1b48",
    },
    { cache: "no-store" },
  );
  const homepage_bullets_page = await client.fetch(
    `*[_type == "page" && _id == $id][0]{
      title,
      content,
      heroImage
    }`,
    {
      id: "46d1368a-39a6-4f84-8308-edf805888d5f",
    },
    { cache: "no-store" },
  );

  const components: PortableTextComponents = {
    list: {
      bullet: ({ children }) => (
        <ul className="flex flex-col md:flex-row justify-center flex-wrap mb-0! gap-3 p-0">
          {children}
        </ul>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        <li className="key_values">
          <h3 className="">{children}</h3>
          <div className="line"></div>
        </li>
      ),
    },
  };
  const homepage_services_page = await client.fetch(
    `*[_type == "page" && _id == $id][0]{
      title,
      content,
      heroImage
    }`,
    {
      id: "bda6d4c7-04c1-4801-bcac-77e67c990553",
    },
    { cache: "no-store" },
  );
  // const serviceComponents: PortableTextComponents = {
  //   list: {
  //     bullet: ({ children }) => (
  //       <div className="grid md:grid-cols-3 gap-6">{children}</div>
  //     ),
  //   },

  //   listItem: {
  //     bullet: ({ children }) => (
  //       <div className="homepage_single_service border rounded-xl shadow-sm hover:shadow-lg transition">
  //         <div>
  //           {homepage_services_page?.heroImage && (
  //             <img
  //               className="img-full"
  //               src={urlFor(homepage_services_page.heroImage).width(500).url()}
  //               alt={homepage_services_page?.title || "image"}
  //             />
  //           )}
  //         </div>
  //         <div className="p-6">
  //           <h4 className="mb-0">{children}</h4>
  //         </div>
  //       </div>
  //     ),
  //   },
  // };
  async function getServices() {
    return await client.fetch(`*[_type == "service"]`);
  }
  const services = await getServices();

  const homepage_location = await client.fetch(
    `*[_type == "page" && _id == $id][0]{
      title,
      content,
      heroImage
    }`,
    {
      id: "7967e120-78d1-4148-8776-11b1ac0e3fe6",
    },
    { cache: "no-store" },
  );

  return (
    <main>
      <div id="hero_wrapper" className=" w-full">
        {/* hero image */}
        {thispage?.heroImage && (
          <img
            className="img-full"
            src={urlFor(thispage.heroImage).width(1200).url()}
            alt={thispage.title}
          />
        )}

        {/* cta section */}
        <div className="container-custom w-full flex flex-col items-center">
          <h2 className="text-white subheading text-center">
            {settings.tagline}
          </h2>

          <a href={`tel:${settings.phone}`} className="btn-custom">
            call us today
          </a>
        </div>
      </div>

      <div id="homepage_about">
        <div className="flex flex-col md:flex-row">
          <div className="content_wrapper md:flex md:flex-col md:justify-center p-6 md:p-10 lg:p-25 md:w-1/2">
            <h2>{who_we_are.title}</h2>
            <PortableText value={who_we_are.content} />
          </div>
          <div className="image_wrapper md:w-1/2">
            {who_we_are?.heroImage && (
              <img
                className="img-full"
                src={urlFor(who_we_are.heroImage).width(1200).url()}
                alt={who_we_are?.title || "image"}
              />
            )}
          </div>
        </div>
      </div>

      <div id="homepage_bullets">
        <div className="container-custom px-0!">
          <div className="content_wrapper md:flex md:flex-col md:justify-center p-6 md:px-10 lg:px-25 md:py-15">
            {/* <h2>{homepage_bullets_page.title}</h2> */}
            <PortableText
              value={homepage_bullets_page.content}
              components={components}
            />
          </div>
        </div>
      </div>
      <div id="homepage_services">
        <div className="container-custom px-0!">
          <div className="p-6 md:px-10 lg:px-25 md:py-15">
            <div className="subheading_wrapper">
              <h2>Our Services</h2>
              <div className="pb-6 button_wrapper_top">
                <Link className="btn-custom" href="/services">
                  See all services
                </Link>
              </div>
            </div>
           
            <div className="grid md:grid-cols-3 gap-6">
              {services.map((service: any) => (
                <div
                  key={service._id}
                  className="homepage_single_service border rounded-xl shadow-sm hover:shadow-lg transition"
                >
                  <div>
                    {service?.image && (
                    <img
                      className="img-full"
                      src={urlFor(service.image).width(500).url()}
                      alt={service?.title || "image"}
                    />
                  )}
                  </div>

                  <div className="p-6">
                    <h4 className="mb-0">{service.title}</h4>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 button_wrapper">
              <Link className="btn-custom" href="/services">
                See all services
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <div id="homepage_location">
        <div className="flex flex-col md:flex-row">
          <div className="image_wrapper md:w-1/2">
            {homepage_location?.heroImage && (
              <img
                className="img-full"
                src={urlFor(homepage_location.heroImage).width(1200).url()}
                alt={homepage_location?.title || "image"}
              />
            )}
          </div>
          <div className="content_wrapper md:flex md:flex-col md:justify-center p-6 md:p-10 lg:p-25 md:w-1/2">
            <h2>{homepage_location.title}</h2>
            <PortableText value={homepage_location.content} />
            <a
              href="https://www.google.com/maps/search/?api=1&query=23+Robb+Blvd+%233,+Orangeville,+ON+L9W+1L3"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-custom"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
