"use client"
import { TimeSlot } from "./schedule-content";
import { cn } from "@/lib/utils";
import { isSlotInthePast, isToday } from "./schedule-utils";

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

        const slotIsPast = dateIsToday && isSlotInthePast(slot.time);

        return (
          <Button
            onClick={() => onSelectTime(slot.time)}
            type="button" key={slot.time} variant="outline"
            className={cn(
              "w-full h-12 text-sm font-medium",
              selectedTime === slot.time && "border-2 border-emerald-500 text-primary",
            )}
            disabled={slotIsPast}
          >
            {slot.time}
          </Button>
        );
      })}

    </div>
  );
}