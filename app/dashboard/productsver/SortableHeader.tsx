"use client";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SortableHeaderProps {
  column: any;
  title: string;
}

export function SortableHeader({ column, title }: SortableHeaderProps) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}
