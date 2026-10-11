import type { Metadata } from 'next';
import './globals.css';
import SiteFrame from '@/components/SiteFrame';

export const metadata: Metadata = {
  title: 'Leleka Inc. | Modern Construction & Remodeling Sacramento',
  description: 'Leleka Inc. delivers custom home building, ADUs, kitchen/bathroom remodeling, roofing, and siding in Sacramento County, CA. Bold designs & high-performance craftsmanship.',
  keywords: 'Construction, Remodeling, Sacramento, ADU, Home Builder, Kitchen Remodel, Bathroom Remodel, Roofing, Siding, Decks, Patio, California',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
