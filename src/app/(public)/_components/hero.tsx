import { Button } from "@/components/ui/button";
import Image from "next/image";
import doctorImage from "../../../../public/imgs/medicos-829x1024.png";


export function Hero() {
  return (
    <section className="w-full flex items-center justify-center mt-30">
      <div className="w-[100%] h-[500px] flex items-center between justify-center 
      bg-gradient-to-r from-emerald-100 to-emerald-600 rounded-lg shadow-lg">
        <div className="container px-4 sm:px-6 gap-x-0.5 lg:px-8 flex items-center justify-center h-full">

          <main className="flex w-full h-full p-6 sm:flex-col lg:flex-row justify-between items-center gap-4">
            <article className="flex flex-col items-start justify-center gap-4 max-w-3xl lg:items-start">
              <h1 className="text-5xl md:text-6xl font-extrabold text-white text-center sm:text-left 
               tracking-tight drop-shadow-xl">
                Encontre os melhores profissionais <br />
                <h1 className="text-emerald-600">em um único local!</h1>
              </h1>

              <p className="text-base md:text-lg text-justify">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry...
              </p>
              <Button className="w-fit mt-4 px-6 py-6 bg-emerald-400 hover:bg-emerald-600 hover:text-white cursor-pointer text-base" variant="outline">
                Encontre uma clinica
              </Button>
            </article>
            <div className="hidden lg:block">
              <Image
                src={doctorImage}
                width={400}
                height={400}
                alt="foto ilustrativa profissional de saude"
                className="object-contain"
                quality={100}
                priority
              />
            </div>
          </main>

        </div>
      </div>
    </section>

  )
}

