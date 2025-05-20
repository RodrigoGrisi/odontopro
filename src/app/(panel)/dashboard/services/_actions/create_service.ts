"use server"
import { auth } from "@/lib/auth";
import { z } from "zod";
import prisma from "@/lib/prisma"
import { revalidatePath } from 'next/cache'

const formSchema = z.object({
  name: z.string().min(1, { message: "Campo obrigatório" }),
  price: z.number().min(1, { message: "Campo obrigatório" }),
  duration: z.number().min(1, { message: "Campo obrigatório" }),
});

type FormSchema = z.infer<typeof formSchema>;

export async function createNewService(formData: FormSchema) {
  const session = await auth();

  if (!session) {
    throw new Error("Você não está autenticado");
  }

  const schema = formSchema.safeParse(formData);

  if (!schema.success) {
    return {
      message: schema.error.issues[0].message,
    };
  }

  try {
    const newService = await prisma.services.create({
      data: {
        name: formData.name,
        price: formData.price,
        duration: formData.duration,
        userId: session.user.id,
      },
    });

    // Revalidar o cache da página de serviços
    revalidatePath("/dashboard/services");

    return {
      message: "Serviço criado com sucesso",
      service: newService,
    };

  } catch (error) {
    console.error("Erro ao criar serviço:", error);
    return {
      message: "Erro ao criar serviço",
      service: null,
      error: "Erro ao criar serviço",
    };

  }
}