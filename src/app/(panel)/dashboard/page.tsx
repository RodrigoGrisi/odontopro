import { Button } from '@/components/ui/button'
import getSesion from '@/lib/getSession'
import { Calendar } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ButtonCopyLink } from './_components/button-copy-link'
import { Reminders } from './_components/reminder/reminders'
import { Appointments } from './_components/appointments/appointments'

export default async function Dashboard() {
  const session = await getSesion()


  if (!session) {
    redirect("/")
  }

  return (
    <main className='flex flex-col gap-4 w-full h-full p-4'>
      <div className='space-x-2 flex items-center justify-end '>
        <Link
          href={`/clinica/${session.user?.id}`}
          target='_blank'
        >
          <Button className='bg-emerald-500 hover:bg-emerald-400 flex-1 md:flex-[0]'>
            <Calendar className='w-5 h-5' />
            <span>Novo agendamento</span>
          </Button>
        </Link>

        <ButtonCopyLink userId={session.user?.id!} />
      </div>

      <section className='grid grid-cols-1 lg:grid-cols-2 gap-4 *::grid-cols-2 '>
        <Appointments userId={session.user?.id!} />

        <Reminders userId={session.user?.id!} />
      </section>
    </main>
  )
}