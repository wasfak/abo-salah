"use server";

import { revalidatePath } from "next/cache";

import prisma from "../db/prisma";

import { auth } from "@clerk/nextjs";
import { Product } from "@prisma/client";
import { CreateProductSchema } from "../validation/note";

export async function createProduct(product: CreateProductSchema) {
  const { title, price, images } = product;
  try {
    const { userId } = auth();

    if (!userId) {
      return { status: 500, error: "not authed" };
    }
    const newProduct = await prisma.product.create({
      data: {
        title,
        price,
        images,
        clerkId: userId,
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
