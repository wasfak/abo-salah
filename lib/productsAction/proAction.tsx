"use server";
import { DiscountType } from "@prisma/client";
import { revalidatePath } from "next/cache";

import prisma from "../db/prisma";

import { auth } from "@clerk/nextjs";

import { CreateProductSchema } from "../validation/note";

export async function createProduct(product: CreateProductSchema) {
  try {
    const { userId } = auth();

    if (!userId) {
      return { status: 500, error: "not authed" };
    }
    const discountType = product.discountType
      ? DiscountType[product.discountType as keyof typeof DiscountType]
      : null;
    const newProduct = await prisma.product.create({
      data: {
        ...product,
        clerkId: userId,
        discountType,
      },
    });
    console.log(newProduct);

    revalidatePath("dashboard/products");
    return JSON.parse(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
    return { status: 500, error: error };
  }
}