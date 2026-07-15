'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Minus, 
  Home as HomeIcon, 
  Layers, 
  Hammer, 
  Utensils, 
  Bath, 
  Home, 
  Grid, 
  Compass, 
  Zap, 
  HelpCircle,
  ChevronRight,
  ArrowRight,
  LucideIcon
} from 'lucide-react';
import styles from './page.module.css';

interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  scope: string[];
  details: string;
  faq: { q: string; a: string }[];
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'new-construction',
    title: 'New Construction',
    subtitle: 'Custom homes built from the ground up',
    icon: HomeIcon,
    scope: [
      'Site preparation, soil testing & excavation',
      'Structural foundation pouring & steel reinforcing',
      'Timber/steel framing & roof truss install',
      'Plumbing, electrical & HVAC rough-ins',
      'Drywall, premium paint, insulation & dynamic interiors',
      'Complete exterior cladding & landscaping integrations'
    ],
    details: 'Building a home from scratch is a significant journey. We manage the entire pipeline: structural engineering coordination, permitting submittals, construction phases, and finishing details. Our builds strictly adhere to California Building Code standards.',
    faq: [
      { q: 'How long does a new custom home build take?', a: 'Typically, a custom home build takes 8 to 14 months depending on the size, site conditions, permitting speeds, and architectural complexity.' },
      { q: 'Do you work with architects?', a: 'Yes! We frequently partner with local architects, or we can work with your pre-drafted plans.' }
    ]
  },
  {
    id: 'adu-additions',
    title: 'Accessory Dwelling Units (ADUs)',
    subtitle: 'Independent backyard units & home additions',
    icon: Layers,
    scope: [
      'Detached & attached ADU construction',
      'Garage conversions into modern living studios',
      'Home additions (adding bedrooms, family rooms, or stories)',
      'Utility line trenching & independent meters',
      'Smart spatial layouts for compact living'
    ],
    details: 'ADUs are a powerful way to expand your home value or gain rental income in California. Recent legislation makes it much easier to build ADUs. We specialize in maximizes space efficiency with high-end modern designs.',
    faq: [
      { q: 'What is the maximum size for an ADU in Sacramento?', a: 'State laws allow up to 1,200 sq ft for detached ADUs, though local lot restrictions or home-to-ADU ratios may apply.' },
      { q: 'Do ADUs require separate utility connections?', a: 'They can connect to the primary house utilities or have separate meters installed. We review both options to optimize budget.' }
    ]
  },
  {
    id: 'full-remodel',
    title: 'Full Home Remodel',
    subtitle: 'Complete interior & exterior home transformations',
    icon: Hammer,
    scope: [
      'Open concept layout transformations',
      'Load-bearing wall removals & steel header installs',
      'Modern flooring upgrades (hardwood, engineered, luxury vinyl)',
      'Subfloor leveling & structural reinforcements',
      'Full electrical service panel upgrades'
    ],
    details: 'Our full remodel services turn older structures into contemporary masterpieces. We handle structural modifications, complete floor layout changes, lighting schemes, and insulation upgrades for a unified, modern aesthetic.',
    faq: [
      { q: 'Can we live in the house during a full remodel?', a: 'For complete remodels involving structural walls, plumbing shut-offs, and floor-to-ceiling upgrades, we strongly recommend securing temporary lodging for safety.' }
    ]
  },
  {
    id: 'kitchens',
    title: 'Kitchen Remodeling',
    subtitle: 'Chef-grade modern kitchen upgrades',
    icon: Utensils,
    scope: [
      'Custom cabinetry design & installation',
      'Quartz, granite, or porcelain waterfall countertops',
      'Under-cabinet, toe-kick & designer pendant lighting',
      'Smart appliance integrations & gas line adjustments',
      'Under-mount sinks & commercial hardware'
    ],
    details: 'The kitchen is the heart of the home. We build kitchens that combine premium culinary function with high-end presentation: hidden spice racks, pull-out custom cabinets, premium islands, and durable luxury materials.',
    faq: [
      { q: 'How long does a kitchen remodel take?', a: 'Typically between 4 to 8 weeks, depending on whether we change the footprint or keep appliance hookups in place.' }
    ]
  },
  {
    id: 'bathrooms',
    title: 'Bathroom Renovations',
    subtitle: 'Spa-like master bathroom retrofits',
    icon: Bath,
    scope: [
      'Walk-in steam showers with custom tile work',
      'Frameless glass door enclosures',
      'Free-standing soaking tubs',
      'Floating vanity installs with dual basins',
      'Heated tile flooring systems'
    ],
    details: 'Turn your bathroom into a luxury retreat. We focus on modern waterproofing systems (like Schluter Systems) to guarantee structural integrity, combined with elegant design layouts, linear shower drains, and niche lighting.',
    faq: [
      { q: 'How do you prevent mold in new bathrooms?', a: 'We utilize advanced vapor-tight waterproofing backer boards, high-grade acrylic membranes, and install high-CFM quiet ventilation fans.' }
    ]
  },
  {
    id: 'roofing',
    title: 'Roofing Services',
    subtitle: 'Premium residential & commercial roofing',
    icon: Home,
    scope: [
      'Architectural composition shingles',
      'Modern standing seam metal roofing',
      'Flat roof TPO/EPDM membranes',
      'Underlayment replacements & roof deck repairs',
      'Attic venting & ridge vents'
    ],
    details: 'Protect your investment with premium roofing products. We install high-durability shingle and metal systems rated to withstand California summer heat waves and winter storms.',
    faq: [
      { q: 'How often should a roof be replaced?', a: 'Composition shingle roofs last 20-30 years, while metal roofs can easily exceed 50 years with minimal maintenance.' }
    ]
  },
  {
    id: 'siding',
    title: 'Facades & Siding',
    subtitle: 'Exterior cladding & siding replacements',
    icon: Grid,
    scope: [
      'James Hardie fiber cement siding',
      'Modern cedar accent siding panels',
      'Stucco patch & complete re-stucco',
      'House wrap weather barrier installations',
      'Premium exterior painting & trim details'
    ],
    details: 'Boost your home’s curb appeal and energy efficiency. We install durable siding designed to resist rot, termites, and fire, keeping your home beautiful and secure for decades.',
    faq: [
      { q: 'What is the best siding for California homes?', a: 'Fiber cement siding (like James Hardie) is highly recommended due to its excellent fire resistance and longevity in dry climates.' }
    ]
  },
  {
    id: 'landscape-decks',
    title: 'Landscape & Decks',
    subtitle: 'Custom backyard patios and woodwork',
    icon: Compass,
    scope: [
      'Multi-level composite & redwood decks',
      'Covered pergolas & patio overhead structures',
      'Stamping concrete & paver patios',
      'Built-in barbecue islands & fire pits',
      'Backyard lighting & privacy fencing'
    ],
    details: 'Expand your lifestyle to the outdoors. We construct premium decks using advanced framing, concrete pier foundations, and top-tier composite decking boards for high-durability and low-maintenance luxury.',
    faq: [
      { q: 'Does a deck require a building permit?', a: 'In California, decks over 30 inches off the ground or with roofing covers generally require building permits. We take care of all paperwork.' }
    ]
  },
  {
    id: 'electrical-plumbing',
    title: 'Electrical & Plumbing',
    subtitle: 'Full system updates & certified utility work',
    icon: Zap,
    scope: [
      '200A main service panel upgrades',
      'EV charger circuit installations',
      'Recessed LED layouts & smart home controls',
      'Copper-to-PEX water line repipes',
      'Tankless water heater upgrades'
    ],
    details: 'Safe and modern infrastructure is critical for any home. We handle full electrical layout design, panel replacements, and high-efficiency tankless water heaters to lower energy bills and guarantee safety.',
    faq: [
      { q: 'Why should I upgrade my electrical panel?', a: 'Older 100A panels are often insufficient for modern appliances, HVAC systems, and EV chargers. A 200A upgrade adds capacity and safety.' }
    ]
  },
  {
    id: 'other-services',
    title: 'Other Custom Services',
    subtitle: 'Specialty builds & commercial contracting',
    icon: HelpCircle,
    scope: [
      'Tenant improvements & commercial remodeling',
      'Custom timber framing & carpentry detailing',
      'Retaining wall engineering',
      'Structural inspection & earthquake retrofitting'
    ],
    details: 'Need a unique build or commercial layout upgrade? We take on complex custom carpentry projects, structural repairs, and light commercial renovations with professional precision.',
    faq: [
      { q: 'Do you handle light commercial renovations?', a: 'Yes. We do office remodels, retail store layout renovations, and tenant improvements in the Sacramento region.' }
    ]
  }
];

