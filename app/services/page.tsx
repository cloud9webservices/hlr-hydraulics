import { client } from "@/lib/sanity";

async function getServices() {
  return await client.fetch(`*[_type == "service"]`);
}
export default async function ServicesPage() {
  const services = await getServices();

  return (
    <main className="p-10 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Our Services
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((service: any) => (
          <div
            key={service._id}
            className="border rounded-xl p-6 shadow-sm hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">
              {service.title}
            </h2>

            <p className="text-gray-600">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}