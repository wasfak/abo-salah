import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs";
import Image from "next/image";

export default async function ProductsPage() {
  const { userId } = auth();
  if (!userId) {
    return <div>Not authorized</div>;
  }
  const products = await prisma.product.findMany({
    where: {
      clerkId: userId,
    },
  });
  console.log(products);

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h1>Name: {product.title}</h1>
          <Image
            src={product.images[0].url}
            width={200}
            height={200}
            alt="Product"
          />
        </div>
      ))}
    </div>
  );
}
