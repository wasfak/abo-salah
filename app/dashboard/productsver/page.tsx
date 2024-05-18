"use client";
import { columns } from "../productsver/components/columns";
import { DataTable } from "@/components/ui/data-table";
import { getProducts } from "@/lib/productsAction/proAction";
import { Product } from "@prisma/client";
import { useEffect, useState } from "react";

export default function DemoPage() {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchData = async () => {
      setIsLoading(true);
      const res = await getProducts();
      if (!res || res.status !== 200) {
        console.error("Error fetching products");
        return;
      }
      if (res.items) {
        setData(res.items);

        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!mounted) {
    return null;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} searchKey="title" />
    </div>
  );
}
