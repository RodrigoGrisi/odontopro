import prisma from "@/lib/prisma";

interface IgetUserDataProps {
  userId: string;
}

export async function getUserData({ userId }: IgetUserDataProps) {
  if (!userId) return null;

  try {
    const user = await prisma.user.findFirst({
      where: { id: userId },
      include: { subscription: true },
    });

    return user || null;

  } catch (error) {
    console.log(error);
    return null;
  }
}