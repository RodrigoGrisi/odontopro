"use server";
import prisma from "@/lib/prisma";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório" }),
  email: z.string().email({ message: "O Email é obrigatório" }),
  phone: z.string().min(1, { message: "O Telefone é obrigatório" }),
  date: z.date(),
  serviceId: z.string().min(1, { message: "O Serviço é obrigatório" }),
  time: z.string().min(1, { message: "O Horário é obrigatório" }),
  clinicId: z.string().min(1, { message: "A Clínica é obrigatória" }),
});

type FormSchema = z.infer<typeof formSchema>;

type CreateAppointmentResponse =
  | { success: true; data: Awaited<ReturnType<typeof prisma.appointment.create>> }
  | { success: false; error: string };

export async function createNewAppointment(
  formData: FormSchema
): Promise<any> {
  const schema = formSchema.safeParse(formData);

  if (!schema.success) {
    return {
      success: false,
      error: schema.error.issues[0].message,
    };
  }

  try {

    const selectedDate = new Date(formData.date);

    const year = selectedDate.getFullYear();
    const day = selectedDate.getDate();
    const month = selectedDate.getMonth();

    const appointmentDate = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));

    const newAppointment = await prisma.appointment.create({
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        time: formData.time,
        appointmentData: appointmentDate,
        serviceId: formData.serviceId,
        userId: formData.clinicId,
      },
    });

    return {
      success: true,
      data: newAppointment,
    };
  } catch (error) {
    console.error("Erro ao realizar o agendamento:", error);
    return {
      success: false,
      error: "Erro ao realizar o agendamento",
    };
  }
}
