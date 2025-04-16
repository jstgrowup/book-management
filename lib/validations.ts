import { z } from "zod";
export const signUpSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  //   It takes the input value and tries to convert it to a number, even if the original input is a string.
  universityId: z.coerce.number(),
  universityCard: z.string().nonempty("University card is required"),
  password: z.string().min(8),
});
export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export const booksSchema = z.object({
  title: z.string().trim().min(2).max(100),
  description: z.string().trim().min(2).max(100),
  author: z.string().trim().min(2).max(100),
  genre: z.string().trim().min(2).max(100),
  rating: z.coerce.number().min(1).max(5),
  totalCopies: z.coerce.number().int().positive().lte(10000),
  coverUrl: z.string().nonempty(),
  coverColor: z.string().trim().min(2).max(100),
  videoUrl: z.string().trim().optional(),
  summary: z.string().trim().min(10),
});
