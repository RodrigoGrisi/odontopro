"use client"
import { useProfileForm } from "./profile-form"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Label } from "@/components/ui/label";


export default function ProfileContent() {

  const form = useProfileForm();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Label>Nome:</Label>
      <Input {...form.register("name")} />

      <Label>Email:</Label>
      <Input {...form.register("email")} />

      <Label>Endereço:</Label>
      <Input {...form.register("address")} />
    </div>
  )
}


