"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { z, ZodType } from "zod";
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
import Link from "next/link";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import ImageUpload from "./ImageUpload";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
// FieldValues: A generic type representing form values (an object with string keys and any values).
// Generic <T extends FieldValues>: Ensures T is an object (form values).
interface IAuthFormPropsType<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}
// A generic component that accepts T (form data shape) and props of type IAuthFormPropsType<T>.
// AuthForm is a generic component that can adapt to different form shapes (T) while maintaining strict type safety.
const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: IAuthFormPropsType<T>) => {
  const router = useRouter();
  const isSignIn = type === "SIGN_IN";
  const form: UseFormReturn<T> = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);

    if (result.success) {
      toast.success("Success", {
        description: isSignIn
          ? "You have successfully signed in"
          : "You have successfully signed up.",
      });
      router.push("/");
    } else {
      toast.error("Failed!", {
        description: `${result.error}`,
      });
    }
  };
  return (
    <div className="text-white">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn ? "Welcome Back" : "Create your account"}
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 w-full "
        >
          {Object.keys(defaultValues).map((field) => {
            return (
              <FormField
                key={field}
                control={form.control}
                name={field as Path<T>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                    </FormLabel>
                    <FormControl>
                      {field.name === "universityCard" ? (
                        <ImageUpload onFileChange={field.onChange} />
                      ) : (
                        <Input
                          autoComplete="off"
                          required
                          type={
                            FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                          }
                          {...field}
                          className="form-input"
                        />
                      )}
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}
          <Button type="submit" className="form-btn">
            {isSignIn ? "Sign In" : "Sign up "}
          </Button>
        </form>
      </Form>
      <p className="text-center text-base font-medium ">
        {isSignIn ? "New to Books? " : "Already have an account "}
        <Link
          className="font-bold text-primary"
          href={isSignIn ? "/sign-up" : "/sign-in"}
        >
          {" "}
          {isSignIn ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
