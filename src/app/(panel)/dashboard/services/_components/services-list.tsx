"use client"
import { useState } from "react";
import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DialogService } from "./dialog-service";
import { Services } from "@/generated/prisma";


interface ServicesListProps {
  services: Services[]
}

export function ServicesList({ services }: ServicesListProps) {

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const servicesList = services.map((service) => ({
    id: service.id,
    name: service.name,
    price: service.price,
    duration: service.duration,
  }));

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <section className="mx-auto  w-[100%]">

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-semibold">Serviços</CardTitle>
            <DialogTrigger asChild>
              <Button ><Plus className="text-white" /></Button>
            </DialogTrigger>
            <DialogContent>

              <DialogService handleClose={() => setIsDialogOpen(false)} />
            </DialogContent>
          </CardHeader>
        </Card>

        <div className="flex flex-col justify-between w-full mt-4">
          {servicesList.map((service) => (
            <section key={service.id} className=" p-2 my-1 bg-white rounded-lg shadow-md border border-gray-200  flex flex-row justify-between" >
              <div>
                <h2 className="text-lg font-semibold">{service.name}</h2>
                <p className="text-gray-600">
                  💰 Preço: {service.price} - ⏱ Duração: {service.duration} minutos
                </p>
              </div>

              <div className="mt-2 gap-1.5 flex flex-row">
                <Button className="mr-2 bg-emerald-600 text-white cursor-pointer">Editar</Button>
                <Button className="mr-2 bg-emerald-600 text-white cursor-pointer">Excluir</Button>
              </div>
            </section>
          ))}
        </div>
      </section>
    </Dialog>
  )
}