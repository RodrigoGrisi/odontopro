import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  name: z.string().min(6, { message: "O nome do serviço é obrigatório" }),
  price: z.string().min(2, { message: "O valor do serviço é obrigatório" }),
  hours: z.string(),
  minutes: z.string(),
});

export interface IUseDialogServiceFormProps {
  initialValues?: {
    name: string;
    price: string;
    hours: string;
    minutes: string;
  }
}

export type DialogServiceFormData = z.infer<typeof formSchema>;

export function useDialogServiceForm() {
  const form = useForm<DialogServiceFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "",
      hours: "",
      minutes: "",
    },
  });

  return form;
}