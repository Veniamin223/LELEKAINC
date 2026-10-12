import { pageMeta } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Construction Projects in Sacramento County',
  description: 'ADU, remodel, kitchen, and deck projects completed by Leleka Builder Inc. in Sacramento, Roseville, Folsom, and Elk Grove.',
  path: '/projects',
});

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
