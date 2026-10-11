export type ReviewStatus = 'pending' | 'published' | 'hidden';

export type Review = {
  id: string;
  name: string;
  email: string;
  location: string;
  project: string;
  rating: number;
  body: string;
  status: ReviewStatus;
  createdAt: string;
  publishedAt: string | null;
};

export type PublicReview = Pick<Review, 'id' | 'name' | 'location' | 'project' | 'rating' | 'body' | 'publishedAt'>;
