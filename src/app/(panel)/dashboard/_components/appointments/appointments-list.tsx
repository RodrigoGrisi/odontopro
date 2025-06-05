"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Card,
  CardTitle,
  CardContent,
  CardHeader,
  CardDescription
} from '@/components/ui/card'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Button } from '@/components/ui/button'
import { Delete, Edit2, Eye } from 'lucide-react'


interface AppointmentsListProps {
  times: string[]
}

export function AppointmentsList({ times }: AppointmentsListProps) {

  const searchParams = useSearchParams();
  const date = searchParams.get("date")


  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl md:text-2xl font-bold">
          Listagem de horários
        </CardTitle>
        <Button>
          Selecionar data
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-250px)] w-full overflow-y-auto">
          <div className="flex flex-col gap-2">
            {times.map((slot, index) => (
              <article
                key={index}
                className="flex flex-row items-center justify-between py-2"
              >
                <div className="flex w-full border gap-3.5 justify-between border-gray-100 rounded-md p-2">
                  <div className="flex gap-3">
                  <p className="text-sm lg:text-base font-semibold">{slot}</p>
                  <p className="text-sm lg:text-base text-gray-500">Disponível</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" className="p-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700">
                      <Eye className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" className="p-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700">
                      <Edit2 className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" className="p-2 bg-red-100 hover:bg-red-200 text-red-700">
                      <Delete className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}