'use server';
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function getInfoSchedule({ userId }: { userId: string }) {

  try {

    if (!userId) {
      return null;
    }

    const user = await prisma.user.findFirst({
      where: {
        id: userId
      },
      include: {
        subscription: true,
        services: {
          where: {  
            status: true,
          },
        },
      }
    })

    if (!user) {
      redirect("/");
    }

    return user;

  } catch (error) {
    console.error("Error fetching schedule info:", error);
    throw new Error("Failed to fetch schedule info");

  }

}