import Image from "next/image";
import React from "react";

const BookOverview = ({
  id,
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
  videoUrl,
  summary,
}: IBook) => {
  console.log("title:", title);
  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1 className="text-white">{title}</h1>
        <div className="book-info">
          <p className="font-semibold text-light-200">
            By <span>{author}</span>
          </p>
          <p className="font-semibold text-light-200">
            Category <span>{genre}</span>
          </p>
          <div className="flex flex-row gap-1">
            <Image src={"/icons/star.svg"} alt="star" width={22} height={22} />
            <p>{rating}</p>
          </div>
        </div>
        <div className="book-copies">
          {" "}
          <p>
            Total Books: <span>{totalCopies}</span>
          </p>
          <p>
            Available Books: <span>{availableCopies}</span>
          </p>
        </div>
        <p></p>
      </div>
    </section>
  );
};

export default BookOverview;
