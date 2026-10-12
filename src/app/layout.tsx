import type { Metadata } from 'next';
import './globals.css';
import SiteFrame from '@/components/SiteFrame';
import { JsonLd } from '@/components/JsonLd';
import { businessJsonLd, pageMeta, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...pageMeta({
    title: 'Construction and Remodeling in Sacramento',
    description: 'Leleka Builder Inc. (Leleka Inc.) is a California licensed general contractor, CSLB #1146118, in Fair Oaks. Custom homes, ADUs, kitchen and bathroom remodels, roofing, siding, and decks across Sacramento County.',
    path: '/',
  }),
  title: {
    default: 'Leleka Inc. | Construction and Remodeling in Sacramento',
    template: '%s | Leleka Inc.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <JsonLd data={businessJsonLd()} />
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}

