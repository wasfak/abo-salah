import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }
  return (
    <div className="bg-[#f1f1f1] text-sm font-semibold min-h-screen min-w-screen p-2">
      <h1>DashBoard Page</h1>
    </div>
  );
}
