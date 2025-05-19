"use client"
import { useState } from "react";
import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DialogService } from "./dialog-service";


export function ServicesList() {

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <section className="mx-auto bg-green-100 w-[100%]">

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-semibold">Serviços</CardTitle>
            <DialogTrigger asChild>
              <Button ><Plus className="text-white" /></Button>
            </DialogTrigger>
            <DialogContent>

              <DialogService />

            </DialogContent>
          </CardHeader>
        </Card>

      </section>
    </Dialog>
  )
}