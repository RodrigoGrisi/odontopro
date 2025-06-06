import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Acesso não autorizado" }, { status: 401 });
  }

  const clinicId = session.user.id;

  const searchParams = request.nextUrl.searchParams;
  const dateString = searchParams.get("date") as string;

  if (!dateString) {
    return NextResponse.json({ error: "Data inválida" }, { status: 400 });
  }

  if (!clinicId) {
    return NextResponse.json({ error: "Usuário inválido" }, { status: 400 });
  }

  try {
    //CRIAR UMA DATA FORMATADA
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day, 0, 0, 0, 0);

    const startDate = new Date(year, month - 1, day, 0, 0, 0, 0);
    const endDate = new Date(year, month - 1, day, 23, 59, 59, 999);

    const appointments = await prisma.appointment.findMany({
      where: {
        userId: clinicId,
        appointmentData: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        service: true,
      }
    });

    return NextResponse.json( appointments )

  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    return NextResponse.json({ error: "Erro ao buscar agendamentos" }, { status: 500 });
  }

};
