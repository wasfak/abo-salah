"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function NavigateButton() {
  const router = useRouter();
  return (
    <Button onClick={() => router.push("/dashboard/products/new")}>
      Add Product
    </Button>
  );
}
