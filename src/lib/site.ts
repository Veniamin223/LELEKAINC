import type { Metadata } from 'next';

export const SITE_URL = 'https://lelekainc.com';

export const site = {
  name: 'Leleka Inc.',
  legalName: 'Leleka Builder Inc.',
  url: SITE_URL,
  phone: '+1 (916) 539-9005',
  phoneTel: '+19165399005',
  email: 'lelekainc.ca@gmail.com',
  license: '1146118',
  street: '8475 Friar Tuck Way',
  city: 'Fair Oaks',
  region: 'CA',
  postalCode: '95628',
  country: 'US',
  hours: 'Mo-Fr 08:00-18:00',
  image: '/hero-home.jpg',
  areaServed: [
    'Sacramento',
    'Fair Oaks',
    'Roseville',
    'Folsom',
    'Elk Grove',
    'Rancho Cordova',
    'Citrus Heights',
    'Rocklin',
    'El Dorado Hills',
  ],
  sameAs: [
    'https://www.buildzoom.com/contractor/leleka-builder-inc',
    'https://nationalcontractorindex.com/contractors/leleka-builder-inc/',
    'https://sacvalleycontractors.com/contractor/1146118/',
    'https://www.prelien.co/contractor/leleka-builder-inc-1146118',
    'https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx',
  ],
};

export function pageMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type: 'website',
      locale: 'en_US',
      images: [{ url: site.image, width: 1200, height: 675, alt: 'Modern California home built by Leleka Inc.' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [site.image],
    },
  };
}

export function businessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    '@id': `${SITE_URL}/#business`,
    name: site.legalName,
    alternateName: site.name,
    url: SITE_URL,
    image: `${SITE_URL}${site.image}`,
    telephone: site.phoneTel,
    email: site.email,
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.street,
      addressLocality: site.city,
      addressRegion: site.region,
      postalCode: site.postalCode,
      addressCountry: site.country,
    },
    areaServed: site.areaServed.map((name) => ({
      '@type': 'City',
      name,
      containedInPlace: { '@type': 'AdministrativeArea', name: 'Sacramento County, California' },
    })),
    openingHours: site.hours,
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'California contractor license',
      identifier: `CSLB ${site.license}`,
      recognizedBy: {
        '@type': 'GovernmentOrganization',
        name: 'Contractors State License Board',
      },
    },
    sameAs: site.sameAs,
  };
}
