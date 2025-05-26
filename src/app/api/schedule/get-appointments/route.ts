
//BACKEND - localhost:3000/api/schedule/get-appointments ?userId=...&date=...
"use server"
import prisma from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

  //BUSCAR SE TEM AGENDAMENTOS
  const { searchParams } = request.nextUrl;
  const userId = searchParams.get("userId");
  const dateParm = searchParams.get("date");

  if (!userId || userId === null || !dateParm || dateParm === null) {
    return NextResponse.json({
      error: "User ID and Date parms as required in query",
    }, { status: 400 });
  }

  try {
    const [year, month, day] = dateParm.split("-").map(Number);
    const startDate = new Date(year, month - 1, day, 0, 0, 0);
    const endDate = new Date(year, month - 1, day, 23, 59, 59, 999);

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json({
        error: "User not found",
      }, { status: 404 });
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        userId: user.id,
        appointmentData: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        service: true,
      },
    })

    //MONTAR UM ARRAY COM HORÁRIOS BLOQUEADOS
    const blockedSlots = new Set<string>();

    for (const apt of appointments) {
      //Ex: Apt.time = "10:00", apt.service.duration = 60 (1hr)
      const requiedSlots = Math.ceil(apt.service.duration / 30);
      const startIndex = user.times.indexOf(apt.time);

      if (startIndex !== -1) {
        for (let i = 0; i < requiedSlots; i++) {
          const blockedSlot = user.times[startIndex + i];

          if (blockedSlot) {
            blockedSlots.add(blockedSlot);
          }
        }
      }
    }

    const blockedTimes = Array.from(blockedSlots);
    console.log("Blocked Times:", blockedTimes);
    return NextResponse.json(blockedTimes);

  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json({
      error: "Error fetching appointments",
    }, { status: 500 });
  }
}