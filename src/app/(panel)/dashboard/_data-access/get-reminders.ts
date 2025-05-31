import prisma from "@/lib/prisma";

/**
 * Devolve uma lista de lembretes
 * @param userId 
 * @returns 
 */
export async function getReminders( { userId }: { userId: string }) {

  if (!userId) {
    return [];
  }

  try {

    const reminders = await prisma.reminder.findMany({
      where: {
        userId: userId
      }
    });

    return reminders;
    
  } catch (error) {
    console.log(error);
    return [];
  }
}