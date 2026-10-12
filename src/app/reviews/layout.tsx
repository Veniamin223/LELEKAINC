import { pageMeta } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Customer Reviews',
  description: 'Published homeowner reviews of Leleka Builder Inc., a licensed Sacramento County contractor. New reviews are checked before they appear.',
  path: '/reviews',
});

export default function ReviewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
