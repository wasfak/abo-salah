import { z } from "zod";

export const createProductSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  price: z.coerce
    .number()
    .min(0, { message: "Price must be a non-negative number" }),
  coastPerItem: z.coerce.number().optional(),
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
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;

export const updateProductSchema = createProductSchema.extend({
  id: z.string().min(1),
});

export const deleteProductSchema = z.object({
  id: z.string().min(1),
});

export const createCategorySchema = z.object({
  names: z.array(z.string().min(1, { message: "Category name is required" })),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
