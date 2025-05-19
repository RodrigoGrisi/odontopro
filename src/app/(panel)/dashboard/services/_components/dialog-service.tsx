"use client"

import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DialogDescription } from "@radix-ui/react-dialog"

export function DialogService() {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Novo serviço</DialogTitle>
        <DialogDescription>Adicione um serviço</DialogDescription>
      </DialogHeader>
      <div>
        <h1> Conteudo do modal</h1>
      </div>
    </>
  )
}