"use client";

import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { columns } from "./columns";
import ApiList from "@/components/ui/api-list";

const ProductClient = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage Products for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <hr />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="API calls for Products" />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
};

export default ProductClient;
