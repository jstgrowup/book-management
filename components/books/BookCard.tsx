import { IBook } from "@/types/book.types";
import Link from "next/link";
import React from "react";
import BookCover from "./BookCover";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";

const BookCard = ({
  id,
  title,
  genre,
  coverColor,
  coverImage,
  isLoanedBook = false,
}: IBook) => {
  return (
    <li className={cn(isLoanedBook && "xs:w-52 w-full")}>
      <Link
        href={`/books/${id}`}
        className={cn(isLoanedBook && "w-full flex flex-col items-center")}
      >
        <BookCover coverColor={coverColor} coverImage={coverImage} />
        <div className={cn("mt-4", !isLoanedBook && "xs:max-w-40 max-w-28")}>
          <p className="book-title">{title}</p>
          <p className="book-genre">{genre}</p>
        </div>
        {isLoanedBook && (
          <div className="mt-3 w-full">
            <div className="book-loaned">
              <Image
                src={"/icons/calendar.svg"}
                alt="calender"
                height={18}
                width={18}
              />
              <p className="text-light-100">11 days left to return</p>
            </div>
            <Button className="book-btn">Download recipt</Button>
          </div>
        )}
      </Link>
    </li>
  );
};

export default BookCard;
