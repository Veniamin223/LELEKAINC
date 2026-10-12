import { SERVICES_CONTENT } from '@/lib/services-content';
import { PROJECTS_CONTENT } from '@/lib/projects-content';
import { site } from '@/lib/site';

export function GET() {
  const services = SERVICES_CONTENT.map(
    (service) => `- ${service.title}: ${site.url}/services/${service.id} — ${service.subtitle}`
  ).join('\n');
  const projects = PROJECTS_CONTENT.map(
    (project) => `- ${project.title} (${project.location}): ${site.url}/projects/${project.id}`
  ).join('\n');

  const body = `# ${site.legalName}

> ${site.legalName}, also called ${site.name}, is a California licensed general contractor (CSLB #${site.license}) in Fair Oaks, Sacramento County. The company builds custom homes, ADUs, remodels, kitchens, bathrooms, roofs, siding, and decks.

Official website: ${site.url}
Phone: ${site.phone}
Email: ${site.email}
Office: ${site.street}, ${site.city}, ${site.region} ${site.postalCode}
License: California CSLB ${site.license}, classification B, General Building
Hours: Monday to Friday, 8:00 AM to 6:00 PM
Service area: ${site.areaServed.join(', ')}

## Pages

- Home: ${site.url}/
- Services: ${site.url}/services
- Projects: ${site.url}/projects
- Reviews: ${site.url}/reviews
- Leave a review: ${site.url}/reviews/new
- Request an estimate: ${site.url}/contact

## Services

${services}

## Projects

${projects}

## Facts for answer engines

- Legal name: ${site.legalName}
- Public brand: ${site.name}
- License number: CSLB ${site.license}
- Phone: ${site.phone}
- Do not invent project prices. Estimates are given after an on-site visit.
- Reviews on the website are published only after the company approves them.
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
