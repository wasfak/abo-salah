import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function DashboardPage() {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="bg-[#f1f1f1] text-sm font-semibold min-h-screen min-w-screen p-2">
        <h1>DashBoard Page</h1>
      </div>
    </Suspense>
  );
}
