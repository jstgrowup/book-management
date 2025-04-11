import Image from "next/image";
import React, { ReactNode } from "react";
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex flex-col lg:flex-row min-h-screen bg-[url('/images/pattern.webp')] bg-cover bg-top bg-dark-100">
      <section className=" min-h-screen w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="auth-box max-w-md w-full">
          <div className="flex flex-row gap-3 mb-6">
            <Image src={"/icons/logo.svg"} alt="logo" width={37} height={37} />
            <h1 className="text-2xl font-semibold text-white">My Book</h1>
          </div>
          <div>{children}</div>
        </div>
      </section>
      <section className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="/images/auth-illustration.png"
          alt="auth illustration"
          fill
          className="object-cover"
          priority
        />
      </section>
    </main>
  );
};

export default Layout;
