"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

type prop = {
  route: string;
  text: string;
};

export default function RedirectButton({ route, text }: prop) {
  const router = useRouter();
  return <Button onClick={() => router.push(`${route}`)}>{text}</Button>;
}
