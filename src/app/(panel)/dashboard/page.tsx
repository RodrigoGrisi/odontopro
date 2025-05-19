import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/");
  }

  console.log(session.user.id);


  const infosUser = session && {
    name: session?.user?.name,
    email: session?.user?.email,
    image: session?.user?.image,
    created: session?.user?.createdAt,
    updated: session?.user?.updatedAt,
    stripe: session.user.stripe_customer_id,
  };

  return (
    <div className="flex flex-col items-center min-h-screen w-full p-2">
      {infosUser && (
        <Card className="w-full ">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
              {/* Imagem + info */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start w-full">
                <img
                  src={infosUser.image ?? undefined}
                  alt="Avatar"
                  width={200}
                  height={200}
                  className="w-24 h-24 rounded-full border border-gray-300"
                />
                <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
                  <CardTitle>Seja bem-vindo, {infosUser?.name}!</CardTitle>
                  <CardDescription className="mb-2">
                    Essas são suas informações:
                  </CardDescription>
                  <p>
                    <strong>Email:</strong> {infosUser.email}
                  </p>
                  <p>
                    <strong>Conta criada em:</strong>{" "}
                    {new Date(infosUser.created).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Última atualização:</strong>{" "}
                    {new Date(infosUser.updated).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Stripe:</strong>{" "}
                    {infosUser.stripe || "Nenhuma assinatura ativa"}
                  </p>
                </div>
              </div>

              {/* Botão de fechar (some no mobile) */}
              <div className="self-end sm:self-start sm:mr-2 hidden sm:block">
                <Button className="bg-red-900 hover:bg-red-600 ease-in-out duration-300">
                  <span className="text-xs text-white">X</span>
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
