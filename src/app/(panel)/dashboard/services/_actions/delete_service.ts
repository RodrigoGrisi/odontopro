"use server"
import { auth } from "@/lib/auth";
import { z } from "zod";
import prisma from "@/lib/prisma"
import { revalidatePath } from 'next/cache'

const formSchema = z.object({
  serviceId: z.string().min(1, { message: "o id do serviço é obrigatorio" }),
});

type FormSchema = z.infer<typeof formSchema>;

export async function deleteService(formData: FormSchema) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Você não está autenticado");
  }

  try {
     await prisma.services.update({
      where: {
        id: formData.serviceId,
        userId: session.user.id,
      },
      data: {
        status: false,
      },
    });

    revalidatePath("/dashboard/services");

    return {
      message: "Serviço deletado com sucesso",
    };

  } catch (error) {
    console.error("Erro ao deletar serviço:", error);
    return {
      message: "Erro ao deletar serviço",
      service: null,
      error: "Erro ao deletar serviço",
    };

  }
}