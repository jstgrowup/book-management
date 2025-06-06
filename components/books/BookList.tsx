import React from "react";
import BookCard from "./BookCard";
import { IBook } from "@/types/book.types";
interface IBookListProps {
  title: string;
  books: IBook[];
  containerClassName?: string;
}
const BookList = ({ title, books, containerClassName }: IBookListProps) => {
  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-4xl text-light-100">Popular books</h2>
      <ul className="book-list">
        {books.map((book) => (
          <BookCard key={book.title} {...book} />
        ))}
      </ul>
    </section>
  );
};

export default BookList;
