import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getUserData } from "./_data-access/get-info-user"
import { ProfileContent } from "./_components/profile"

export default async function Profile() {
  const session = await getServerSession(authOptions);

  if (!session) {
    console.log("Sem sessão, redirecionando pra /");
    redirect("/");
  }

  const user = await getUserData({ userId: session.user.id });

  if (!user) {
    console.log("Usuário não encontrado, redirecionando pra /");
    redirect("/dashboard");
  }

  return <ProfileContent user={user?? null} />;
}