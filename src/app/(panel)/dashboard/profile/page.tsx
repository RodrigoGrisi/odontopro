import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import { getUserData } from "./_data-acesses/get-info-user";

export default async function Profile() {
  const session = await getSession();
  if (!session) redirect("/");

  const user = await getUserData({ userId: session.user.id });
  if (!user) redirect("/");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Perfil - {session.user.name}</h1>
      <p className="mt-4 text-lg">Esta é a página de perfil.</p>
    </div>
  );
}
