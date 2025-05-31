'use client';
import { Button } from "@/components/ui/button"
import { LinkIcon } from "lucide-react"
import { toast } from "sonner";

export function ButtonCopyLink({userId}: {userId: string}){
  
  async function handleCopyLink(){
    await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}/clinica/${userId}`);
    toast.success("Link de agendamento copiado com sucesso!");
  }
  
  return(
    <Button onClick={handleCopyLink} className="
    bg-emerald-500 hover:bg-emerald-600 cursor-pointer flex aling-items-center justify-center ">
      <LinkIcon className="h-5 w-5"/>
    </Button>
  )
}