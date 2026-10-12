import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { getService, SERVICES_CONTENT } from '@/lib/services-content';
import { pageMeta, SITE_URL } from '@/lib/site';
import styles from './page.module.css';

export function generateStaticParams() {
  return SERVICES_CONTENT.map((service) => ({ slug: service.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMeta({
    title: `${service.title} in Sacramento`,
    description: service.details,
    path: `/services/${service.id}`,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.details,
    url: `${SITE_URL}/services/${service.id}`,
    areaServed: 'Sacramento County, California',
    provider: { '@id': `${SITE_URL}/#business` },
  };

  return (
    <article className={styles.page}>
      <JsonLd data={faq} />
      <JsonLd data={serviceLd} />
      <header className={styles.banner}>
        <div className="container">
          <p className={styles.crumb}>
            <Link href="/services">Services</Link>
            <span> / {service.title}</span>
          </p>
          <h1>{service.title} in Sacramento County</h1>
          <p>{service.subtitle}</p>
        </div>
      </header>
      <div className={`${styles.body} container`}>
        <p className={styles.lead}>{service.details}</p>
        <h2>What the work includes</h2>
        <ul>
          {service.scope.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <h2>Questions homeowners ask</h2>
        {service.faq.map((item) => (
          <section key={item.q} className={styles.faq}>
            <h3>{item.q}</h3>
            <p>{item.a}</p>
          </section>
        ))}
        <Link href="/contact" className="btn btn-primary">Request an estimate</Link>
      </div>
    </article>
  );
}
