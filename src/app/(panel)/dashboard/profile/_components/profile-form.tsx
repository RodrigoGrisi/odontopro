import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const profileSchema = z.object({
  name: z.string({message: "O nome é obrigatorio"}).min(5, {message: "O nome deve ter pelo menos 5 caracteres"}),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email(),
  status: z.boolean().optional(),
  timeZone: z.string().min(1, {message: "O timezone é obrigatorio"}),
})

type ProfileFormData = z.infer<typeof profileSchema>

export function useProfileForm(){
  return useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { 
      name: "",
      address: "",
      phone: "",
      status: false, 
      timeZone: ""
    }
  })
}