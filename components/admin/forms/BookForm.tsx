"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { booksSchema } from "@/lib/validations";
import { IBook } from "@/types/book.types";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "@/components/auth/FileUpload";
import ColorPicker from "@/components/admin/ColorPicker";
import { createBook } from "@/actions/book";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface IAuthFormPropsType extends Partial<IBook> {
  type?: "create" | "update";
}

const BookForm = ({ type, ...book }: IAuthFormPropsType) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof booksSchema>>({
    resolver: zodResolver(booksSchema),
    defaultValues: {
      title: "",
      description: "",
      author: "",
      genre: "",
      rating: 0,
      totalCopies: 0,
      coverUrl: "",
      coverColor: "",
      videoUrl: "",
      summary: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof booksSchema>) => {
    const result = await createBook({
      ...values,
      videoUrl: values.videoUrl ?? "",
    });

    if (result.success) {
      toast.success("Success", {
        description: "Book Created successfully",
      });
      router.push(`/admin/books/${result.data?.id}`);
    } else {
      toast.error("Failed!", {
        description: `${result.error}`,
      });
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 w-full "
      >
        <FormField
          control={form.control}
          name={"title"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Title
              </FormLabel>
              <FormControl>
                <Input
                  autoComplete="off"
                  required
                  placeholder="Book title"
                  {...field}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"author"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Author
              </FormLabel>
              <FormControl>
                <Input
                  autoComplete="off"
                  placeholder="Book author"
                  required
                  {...field}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"genre"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Genre
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Book genre"
                  autoComplete="off"
                  required
                  {...field}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"rating"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Rating
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Rating"
                  autoComplete="off"
                  min={1}
                  max={5}
                  required
                  {...field}
                  className="book-form_input"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"totalCopies"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Total Number of copies
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Total Copies"
                  autoComplete="off"
                  min={1}
                  max={10000}
                  required
                  {...field}
                  className="book-form_input"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"coverUrl"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Image
              </FormLabel>
              <FormControl>
                <FileUpload
                  onFileChange={field.onChange}
                  type="image"
                  accept="image/*"
                  placeholder="Upload your book cover image"
                  folder="books/covers"
                  variant="light"
                  value={field.value}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"coverColor"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Primary Color
              </FormLabel>
              <FormControl>
                <ColorPicker
                  value={field.value}
                  onPickerChange={field.onChange}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"videoUrl"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Video
              </FormLabel>
              <FormControl>
                <FileUpload
                  onFileChange={field.onChange}
                  type="video"
                  accept="video/*"
                  placeholder="Upload a book trailer"
                  folder="books/videos"
                  variant="light"
                  value={field.value}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"summary"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Summary
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Book Summary"
                  rows={10}
                  className="book-form_input"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"description"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Description
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Book description"
                  rows={10}
                  className="book-form_input"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="bg-blue-600" type="submit">
          Add Book to library
        </Button>
      </form>
    </Form>
  );
};

export default BookForm;
