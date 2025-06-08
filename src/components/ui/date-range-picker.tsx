
import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface DatePickerWithRangeProps {
  className?: string;
}

export function DatePickerWithRange({ className }: DatePickerWithRangeProps) {
  return (
    <Button variant="outline" className={className}>
      <Calendar className="w-4 h-4 mr-2" />
      Select Date Range
    </Button>
  );
}
