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
