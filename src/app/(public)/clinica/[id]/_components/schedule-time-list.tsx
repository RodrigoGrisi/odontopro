"use client"
import { TimeSlot } from "./schedule-content";
import { cn } from "@/lib/utils";
import { isSlotInthePast, isSlotSequenceAvaliable, isToday } from "./schedule-utils";

interface ScheduleTimeListProps {
  selectedDate: Date;
  selectedTime: string;
  requiredSlot: number;
  blockedTimes: string[];
  avaliableTimeSlots: TimeSlot[];
  clinicTimes: string[];
  onSelectTime: (time: string) => void;
}
import { Button } from "@/components/ui/button";
export function ScheduleTimeList({
  selectedDate,
  selectedTime,
  requiredSlot,
  blockedTimes,
  avaliableTimeSlots,
  clinicTimes,
  onSelectTime
}: ScheduleTimeListProps) {

  const dateIsToday = isToday(selectedDate);


  return (
    <div className="grid grid-cols-5 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
      {avaliableTimeSlots.map((slot) => {

        const sequenceOk = isSlotSequenceAvaliable(slot.time, requiredSlot, clinicTimes, blockedTimes);

        const slotIsPast = dateIsToday && isSlotInthePast(slot.time);

        const slotEnable = slot.avaliable && sequenceOk && !slotIsPast;

        return (
          <Button
            onClick={() => slotEnable && onSelectTime(slot.time)}
            type="button" key={slot.time} variant="outline"
            className={cn(
              "w-full h-12 text-sm font-medium",
              selectedTime === slot.time && "border-2 border-emerald-500 text-primary",
              !slotEnable && "text-muted-foreground cursor-not-allowed  bg-red-950",
            )}
            disabled={!slotEnable}
          >
            {slot.time}
          </Button>
        );
      })}

    </div>
  );
}