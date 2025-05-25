
//BACKEND - meusite.com/api/schedule/get-appointments

import prisma from "@/lib/prisma";
import { tr } from "date-fns/locale";
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

    console.log("startDate", startDate);
    console.log("endDate", endDate);

    return NextResponse.json({
      startDate,
      endDate,
    });

  } catch (error) {
    console.error("Error fetching schedule info:", error);
    return NextResponse.json({
      error: "Failed to fetch schedule info",
    }, { status: 500 });

  }

  return NextResponse.json({
  });
}

