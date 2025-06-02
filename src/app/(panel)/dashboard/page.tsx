import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import {
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { ButtonCopyLink } from "./_components/button-copy-link";
import { Reminders } from "./_components/reminder/reminders";

export default async function Dashboard() {

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <main className="flex justify-start flex-col gap-4 w-full h-full">
      <div className="w-full mt-2">
        <CardHeader className="m-2 p-2 rounded-2xl">
          <div className="flex justify-end gap-2 items-center w-full">
            <Link href={`/clinica/${session.user.id}`} target="_blank">
              <Button className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer flex-1 md:flex[0]">
                <Calendar className="w-5 h-5 mr-2" />
                Novo agendamento
              </Button>
            </Link>
            <ButtonCopyLink userId={session.user.id} />
          </div>
        </CardHeader>
      </div>
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2  p-4">
        <Reminders userId={session.user?.id!} />
        <Reminders userId={session.user?.id!} />
      </section>
    </main>
  );
}
