import BookList from "@/components/books/BookList";
import BookOverview from "@/components/books/BookOverview";
import { sampleBooks } from "@/constants";

export default function Home() {
  return (
    <div className="text-white">
      <BookOverview {...sampleBooks[0]} />
      <BookList
        title="Latest Books"
        books={sampleBooks}
        containerClassName="mt-28"
      />
    </div>
  );
}
