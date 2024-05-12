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
    <div className="max-w-7xl mx-auto px-2 py-6 sm:px-6 lg:px-8">
      {/* Adjust grid to have 3 columns and responsive design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Itemdisplayer product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
