"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const appointmentSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório" }),
  email: z.string().email({ message: "O Email é Obrigatorio" }),
  phone: z.string().min(1, { message: "O Telefone é obrigatório" }),
  date: z.date(),
  serviceId: z.string().min(1, { message: "O Serviço é obrigatório" }),
}); 

export type AppointmentFormData = z.infer<typeof appointmentSchema>;

export function useAppointmentForm() {
  return useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: new Date(),
      serviceId: "",
    },
  });
};