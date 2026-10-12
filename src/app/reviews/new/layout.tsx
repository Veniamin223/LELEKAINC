import { pageMeta } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Leave a Review',
  description: 'Send a review of your Leleka Builder Inc. project. It is published on lelekainc.com only after the company approves it.',
  path: '/reviews/new',
});

export default function NewReviewLayout({ children }: { children: React.ReactNode }) {
  return children;
}
