"use client"

import { useState } from "react"
import { Subscription, User } from "@/generated/prisma"
import Image from "next/image"
import { ProfileFormData, useProfileForm } from "./profile-form"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { updateProfile } from "../_actions/update-profile"
import { toast } from "sonner"
import { formatPhone } from "@/utils/formatPhone"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

interface ProfileContentProps {
  user: User & {
    subscription: Subscription | null
    times: string[]
  }
}

// ** Define essa função FORA do componente, pra não recriar toda renderização **
function generateTimeSlots(): string[] {
  const hours: string[] = []
  for (let i = 8; i <= 23; i++) {
    for (let j = 0; j < 2; j++) {
      const hour = i.toString().padStart(2, "0")
      const minute = (j * 30).toString().padStart(2, "0")
      hours.push(`${hour}:${minute}`)
    }
  }
  return hours
}

const hours = generateTimeSlots()

export function ProfileContent({ user }: ProfileContentProps) {
  const [selectedHours, setSelectedHours] = useState<string[]>(
    (user.times ?? []).filter((hour) => hours.includes(hour)) // só valida os horários que realmente existem
  )
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  const router = useRouter()
  const { update } = useSession()

  async function handleSignOut() {
    await signOut()
    await update()
    router.replace("/")
  }

  const form = useProfileForm({
    name: user.name,
    address: user.address,
    phone: user.phone,
    status: user.status === true,
    timeZone: user.timeZone,
    email: user.email ?? "",
  })

  function toggleHour(hour: string) {
    if (!hours.includes(hour)) return // ignora se horário inválido

    setSelectedHours((prev) =>
      prev.includes(hour)
        ? prev.filter((h) => h !== hour)
        : [...prev, hour].sort()
    )
  }

  const timeZones = Intl.supportedValuesOf("timeZone").filter(
    (zone) =>
      zone.startsWith("America/Sao_Paulo") ||
      zone.startsWith("America/Fortaleza") ||
      zone.startsWith("America/Recife") ||
      zone.startsWith("America/Bahia") ||
      zone.startsWith("America/Belem") ||
      zone.startsWith("America/Manaus") ||
      zone.startsWith("America/Cuiaba") ||
      zone.startsWith("America/Boa_Vista")
  )

  async function onSubmit(values: ProfileFormData) {
    const response = await updateProfile({
      name: values.name,
      address: values.address,
      status: values.status === true,
      phone: values.phone,
      timeZone: values.timeZone,
      times: selectedHours,
    })

    if (response.error) {
      toast.error(response.error)
      return
    }

    toast.success(response.data)
  }

  return (
    <div className="flex flex-col h-screen w-full p-4">
      <section className="flex flex-row items-center justify-end w-full space-y-4 my-2">
        <Button
          variant="destructive"
          className="bg-red-500 hover:bg-red-400"
          onClick={handleSignOut}
        >
          Sair da conta
        </Button>
      </section>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Meu Perfil</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <div className="bg-gray-200 relative h-40 w-40 rounded-full overflow-hidden">
                  <Image
                    src={user.image ?? ""}
                    alt="Foto da clinica"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {/* Campos do formulário */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Nome completo
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Digite o nome da clinica..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Endereço completo:</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Digite o endereço da clinica..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Telefone</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="(67) 99912-3456"
                          onChange={(e) => {
                            const formattedValue = formatPhone(e.target.value)
                            field.onChange(formattedValue)
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Status da clínica</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => field.onChange(value === "active")}
                          value={field.value ? "active" : "inactive"}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o status da clínica" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">ATIVO (clínica aberta)</SelectItem>
                            <SelectItem value="inactive">INATIVO (clínica fechada)</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Seleção de horários */}
                <div className="space-y-2">
                  <Label className="font-semibold">Configurar horários da clinica</Label>

                  <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        Clique aqui para selecionar horários
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Horários da clinica</DialogTitle>
                        <DialogDescription>
                          Selecione abaixo os horários de funcionamento da clinica:
                        </DialogDescription>
                      </DialogHeader>

                      <section className="py-4">
                        <p className="text-sm text-muted-foreground mb-2">
                          Clique nos horários abaixo para marcar ou desmarcar:
                        </p>

                        <div className="grid grid-cols-5 gap-2">
                          {hours.map((hour) => (
                            <Button
                              key={hour}
                              variant="outline"
                              className={cn(
                                "h-10",
                                selectedHours.includes(hour) && "border-2 border-emerald-500 text-primary"
                              )}
                              onClick={() => toggleHour(hour)}
                            >
                              {hour}
                            </Button>
                          ))}
                        </div>
                      </section>

                      <Button className="w-full" onClick={() => setDialogIsOpen(false)}>
                        Fechar modal
                      </Button>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Fuso horário */}
                <FormField
                  control={form.control}
                  name="timeZone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Selecione o fuso horário</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o seu fuso horário" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeZones.map((zone) => (
                              <SelectItem key={zone} value={zone}>
                                {zone}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400">
                  Salvar alterações
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  )
}