export default function Services() {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    if (expandedService === id) {
      setExpandedService(null);
    } else {
      setExpandedService(id);
    }
  };

  return (
    <div className={styles.servicesPage}>
      {/* Header Banner */}
      <section className={styles.banner}>
        <div className="container">
          <span className={styles.tagline}>Excellence In Construction</span>
          <h1 className={styles.bannerTitle}>Our Construction Services</h1>
          <p className={styles.bannerSubtitle}>
            Providing Sacramento with 10 core construction and remodeling capabilities. 
            Click any service card to view scope of work and FAQs.
          </p>
        </div>
      </section>

      {/* Services Accordion List */}
      <section className={styles.listSection}>
        <div className="container">
          <div className={styles.servicesList}>
            {SERVICES_DATA.map((service) => {
              const Icon = service.icon;
              const isExpanded = expandedService === service.id;

              return (
                <div 
                  key={service.id} 
                  id={service.id}
                  className={`${styles.serviceItem} ${isExpanded ? styles.expanded : ''}`}
                >
                  {/* Collapsed Header Bar */}
                  <div 
                    className={styles.itemHeader} 
                    onClick={() => toggleExpand(service.id)}
                  >
                    <div className={styles.headerLeft}>
                      <div className={styles.serviceIcon}>
                        <Icon size={24} />
                      </div>
                      <div>
                        <h2 className={styles.serviceTitle}>{service.title}</h2>
                        <p className={styles.serviceSubtitle}>{service.subtitle}</p>
                      </div>
                    </div>
                    <button className={styles.toggleBtn} aria-label="Toggle details">
                      {isExpanded ? <Minus size={20} /> : <Plus size={20} />}
                    </button>
                  </div>

                  {/* Expandable Details Area */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className={styles.detailsWrapper}
                      >
                        <div className={styles.detailsContent}>
                          <div className={styles.detailsGrid}>
                            {/* Left: General Info & Scope */}
                            <div className={styles.scopeCol}>
                              <h3 className={styles.subTitle}>Overview</h3>
                              <p className={styles.detailsText}>{service.details}</p>
                              
                              <h3 className={styles.subTitle}>Scope of Work Includes</h3>
                              <ul className={styles.scopeList}>
                                {service.scope.map((item, idx) => (
                                  <li key={idx}>
                                    <ChevronRight size={16} className="text-orange" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Right: FAQS */}
                            <div className={styles.faqCol}>
                              <h3 className={styles.subTitle}>Frequently Asked Questions</h3>
                              <div className={styles.faqList}>
                                {service.faq.map((item, idx) => (
                                  <div key={idx} className={styles.faqItem}>
                                    <h4 className={styles.faqQuestion}>{item.q}</h4>
                                    <p className={styles.faqAnswer}>{item.a}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* CTA Row */}
                          <div className={styles.detailsCta}>
                            <p>Ready to request a quote for this service?</p>
                            <Link href="/contact" className="btn btn-primary">
                              Get {service.title} Estimate <ArrowRight size={16} />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Builder Section */}
      <section className={styles.trustSection}>
        <div className="container">
          <div className={`${styles.trustBox} glass`}>
            <h2 className={styles.trustTitle}>Licensed & Bonded Professionals</h2>
            <p className={styles.trustText}>
              All work is executed by fully vetted local Sacramento tradespeople. 
              We strictly adhere to CSLB contractor requirements, environmental safety standards, and local city building permits.
            </p>
            <div className={styles.trustBadges}>
              <div className={styles.badge}>
                <span className={styles.badgeNum}>100%</span>
                <span className={styles.badgeLabel}>Code Compliant</span>
              </div>
              <div className={styles.badge}>
                <span className={styles.badgeNum}>$2M</span>
                <span className={styles.badgeLabel}>Liability Insurance</span>
              </div>
              <div className={styles.badge}>
                <span className={styles.badgeNum}>1yr+</span>
                <span className={styles.badgeLabel}>Workmanship Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
