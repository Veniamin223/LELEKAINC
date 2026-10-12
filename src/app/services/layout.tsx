import { pageMeta } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Construction Services in Sacramento County',
  description: 'New homes, ADUs, full remodels, kitchens, bathrooms, roofing, siding, and decks by Leleka Builder Inc., CSLB #1146118, in Sacramento County.',
  path: '/services',
});

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
