"use server";
import { DiscountType } from "@prisma/client";
import { revalidatePath } from "next/cache";

import prisma from "../db/prisma";

import { auth } from "@clerk/nextjs";

import { CreateProductSchema, CreateCategorySchema } from "../validation/note";

export async function createProduct(product: CreateProductSchema) {
  try {
    const { userId } = auth();

    if (!userId) {
      return { status: 500, error: "not Authenticated" };
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

export async function createCategory(categories: CreateCategorySchema) {
  try {
    const { userId } = auth();

    if (!userId) {
      return { status: 500, error: "not authed" };
    }
    // Assuming `categories.names` is an array of category names
    const categoryCreationPromises = categories.names.map(async (name) => {
      return prisma.category.create({
        data: {
          name: name,
          clerkId: userId, // Ensure that 'clerkId' is being set correctly based on your auth system
        },
      });
    });

    // Wait for all category creation promises to resolve
    const newCategories = await Promise.all(categoryCreationPromises);

    revalidatePath("dashboard/categories");
    return JSON.parse(JSON.stringify(newCategories));
  } catch (error) {
    console.log(error);
    return { status: 500, error: error };
  }
}
