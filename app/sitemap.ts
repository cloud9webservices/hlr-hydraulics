export default async function sitemap() {
  const baseUrl = "https://hlrhydraulics.com";

  const pages = [
    { url: "/", lastModified: new Date() },
    { url: "/services", lastModified: new Date() },
    { url: "/contact", lastModified: new Date() },
  ];

  return pages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: page.lastModified,
  }));
}