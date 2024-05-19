import EditProductForm from "@/components/EditProductForm";
import prisma from "@/lib/db/prisma";
import React from "react";

type UpdateProp = {
  params: {
    productId: string;
  };
};

export default async function UpdateProduct({ params }: UpdateProp) {
  const product = await prisma.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      categories: {
        include: {
          category: true, // Include the category details
        },
      },
    },
  });
  if (!product) {
    return <div>Product not found</div>;
  }

  return <EditProductForm product={product} />;
}
