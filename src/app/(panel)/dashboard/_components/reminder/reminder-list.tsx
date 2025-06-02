"use client"
import { Reminder } from "@/generated/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash, Edit } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface ReminderListProps {
  reminder: Reminder[];
}
/**
 * Este componente recebe uma lista de lembretes
 * @param  @ReminderListProps 
 * @returns retorna uma lista de lembretes
 */
export function ReminderList({ reminder }: ReminderListProps) {

  return (
    <div className="flex flex-col gap-3 justify-center bg-gray-100">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
          <CardTitle className="text-1xl md:text-2xl font-bold">Lembretes</CardTitle>
          <Button variant="ghost" size="sm" className="w-9 p-0 m-0 ">
            <Plus className="w-5 h-5" />
          </Button>
        </CardHeader>

        <CardContent>

          {reminder.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Voce ainda nao possui nenhum lembrete
            </p>
          )}

          <ScrollArea className="h-[400px]">
            <div className="flex flex-col gap-2">
              {reminder.map((reminder) => (
                <article key={reminder.id} className="flex flex-row justify-between items-center">
                  <div className="flex flex-row justify-between items-center border p-2 rounded w-full border-gray-400">
                    <div className="flex flex-col">
                      <span className="font-bold">{reminder.description}</span>
                    </div>
                    <div className="flex flex-row gap-2 align-center justify-center">

                      <Trash className="w-5 h-5 text-red-700" cursor={"pointer"} />
                      <Edit className="w-5 h-5 text-blue-700" cursor={"pointer"} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}