import { Button } from "@/components/ui/button";
import Image from "next/image";
import doctorImage from "../../../../public/imgs/medicos-829x1024.png";


export function Hero() {
  return (
    <section className="flex flex-row items-center justify-center">
      <div className="container px-4  
        sm:px-6 lg:px-8">

        <main className="flex items-center justify-center gap-8 
        sm:flex-col lg:flex-row">

          <article className="flex flex-col items-start justify-center gap-4 max-w-3xl
          lg:items-start">
            <h1 className="text-4xl font-bold ">Encontre os melhores profissionais em um único local!</h1>
            <p className="text-base md:text-lg text-justify">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
              a type specimen book.
            </p>
            <Button className="w-fit mt-4 px-6 py-6
             bg-emerald-400 hover:bg-emerald-600 
             hover:text-white 
             cursor-pointer text-base" 
             variant="outline">Encontre uma clinica</Button>
          </article>
          <div className="hidden lg:block">
            <Image src={doctorImage}
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
    </section>
  )
}

