"use server";

import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
interface ICreateBookProps {
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  videoUrl: string;
  summary: string;
}
export const createBook = async (params: ICreateBookProps) => {
  try {
    const newBook = await db
      .insert(books)
      .values({
        ...params,
        availableCopies: params.totalCopies,
      })
      .returning();

    return {
      success: true,
      data: newBook[0],
    };
  } catch (error) {
    return { success: false, error: "Error pccured while creating the " };
  }
};
