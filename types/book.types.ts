export interface IBook {
  id: number;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  videoUrl?: string;
  summary: string;
  isLoanedBook?: boolean;
}
