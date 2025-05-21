"use server"
import { auth } from "@/lib/auth";
import { z } from "zod";
import prisma from "@/lib/prisma"
import { revalidatePath } from 'next/cache'

const formSchema = z.object({
  serviceId: z.string().min(1, { message: "O id do serviço é obrigatorio" }),
  name: z.string().min(1, { message: "Campo obrigatório" }),
  price: z.number().min(1, { message: "Campo obrigatório" }),
  duration: z.number().min(1, { message: "Campo obrigatório" }),
});

type FormSchema = z.infer<typeof formSchema>;

export async function updateService(formData: FormSchema) {

  const session = await auth();
  
  if (!session) {
    throw new Error("Falha ao atualizar serviço");
  }

  const schema = formSchema.safeParse(formData);

  if(!schema.success) {
    return {
      message: schema.error.issues[0].message,
    };
  }

  try {
    
    const service = await prisma.services.update({
      where: {
        id: formData.serviceId,
        userId: session.user.id,
      },
      data: {
        name: formData.name,
        price: formData.price,
        duration: formData.duration < 30 ? 30 : formData.duration,
      },
    });

    // Revalidar o cache da página de serviços
    revalidatePath("/dashboard/services");
    
  } catch (error) {
    console.error("Erro ao atualizar serviço:", error);
    return {
      message: "Erro ao atualizar serviço",
      service: null,
      error: "Erro ao atualizar serviço",
    };
    
  }


}
