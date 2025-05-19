import { redirect } from 'next/navigation'
import getSession from '@/lib/getSession';
import { ServiceContent } from './_components/service-content';

export default async function Service() {

  const session = await getSession();
  if (!session) return redirect("/");

  return (
    <section className="flex flex-col h-screen w-full p-4">
      <ServiceContent userId={session?.user?.id!} />
    </section>
  );
}