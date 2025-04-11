"use client";
import { signInWithCredentials } from "@/actions/auth";
import AuthForm from "@/components/auth/AuthForm";
import { signInSchema } from "@/lib/validations";
import React from "react";
const Page = () => {
  return (
    <AuthForm
      type={"SIGN_IN"}
      schema={signInSchema}
      defaultValues={{ email: "", password: "" }}
      onSubmit={signInWithCredentials}
    />
  );
};

export default Page;
