"use client";
import { signUp } from "@/actions/auth";
import AuthForm from "@/components/auth/AuthForm";
import { signUpSchema } from "@/lib/validations";
import React from "react";
const Page = () => {
  return (
    <AuthForm
      type={"SIGN_UP"}
      schema={signUpSchema}
      defaultValues={{
        email: "",
        password: "",
        fullName: "",
        universityId: 0,
        universityCard: "",
      }}
      onSubmit={signUp}
    />
  );
};

export default Page;
