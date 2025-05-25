"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface UseProfileFormProps {
  name: string | null;
  address: string | null;
  phone: string | null;
  status: true | false | null;
  timeZone: string | null;
  email: string | null;
}


const profileSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório" }),
  address: z.string().optional(),
  phone: z.string().optional(),
  status: z.boolean(),
  timeZone: z.string().min(1, { message: "O time zone é obrigatório" }),
  email: z.string().optional()
})

export type ProfileFormData = z.infer<typeof profileSchema>;

export function useProfileForm({ name, address, phone, status, timeZone, email }: UseProfileFormProps) {
  return useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: name || "",
      address: address || "",
      phone: phone || "",
      status: status ? true : false,
      timeZone: timeZone || "",
      email: email || "" // aqui usa o que veio
    }
  })
}