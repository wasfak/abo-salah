"use client";
import Image from "next/image";
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
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const firstImage = row.original.images?.[0]?.url;

      return firstImage ? (
        <Image
          width={40}
          height={40}
          src={firstImage}
          alt={row.original.title}
        />
      ) : null;
    },
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
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "categories",
    header: "Category",
    cell: ({ row }) => {
      const categories = row.original.categories?.map((c) => c.category) || [];

      return (
        <div>
          {categories.map((category) => (
            <span key={category.id} className="badge">
              {category.name}
            </span>
          ))}
        </div>
      );
    },
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
