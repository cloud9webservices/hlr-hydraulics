import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/image";

export default async function PreviewPage() {
  const thispage = await client.fetch(
    `*[_type == "page" && _id == $id][0]{
      title,
      content,
      heroImage
    }`,
    {
      id: "3208b0d3-2c2b-473d-9de2-26928b6cdd77",
    }
  );
   const settings = await client.fetch(`
    *[_type == "siteSettings"][0]{
      title,
      tagline,
      logo
    }
  `);

  return (
    <main>
    
      <div id="hero_wrapper" className=" w-full">
        {/* hero image */}
        {thispage?.heroImage && (
          <img className="img-full"
            src={urlFor(thispage.heroImage).width(1200).url()}
            alt={thispage.title}
          />
        )}
        {/* logo from site settings */}
        {/* {settings?.logo && (
          <img className="hlr-logo center-absolute w-full"
            src={urlFor(settings.logo).width(1200).url()}
            alt={settings.title}
          />
        )} */}
        <div className="container-custom w-full ">
           <h2 className="text-white subheading text-center">{settings.tagline}</h2>
           </div>
      </div>
      
    </main>
  );
}