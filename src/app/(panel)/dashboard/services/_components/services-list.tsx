"use client"
import { useState } from "react";
import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DialogService } from "./dialog-service";
import { Services } from "@/generated/prisma";
import { deleteService } from "../_actions/delete_service";
import { toast } from "sonner";
import { set } from "zod";

interface ServicesListProps {
  services: Services[]
}

export function ServicesList({ services }: ServicesListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<null | Services>(null);


  async function handleDeleteService(serviceId: string) {
    const response = await deleteService({ serviceId });

    if (response.error) {
      toast.error("Erro ao deletar serviço");
      return;
    }

    toast.success("Serviço deletado com sucesso");
  }

  async function handleEditService(services: Services) {
    console.log("Editando serviço: " + services.name);

    setEditingService(services);
    setIsDialogOpen(true);

  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => {
      setIsDialogOpen(open);

      if (!open) {
        setEditingService(null);
      }

    }}>
      <section className="mx-auto  w-[100%]">

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-semibold">Serviços</CardTitle>
            <DialogTrigger asChild>
              <Button ><Plus className="text-white" /></Button>
            </DialogTrigger>
            <DialogContent
              onInteractOutside={(e) => {
                e.preventDefault();
                setIsDialogOpen(false);
                setEditingService(null);
              }}
            >
              <DialogService
                serviceId={editingService ? editingService.id : undefined}
                initialValues={editingService ? {
                  name: editingService.name,
                  price: (editingService.price / 100).toFixed(2).replace(".", ","),
                  hours: Math.floor(editingService.duration / 60).toString(),
                  minutes: (editingService.duration % 60).toString(),
                }
                  :
                  undefined}
                handleClose={() => {
                  setIsDialogOpen(false)
                  setEditingService(null);
                }}
              />
            </DialogContent>
          </CardHeader>
        </Card>

        <div className="flex flex-col justify-between w-full mt-4">
          {services.map((service) => (
            <section key={service.id} className=" p-2 my-1 bg-white rounded-lg shadow-md border border-gray-200  flex flex-row justify-between" >
              <div>
                <h2 className="text-lg font-semibold">{service.name}</h2>
                <p className="text-gray-600">
                  💰 Preço: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(service.price / 100)} - ⏱ Duração: {service.duration} minutos

                </p>
              </div>

              <div className="mt-2 gap-1.5 flex flex-row">
                <Button
                  className="mr-2 bg-emerald-600 text-white cursor-pointer"
                  onClick={() => handleEditService(service)}
                >
                  Editar
                </Button>
                <Button
                  className="mr-2 bg-emerald-600 text-white cursor-pointer"
                  onClick={() => handleDeleteService(service.id)}
                >
                  Excluir
                </Button>
              </div>
            </section>
          ))}
        </div>
      </section>
    </Dialog>
  )
}
