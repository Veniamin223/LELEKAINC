import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { getProject, PROJECTS_CONTENT } from '@/lib/projects-content';
import { pageMeta, SITE_URL } from '@/lib/site';
import styles from './page.module.css';

export function generateStaticParams() {
  return PROJECTS_CONTENT.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMeta({
    title: `${project.title} in ${project.location}`,
    description: project.description,
    path: `/projects/${project.id}`,
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const projectLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    url: `${SITE_URL}/projects/${project.id}`,
    image: `${SITE_URL}${project.image}`,
    contentLocation: project.location,
    creator: { '@id': `${SITE_URL}/#business` },
  };

  return (
    <article className={styles.page}>
      <JsonLd data={projectLd} />
      <header className={styles.banner}>
        <div className="container">
          <p className={styles.crumb}>
            <Link href="/projects">Projects</Link>
            <span> / {project.title}</span>
          </p>
          <h1>{project.title}</h1>
          <p>{project.location} · {project.categoryLabel} · {project.specs.size} · {project.specs.duration}</p>
        </div>
      </header>
      <div className={`${styles.body} container`}>
        <div className={styles.photo}>
          <Image src={project.image} alt={`${project.title} in ${project.location}`} fill sizes="(max-width: 900px) 100vw, 960px" />
        </div>
        <p className={styles.lead}>{project.description}</p>
        <h2>What was built</h2>
        <ul>
          {project.specs.features.map((feature) => <li key={feature}>{feature}</li>)}
        </ul>
        <Link href="/contact" className="btn btn-primary">Discuss a similar project</Link>
      </div>
    </article>
  );
}
