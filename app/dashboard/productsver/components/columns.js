"use client";
import Checkbox from "./Checkbox";
import CellAction from "./cell-action";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        onChange={(e) => {
          const isChecked = e.target.checked;
          table.options.meta?.handleSelectAll(isChecked);
        }}
        checked={table.getIsAllRowsSelected()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.original.isSelected}
        onChange={row.original.onCheckboxChange}
      />
    ),
  },
  {
    accessorKey: "title",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(date);
      return <span>{formattedDate}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
