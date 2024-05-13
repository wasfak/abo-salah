import Itemdisplayer from "@/components/Itemdisplayer";
import RedirectButton from "@/components/RedirectButton";

import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs";

export default async function CategoriesPage() {
  const { userId } = auth();
  if (!userId) {
    return <div>Not authorized</div>;
  }
  const categories = await prisma.category.findMany({
    where: {
      clerkId: userId,
    },
  });

  if (!categories || categories.length === 0) {
    return (
      <div className="flex items-center justify-between gap-x-4 p-4">
        <span>no categories!!</span>
        <RedirectButton
          route="/dashboard/categories/new"
          text="Create Category"
        />
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-2 py-6 sm:px-6 lg:px-8">
      {/* Adjust grid to have 3 columns and responsive design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <h1 key={category.id}>{category.name}</h1>
        ))}
      </div>
    </div>
  );
}
