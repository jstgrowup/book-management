"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { IAuthCreadentials } from "@/types/auth-credentials";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";
export const signUp = async (params: IAuthCreadentials) => {
  const { fullName, email, universityCard, universityId, password } = params;
  // const ip=
  const exsitingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email));
  if (exsitingUser.length) {
    return { success: false, error: "User already exists" };
  }
  const hashedPassword = await hash(password, 10);
  try {
    await db.insert(users).values({
      fullName,
      email,
      universityId,
      password: hashedPassword,
      universityCard,
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: "Error while signup" };
  }
};
export const signInWithCredentials = async (
  params: Pick<IAuthCreadentials, "email" | "password">
) => {
  const { email, password } = params;
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!result) {
      return { success: false, error: "Error while signin" };
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: "Error while signin" };
  }
};
