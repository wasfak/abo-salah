import Itemdisplayer from "@/components/Itemdisplayer";
import RedirectButton from "@/components/RedirectButton";
import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function ProductsPage() {
  const { userId } = auth();

  if (!userId) {
    return <div>Not authorized</div>;
  }

  let products;
  try {
    products = await prisma.product.findMany({
      where: {
        clerkId: userId as string,
      },
      /*    cacheStrategy: {
        ttl: 30,
        swr: 60,
      }, */
    });
  } catch (error) {
    console.error("Error fetching products:", error);

    redirect("/dashboard");
  }

  if (!products || products.length === 0) {
    return (
      <div className="p-4 flex gap-x-2 items-center">
        <h1 className="text-red-700 font-bold">You Have No Products</h1>
        <RedirectButton route="/dashboard/products/new" text="Create Product" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col items-center bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <Itemdisplayer product={product} />
            </div>
          ))}
        </div>
      </Suspense>
    </div>
  );
}
