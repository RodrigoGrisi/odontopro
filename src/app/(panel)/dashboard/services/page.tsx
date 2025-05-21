import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { ServiceContent } from "./_components/service-content";
import { getAllServices } from "./_data-access/get-all-services";

export default async function Service() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/");

  const services = await getAllServices({ userId: session.user.id });

  return (
    <section className="flex flex-col h-screen w-full p-4 space-y-4 overflow-y-auto">
      <ServiceContent userId={session.user.id} />

    </section>
  );
}
