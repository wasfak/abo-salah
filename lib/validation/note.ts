import { z } from "zod";

export const createProductSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  price: z.coerce
    .number()
    .min(0, { message: "Price must be a non-negative number" }),
  /*   reviews: z
    .array(
      z.object({
        reviewerName: z
          .string()
          .min(1, { message: "Reviewer name is required" }),
        reviewText: z.string().min(1, { message: "Review text is required" }),
        rating: z
          .number()
          .min(1)
          .max(5, { message: "Rating must be between 1 and 5" }),
      })
    )
    .optional(), */
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
