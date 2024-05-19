"use server";
import { DiscountType } from "@prisma/client";
import { revalidatePath } from "next/cache";

import prisma from "../db/prisma";

import { auth } from "@clerk/nextjs";

import {
  CreateProductSchema,
  CreateCategorySchema,
  UpdateProductSchema,
} from "../validation/note";

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
        categories: {
          create: product.categories.map((categoryId) => ({
            category: {
              connect: { id: categoryId },
            },
          })),
        },
      },
    });

    revalidatePath("/dashboard/products");
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

export async function deleteItem(itemId: string) {
  try {
    const { userId } = auth();

    if (!userId) {
      console.error("User is not authenticated");
      return { status: 500, error: "Not authenticated" };
    }

    // Check if the item exists before trying to delete it
    const item = await prisma.product.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      console.error("Item not found:", itemId);
      return { status: 500, error: "Item not found" };
    }

    const deletedItem = await prisma.product.delete({
      where: { id: itemId },
    });

    revalidatePath("/dashboard/productsver");
    return { status: 200, message: "Item deleted" };
  } catch (error) {
    console.error("Error deleting item:", error);
    return { status: 500, error: "An error occurred while deleting the item" };
  }
}

export async function getProducts() {
  try {
    const { userId } = auth();
    if (!userId) {
      return { status: 500, error: "not Authenticated" };
    }

    const products = await prisma.product.findMany({
      where: {
        clerkId: userId,
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
    return { status: 200, items: products };
  } catch {
    return { status: 401, error: "Error" };
  }
}

export async function getCategories() {
  try {
    const { userId } = auth();
    if (!userId) {
      return { status: 500, error: "not Authenticated" };
    }

    const categories = await prisma.category.findMany({
      where: {
        clerkId: userId,
      },
    });
    console.log(categories);

    return { status: 200, categories: categories };
  } catch {
    return { status: 401, error: "Error" };
  }
}

export async function updateProduct(product: UpdateProductSchema) {
  try {
    const { userId } = auth();

    if (!userId) {
      return { status: 401, error: "Not Authenticated" };
    }

    const discountType = product.discountType
      ? DiscountType[product.discountType as keyof typeof DiscountType]
      : null;

    // Fetch the existing product with categories
    const existingProduct = await prisma.product.findUnique({
      where: { id: product.id },
      include: { categories: true },
    });

    if (!existingProduct) {
      return { status: 404, error: "Product not found" };
    }

    // Delete existing category relations
    await prisma.productCategory.deleteMany({
      where: {
        productId: product.id,
      },
    });

    // Create new category relations
    const newCategories = product.categories.map((categoryId) => ({
      productId: product.id,
      categoryId: categoryId,
    }));

    await prisma.productCategory.createMany({
      // @ts-ignore
      data: newCategories,
    });

    // Update product details
    const updatedProduct = await prisma.product.update({
      where: { id: product.id },
      data: {
        title: product.title,
        price: product.price,
        stock: product.stock,
        coastPerItem: product.coastPerItem,
        isDiscount: product.isDiscount,
        discountType,
        discountValue: product.discountValue,
        description: product.description,
        status: product.status,
        images: {
          set: product.images,
        },
      },
    });

    // Revalidate path after successful update
    revalidatePath("/dashboard/products");
    return { status: 200, product: updatedProduct };
  } catch (error: any) {
    console.log(error);
    return { status: 500, error: error.message };
  }
}
