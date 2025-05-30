"use server"
import prisma from "@/lib/prisma";

export async function getAllServices({ userId }: { userId: string }) {
  {

    if (!userId) {
      error: "Falha ao buscar serviços";
    }

    try {

      const services = await prisma.services.findMany({
        where: {
          userId: userId,
          status: true,
        }
      });

      return {
        data: services
      }
    } catch (error) {
      return
      {
        error: "Falha ao buscar serviços";
      }
    }

  }
};