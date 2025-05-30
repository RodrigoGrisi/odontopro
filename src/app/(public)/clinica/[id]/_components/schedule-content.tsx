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
import { Label } from "@radix-ui/react-label"
import { ScheduleTimeList } from "./schedule-time-list"
import { createNewAppointment } from "../_actions/create-appointment"

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

export interface TimeSlot {
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

        const stillavaliable = finalSlots.find((slot) => slot.time === selectedTime && slot.avaliable)

        if (!stillavaliable) {
          setSelectedTime("");
        }
        

      })
    }

  }, [fetchBlockedTimes, clinic.times, selectedTime, selectedDate, selectedServideId]);


  async function handleRegisterAppointment(formData: AppointmentFormData) {


    if (!selectedTime) {
      toast.error("Selecione um horário");
      return;
    }

    const response = await createNewAppointment({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      time: selectedTime,
      date: formData.date,
      serviceId: formData.serviceId,
      clinicId: clinic.id
    })

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success("Agendamento realizado com sucesso!")
    form.reset();
    setSelectedTime("");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-32 bg-emerald-500" />
      <section className="contianer mx-auto px-4 -mt-16 m-6">
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
                            {service.name} - {Math.floor(service.duration / 60)}h {service.duration % 60}min

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
                <Label >Horarios disponíveis:</Label>
                <div className="bg-gray-100 p-4 rounded-lg mt-2">
                  {loadingSlots ? (
                    <p className="text-gray-500 text-center">Carregando horários...</p>
                  ) : avaliableTimeSlots.length === 0 ? (
                    <p className="text-gray-500 text-center">Nenhum horário disponível para este dia.</p>
                  ) : (
                    <ScheduleTimeList
                      onSelectTime={(time) => setSelectedTime(time)}
                      clinicTimes={clinic.times || []}
                      blockedTimes={blockedTimes}
                      avaliableTimeSlots={avaliableTimeSlots}
                      selectedDate={selectedDate}
                      selectedTime={selectedTime}
                      requiredSlot={
                        clinic.services.find(service => service.id === selectedServideId) ?
                          Math.ceil(clinic.services.find(service => service.id === selectedServideId)!.duration / 30) : 1
                      }
                    />
                  )}
                </div>
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
                  className="w-full mt-4 mb-10 bg-emerald-500 hover:bg-emerald-400">Realizar agendamento</Button>
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