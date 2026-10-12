import { pageMeta } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Request a Construction Estimate',
  description: 'Request an on-site estimate from Leleka Builder Inc. in Fair Oaks. Call +1 (916) 539-9005 or send project details for Sacramento County.',
  path: '/contact',
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
