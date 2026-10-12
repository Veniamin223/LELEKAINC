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
  ArrowRight
} from 'lucide-react';
import styles from './page.module.css';

import { SERVICES_CONTENT } from '@/lib/services-content';

const SERVICE_ICONS = {
  'new-construction': HomeIcon,
  'adu-additions': Layers,
  'full-remodel': Hammer,
  kitchens: Utensils,
  bathrooms: Bath,
  roofing: Home,
  siding: Grid,
  'landscape-decks': Compass,
  'electrical-plumbing': Zap,
  'other-services': HelpCircle,
} as const;

const SERVICES_DATA = SERVICES_CONTENT.map((service) => ({
  ...service,
  icon: SERVICE_ICONS[service.id as keyof typeof SERVICE_ICONS],
}));
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
