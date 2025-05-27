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
    // Ajustar data para meia-noite em horário de Brasília (UTC-3)
    const selectedDate = formData.date;
    
    // ⚠️ ATENÇÃO: Isso assume que `formData.date` já veio como Date em BRT.
    // Setar horário como meia-noite:
    selectedDate.setHours(0, 0, 0, 0);

    // Obter o deslocamento de fuso horário (em minutos) e converter para milissegundos
    const timezoneOffset = selectedDate.getTimezoneOffset() * 60 * 1000;

    // Subtrair o offset para gerar a data em UTC equivalente à meia-noite no fuso local
    const appointmentDate = new Date(selectedDate.getTime() - timezoneOffset);

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
