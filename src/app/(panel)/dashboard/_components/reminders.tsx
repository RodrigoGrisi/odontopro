import { Button } from '@/components/ui/button';
import { getReminders } from '../_data-access/get-reminders'

export async function Reminders({ userId }: { userId: string }) {

  const reminders = await getReminders({ userId: userId });
  console.log("Lembretes encontrados:" + reminders);

  return (
    <div className="p-4 border border-gray-400 rounded-lg">
      <h1 className="text-2xl font-semibold mb-4"> Lembretes</h1>
      {reminders.map((lembrete) =>
      (
        <div key={lembrete.id}
          className='flex flex-col gap-2 border border-gray-200 p-2 rounded-lg'
        >
          <div className="flex justify-between items-center">
            <div>
              {lembrete.description}
            </div>
            <div className='flex gap-2'>
              <Button>Editar</Button>
              <Button>Excluir</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}