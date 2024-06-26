import { z } from "zod";

export const createProductSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  price: z.coerce
    .number()
    .min(0, { message: "Price must be a non-negative number" }),
  stock: z.coerce
    .number()
    .min(0, { message: "Stock must be a non-negative number" }),
  coastPerItem: z.coerce.number(),
  isDiscount: z.boolean(),
  discountType: z.enum(["PERCENTAGE", "FIXED"]).optional(),
  discountValue: z.coerce.number().optional(),
  description: z.string().min(1, { message: "Description is required" }),
  status: z.enum(["ACTIVE", "OUTOFSTOCK", "ARCHIVED"]),
  images: z
    .array(
      z.object({
        url: z.string().url({ message: "Must be a valid URL" }),
        caption: z.string().optional(),
      })
    )
    .optional(),
  categories: z.array(z.string()), // Ensure this line is included
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;

export const updateProductSchema = createProductSchema.extend({
  id: z.string().min(1, { message: "Product ID is required" }).optional(),
  clerkId: z.string().min(1, { message: "Clerk ID is required" }).optional(),
});

export type UpdateProductSchema = z.infer<typeof updateProductSchema>;
export const deleteProductSchema = z.object({
  id: z.string().min(1),
});

export const createCategorySchema = z.object({
  names: z.array(z.string().min(1, { message: "Category name is required" })),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
