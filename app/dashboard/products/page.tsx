import Itemdisplayer from "@/components/Itemdisplayer";

import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs";

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

  return (
    <div className="">
      <div className="flex gap-4 p-2">
        {products.map((product) => (
          <Itemdisplayer product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
