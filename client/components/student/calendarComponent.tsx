"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";

export function CalendarComponent() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="w-full h-full">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-lg border shadow p-4 h-full"
      />
    </div>
  );
}
