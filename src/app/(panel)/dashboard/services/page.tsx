import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { ServiceContent } from "./_components/service-content";
import { getAllServices } from "./_data-access/get-all-services";

export default async function Service() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/");

  const rawServices = await getAllServices({ userId: session.user.id });

  const services = rawServices?.data.map((service) => ({
    ...service,
    formattedPrice: (service.price / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    }),
  }));

  return (
    <section className="flex flex-col h-screen w-full p-4 space-y-4 overflow-y-auto">
      <ServiceContent userId={session.user.id} />

      {services?.map((service) => (
        <div
          key={service.id}
          className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
        >
          <h2 className="text-lg font-semibold">{service.name}</h2>
          <p className="text-gray-600">
            💰 Preço: {service.formattedPrice} - ⏱ Duração: {service.duration} minutos
          </p>
        </div>
      ))}
    </section>
  );
}
