import type { Metadata } from 'next';
import AdminConsole from './AdminConsole';

export const metadata: Metadata = {
  title: 'Review desk | Leleka Inc.',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main>
      <AdminConsole />
    </main>
  );
}
