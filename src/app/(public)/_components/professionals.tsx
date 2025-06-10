import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import DoctorGrid from "../../../../public/imgs/26375249medico.jpg";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { User } from "@/generated/prisma";

type ProfessionalsProps = {
  professionals: User[];
};

const professionals = [
  { name: "Dra. Ana Paula", address: "Rua das Flores, 123 - São Paulo" },
  { name: "Dr. João Pedro", address: "Av. Brasil, 456 - Rio de Janeiro" },
  { name: "Dra. Camila Silva", address: "Rua do Sol, 789 - Belo Horizonte" },
  { name: "Dr. Rafael Costa", address: "Av. das Américas, 321 - Curitiba" },
  { name: "Dra. Juliana Rocha", address: "Rua Verde, 654 - Recife" },
  { name: "Dr. Lucas Lima", address: "Av. Central, 111 - Salvador" },
  { name: "Dra. Beatriz Souza", address: "Rua Azul, 222 - Porto Alegre" },
  { name: "Dr. Fernando Alves", address: "Av. Paulista, 999 - São Paulo" },
];

export function Professionals({ professionals }: ProfessionalsProps) {
  return (
    <section className="bg-gray-200 mt-6 w-full justify-center ">
      <div className="container flex w-[100%] justify-centerpy-8 text-center">
        <h2 className="text-3xl text-center my-10">
          Clínicas disponíveis
        </h2>
      </div>
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 px-4">
        {professionals.map((prof, index) => (
          <Card key={prof.id || index} className="flex flex-col justify-between overflow-hidden ">
            <CardContent >
              <div className="flex items-center justify-center">
                <Image
                  src={DoctorGrid}
                  width={500}
                  alt="foto ilustrativa profissional de saúde"
                  className="rounded-xl"
                  quality={100}
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-xl mt-4">{prof.name || "Profissional"}</CardTitle>
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500"></div>
                </div>
                <p className="text-sm text-gray-700">{prof.address || "Endereço não informado"}</p>
              </div>
            </CardContent>
            <CardFooter >
              <Link href="/dashboard"
                className="w-full text-center 
              text-neutral-800
              bg-emerald-500 hover:text-white 
              hover:bg-emerald-600 ease-in-out duration-300 
              font-bold py-2 rounded">
                Agendar consulta
                <ArrowRight className="ml-2 inline text-sm font-medium" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </section>
    </section>
  );
}

