"use client";
import { cn, getInitials } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Session } from "next-auth";

const Header: React.FC<{ session: Session | null }> = ({ session }) => {
  const pathname = usePathname();
  return (
    <header className="my-10 flex justify-between gap-5 text-white">
      <Link href="/">
        <Image src={"/icons/logo.svg"} width={40} height={40} alt="logo" />
      </Link>
      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            href={"/library"}
            className={cn(
              "text-base cursor-pointer capitalize",
              pathname === "/library" ? "text-light-200" : "text-light-100"
            )}
          >
            Library
          </Link>
        </li>
        <li>
          <Link
            href={"/my-profile"}
            className="text-base cursor-pointer capitalize "
          >
            <Avatar>
              <AvatarFallback className="text-black bg-amber-100">
                {getInitials(session?.user?.name || "User")}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
