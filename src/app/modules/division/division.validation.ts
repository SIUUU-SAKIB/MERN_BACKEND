import { z } from "zod";

export const divisionSchema = z.object({
  name: z
    .string()
    .min(1, "Division name is required")
    .trim(),

  slug: z
    .string()
    .min(1, "Slug is required")
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format")
    .optional(),

  thumbnail: z
    .string()
    .url("Thumbnail must be a valid URL")
    .optional(),

  description: z
    .string()
    .optional(),
});


export const updateDivisionSchema = z.object({
    name: z.string().min(1).optional(),
    thumbnail: z.string().optional(),
    description: z.string().optional(),
});