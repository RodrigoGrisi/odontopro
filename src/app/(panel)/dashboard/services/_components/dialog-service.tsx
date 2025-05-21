"use client"
import { useState } from "react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DialogDescription } from "@radix-ui/react-dialog"
import { useDialogServiceForm, DialogServiceFormData } from "./dialog-service-form"
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { convertRealtoCents } from "@/utils/convertCurrency";
import { createNewService } from "../_actions/create_service";
import { toast } from "sonner";
import { set } from "zod";
import { updateService } from "../_actions/update-service";


interface DialogServiceProps {
  handleClose: () => void;
  serviceId?: string;
  initialValues?: {
    name: string;
    price: string;
    hours: string;
    minutes: string;
  }
}

export function DialogService({ handleClose, initialValues, serviceId }: DialogServiceProps) {
  const form = useDialogServiceForm({ initialValues: initialValues });
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: DialogServiceFormData) {
    setIsLoading(true);
    const priceIncents = convertRealtoCents(values.price);
    const hours = parseInt(values.hours) || 0;
    const Minutes = parseInt(values.minutes) || 0;

    const duration = (hours * 60) + Minutes;

    if(serviceId) {
      await handleEditServiceById({
        serviceId: serviceId,
        name: values.name,
        priceInCents: priceIncents,
        duartion: duration,
      })
      setIsLoading(false);
      toast.success("Serviço atualizado com sucesso", {
        duration: 2000,
      });
      handleCloseModal();
      return;
    }



    const response = await createNewService({
      name: values.name,
      price: priceIncents,
      duration: duration,
    })

    toast.success("Serviço criado com sucesso", {
      duration: 2000,
    });

    handleCloseModal();
    setIsLoading(false);

    if (response.error) {
      toast.error(response.error);
      setIsLoading(false);
      return;
    }

  }

  function handleCloseModal() {
    handleClose();
    form.reset();
  }

  /**
   * Altera o valor do input para o padrão brasileiro usando regex
   * @param event 
   */
  function changeCurrencyTemplate(event: React.ChangeEvent<HTMLInputElement>) {
    let { value } = event.target;

    value = value.replace(/\D/g, '');

    if (value) {
      value = (parseInt(value, 10) / 100).toFixed(2);
      value = value.replace('.', ',');
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      event.target.value = value;
    }

    event.target.value = value
    form.setValue('price', value);
  }

  async function handleEditServiceById({ 
    serviceId, 
    name, 
    priceInCents, 
    duartion } : {
    serviceId: string;
    name: string;
    priceInCents: number;
    duartion: number;
  }) {
    
    setIsLoading(true);
    const response = await updateService({
      serviceId: serviceId,
      name: name,
      price: priceInCents,
      duration: duartion,
    })

    setIsLoading(false);

    if (response?.error) {
      toast.error(response.error);
      setIsLoading(false);
      return;
    }

    toast.success("Serviço atualizado com sucesso", {
      duration: 2000,
    }); 

  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Novo serviço</DialogTitle>
        <DialogDescription>Adicione um serviço</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form className="space-y-2"
          onSubmit={(e) => {
            form.handleSubmit(onSubmit)(e);
            e.preventDefault();
          }}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semilbold">
                  Nome do serviço:
                </FormLabel>
                <FormControl>
                  <Input {...field}
                    placeholder="Digite o nome do serviço"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel className="font-semilbold">
                  Preço do serviço
                </FormLabel>
                <FormControl>
                  <Input {...field}
                    placeholder="Ex: R$ 50,00"
                    onChange={changeCurrencyTemplate}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="font-semibold">Tempo de duração do serviço</p>
          <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control}
              name="hours"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel className="font-semilbold">
                    Horas:
                  </FormLabel>
                  <FormControl>
                    <Input {...field}
                      placeholder="1"
                      min={0}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField control={form.control}
              name="minutes"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel className="font-semilbold">
                    Minutos:
                  </FormLabel>
                  <FormControl>
                    <Input {...field}
                      placeholder="0"
                      min={0}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full font-semibold text-white cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Cadastrando serviço..." : `${serviceId ? "Atualizar" : "Cadastrar"}`}
          </Button>
        </form>
      </Form>
    </>
  )
}