"use client"
import Image from "next/image"
import imageDoctor from "../../../../../../public/imgs/26375249medico.jpg"
import { MapPin } from "lucide-react"
import { Prisma } from "@/generated/prisma"
import { useAppointmentForm, AppointmentFormData } from "./schedule-form";
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { formatPhone } from '@/utils/formatPhone';
import { DateTimePicker } from "./data-picker"


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

export function ScheduleContent({ clinic }: ScheduleContentProps) {

  const form = useAppointmentForm();

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
            onSubmit={form.handleSubmit((data: AppointmentFormData) => { console.log(data) })}
            className="container mx-auto px-4 mt-8 max-w-2xl"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormItem>
                      <FormLabel htmlFor="name" className="font-semibold">Nome completo:</FormLabel>
                      <Input
                        className="my-1"
                        id="name"
                        placeholder="Digite o nome completo do paciente"
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
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
                  <FormControl>
                    <FormItem>
                      <FormLabel htmlFor="email" className="font-semibold">E-mail:</FormLabel>
                      <Input
                        className="my-1"
                        id="email"
                        placeholder="Digite o seu email"
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
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
                  <FormControl>
                    <FormItem>
                      <FormLabel htmlFor="phone" className="font-semibold">Telefone:</FormLabel>
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
                      <FormMessage />
                    </FormItem>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col"> 
                  <FormControl>
                    <FormItem>
                      <FormLabel htmlFor="date" className="font-semibold mr-4">Data de agendamento:</FormLabel>
                      <DateTimePicker
                        initialDate={new Date()}
                        minDate={new Date()} className="my-1" 
                        onChange={(date) => {
                          field.onChange(date);
                        }
                        }
                      />
                      <FormMessage />
                    </FormItem>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </section>
    </div>
  )
}