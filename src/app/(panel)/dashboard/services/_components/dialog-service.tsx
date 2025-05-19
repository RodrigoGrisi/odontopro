"use client"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DialogDescription } from "@radix-ui/react-dialog"
import { useDialogServiceForm, DialogServiceFormData } from "./dialog-service-form"
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function DialogService() {

  const form = useDialogServiceForm();


  async function onSubmit(values: DialogServiceFormData) {
    console.log(values);
    form.reset();
  }

  function changeCurrencyTemplate(event: React.ChangeEvent<HTMLInputElement>) {
    let { value } = event.target;

    value = value.replace(/\D/g, '');

    if(value){
      value = (parseInt(value, 10) / 100 ).toFixed(2);
      value = value.replace('.', ',');
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); 
      event.target.value = value;
    }

    event.target.value = value
    form.setValue('price', value);
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
          <Button type="submit" className="w-full font-semibold text-white cursor-pointer">
            Adicionar serviço
          </Button>
        </form>
      </Form>
    </>
  )
}