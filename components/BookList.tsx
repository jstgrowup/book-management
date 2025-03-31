import React from "react";

const BookList = ({
  title,
  books,
  containerClassName,
}: {
  title: string;
  books: IBook[];
  containerClassName: string;
}) => {
  return (
    <section>
      <h2 className="font-bebas-neue text-4xl text-light-100">Popular books</h2>
    </section>
  );
};

export default BookList;
