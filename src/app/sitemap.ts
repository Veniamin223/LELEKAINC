import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { SERVICES_CONTENT } from '@/lib/services-content';
import { PROJECTS_CONTENT } from '@/lib/projects-content';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = ['', '/services', '/projects', '/contact', '/reviews', '/reviews/new'];
  const pages = staticPaths.map((path) => ({
    url: `${SITE_URL}${path || '/'}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }));
  const services = SERVICES_CONTENT.map((service) => ({
    url: `${SITE_URL}/services/${service.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
  const projects = PROJECTS_CONTENT.map((project) => ({
    url: `${SITE_URL}/projects/${project.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
  return [...pages, ...services, ...projects];
}
