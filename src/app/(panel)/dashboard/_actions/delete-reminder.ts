"use server"
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { toast } from 'sonner'

const formSchema = z.object({
  reminderId: z.string().min(1, { message: "O id do lembrete é obrigatorio" }),
})


type FormData = z.infer<typeof formSchema> 

export async function deleteReminder(formData: FormData) {
  const schema = formSchema.safeParse(formData)

  if (!schema.success) {
    return {
      error: schema.error.issues[0].message,
    }
  }
  
  try {
    await prisma.reminder.delete({
      where: {
        id: schema.data.reminderId,
      },
    })
    
    toast.success("Lembrete deletado com sucesso")
    revalidatePath("dashboard")


  } catch (error) {
    return {
      error: "Erro ao deletar lembrete",
    }
  }
} 
