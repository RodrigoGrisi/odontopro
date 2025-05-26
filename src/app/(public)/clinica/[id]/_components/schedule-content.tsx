"use client"
import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import imageDoctor from "../../../../../../public/imgs/26375249medico.jpg"
import { MapPin } from "lucide-react"
import { Prisma } from "@/generated/prisma"
import { useAppointmentForm, AppointmentFormData } from "./schedule-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formatPhone } from '@/utils/formatPhone';
import { DateTimePicker } from "./data-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { set } from "date-fns"
import { Label } from "@radix-ui/react-label"

type UserWithSubscriptionAndServices = Prisma.UserGetPayload<{
  include: {
    subscription: true
    services: {
      where: {
        status: true
      }
    }
  }
}>

interface ScheduleContentProps {
  clinic: UserWithSubscriptionAndServices
}

interface TimeSlot {
  time: string,
  avaliable: boolean
}


export function ScheduleContent({ clinic }: ScheduleContentProps) {

  const form = useAppointmentForm();
  const { watch } = form
  const [selectedTime, setSelectedTime] = useState("");
  const [avaliableTimeSlots, setAvaliableTimeSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const selectedDate = watch("date");
  const selectedServideId = watch("serviceId");

  // HORARIOS BLOQUEADOS
  const [blockedTimes, setBlockedTimes] = useState<string[]>([]);

  const fetchBlockedTimes = useCallback(async (date: Date): Promise<string[]> => {
    setLoadingSlots(true);
    try {
      const dateString = date.toISOString().split("T")[0];
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/schedule/get-appointments?userId=${clinic.id}&date=${dateString}`);

      const json = await response.json();

      setLoadingSlots(false);
      return json; // retornar os horários bloqueados do dia selecionado.

    } catch (err) {
      console.error(err);
      setLoadingSlots(false);
      return [];
    }
  }, [clinic.id]);

  useEffect(() => {

    if (selectedDate) {
      fetchBlockedTimes(selectedDate).then((blocked) => {
        setBlockedTimes(blocked);
        const times = clinic.times || [];
        const finalSlots = times.map((time) => ({
          time,
          avaliable: !blocked.includes(time) // Verificar se o horário está bloqueado
        }))

        setAvaliableTimeSlots(finalSlots);
      })
    }

  }, [fetchBlockedTimes, clinic.times, selectedTime, selectedDate, selectedServideId]);


  async function handleRegisterAppointment(formData: AppointmentFormData) {
    const { name, email, phone, date, serviceId } = formData
    const formattedDate = new Date(date);
    const formattedPhone = phone.replace(/\D/g, "");
    const appointmentData = {
      name,
      email,
      phone: formattedPhone,
      date: formattedDate,
      serviceId,
      clinicId: clinic.id
    }

    console.log("Dados do agendamento:", appointmentData);
    toast.success("Agendamento realizado com sucesso!")
    form.reset();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-32 bg-emerald-500" />
      <section className="contianer mx-auto px-4 -mt-16">
        <div className="max-w-2xl mx-auto">
          <article className="flex flex-col items-center">
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white mb-8">
              <Image
                src={clinic.image || imageDoctor}
                alt="Foto da clinica"
                className="object-cover"
                fill
              />
            </div>

            <h1 className="text-2xl font-bold mb-2">{clinic.name}</h1>

            <div className="flex items-center gap-1">
              <MapPin className="w-5 h-5" />
              <p className="text-sm text-gray-500">
                {clinic.address ? clinic.address : "Endereço não disponível"}
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* FOMRULARIO DE AGENDAMENTO */}
      <section>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleRegisterAppointment)}
            className="container mx-auto px-4 mt-8 max-w-2xl"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name" className="font-semibold">Nome completo:</FormLabel>
                  <FormControl>
                    <Input
                      className="my-1"
                      id="name"
                      placeholder="Digite o nome completo do paciente"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email" className="font-semibold">E-mail:</FormLabel>
                  <FormControl>
                    <Input
                      className="my-1"
                      id="email"
                      placeholder="Digite o seu email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="phone" className="font-semibold">Telefone:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        const formattedValue = formatPhone(e.target.value);
                        field.onChange(formattedValue);
                      }}
                      className="my-1"
                      id="phone"
                      placeholder="Digite o seu telefone"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel htmlFor="date" className="font-semibold mr-4">Data de agendamento:</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      initialDate={new Date()}
                      minDate={new Date()} className="my-1"
                      onChange={(date) => {
                        field.onChange(date);
                      }
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="serviceId"
              render={({ field }) => (
                <FormItem >
                  <FormLabel htmlFor="serviceId" className="font-semibold mr-4">
                    Selecione o serviço:
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione um serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        {clinic.services.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              {selectedServideId && (
                <div className="w-full mt-4">
                  <Label>Horarios disponíveis:</Label>
                </div>
              )}
            {
              clinic.status ? (
                <Button type="submit"
                  disabled={
                    !watch("name") ||
                    !watch("email") ||
                    !watch("phone") ||
                    !watch("date") ||
                    !watch("serviceId")
                  }
                  className="w-full mt-4 bg-emerald-500 hover:bg-emerald-400">Realizar agendamento</Button>
              ) : (
                <div className="flex items-center justify-center p-4 bg-red-400  rounded-lg mt-4 ">
                  <p className="text-white font-semibold text-lg text-center">
                    A Clínica está fechada neste momento
                  </p>
                </div>
              )
            }


          </form>
        </Form>
      </section>
    </div>
  )
}