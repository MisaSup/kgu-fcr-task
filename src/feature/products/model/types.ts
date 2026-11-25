import { z } from "zod";

export const productSchema = z.object({
  id: z.string(),
  title: z.string(),
  price: z.number(),
  description: z.string().optional(),
  image: z.string().optional(),
});

export const productsSchema = z.array(productSchema);

export type Product = z.infer<typeof productSchema>;
