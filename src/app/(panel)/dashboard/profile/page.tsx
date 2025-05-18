import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import { getUserData } from "./_data-acesses/get-info-user";
import ProfileContent from "@/app/(panel)/dashboard/profile/_components/profile";


export default async function Profile() {
  const session = await getSession();
  if (!session) redirect("/");

  const user = await getUserData({ userId: session.user.id });
  if (!user) redirect("/");

  return (
    <div>
      <ProfileContent />
    </div>
  );
}
