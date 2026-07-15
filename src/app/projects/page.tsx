'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Landmark, MapPin, X } from 'lucide-react';
import styles from './page.module.css';

interface Project {
  id: string;
  title: string;
  category: 'new-build' | 'remodel' | 'adu' | 'deck';
  categoryLabel: string;
  location: string;
  image: string;
  description: string;
  specs: {
    duration: string;
    size: string;
    features: string[];
  };
}

const PROJECTS_DATA: Project[] = [
  {
    id: 'adu-sacramento',
    title: 'Modern ADU Addition',
    category: 'adu',
    categoryLabel: 'ADU / Addition',
    location: 'Sacramento, CA',
    image: '/projects/adu_addition.png',
    description: 'A custom, detached accessory dwelling unit built to maximize utility and aesthetic flow in a residential backyard. Features high-efficiency windows, durable standing seam detailing, custom wood accents, and a fully equipped private kitchen and bathroom.',
    specs: {
      duration: '5 Months',
      size: '750 sq ft',
      features: ['Independent Power Meter', 'Smart Space Planning', 'Durable Wood-Style Cladding', 'Energy-Efficient Insulation']
    }
  },
  {
    id: 'remodel-roseville',
    title: 'Contemporary Home Remodeling',
    category: 'remodel',
    categoryLabel: 'Full Remodel',
    location: 'Roseville, CA',
    image: '/projects/home_remodel.png',
    description: 'Complete transformation of a 1990s floor plan into a spacious, light-filled contemporary open-concept layout. The renovation involved the demolition of three non-structural walls, installation of a massive structural steel load-bearing header, recessed lighting design, and premium engineered oak flooring.',
    specs: {
      duration: '3.5 Months',
      size: '2,100 sq ft',
      features: ['Load-Bearing Wall Demolition', 'Engineered Oak Flooring', 'Integrated Ambient LED Panels', 'Modern Dual-Zone HVAC Control']
    }
  },
  {
    id: 'deck-folsom',
    title: 'Custom Backyard & Deck Project',
    category: 'deck',
    categoryLabel: 'Landscape / Deck',
    location: 'Folsom, CA',
    image: '/projects/backyard_deck.png',
    description: 'An elegant multi-level composite redwood deck engineered for extreme durability and low-maintenance luxury. It wraps around the backyard slope and includes built-in seating, custom concrete paver borders, safety-rated ambient step lighting, and an integrated pergola overhead cover.',
    specs: {
      duration: '4 Weeks',
      size: '950 sq ft',
      features: ['TimberTech Composite Decking', 'Custom Ambient Stair Lighting', 'Engineered Concrete Pier Footer', 'Integrated Cedar Pergola']
    }
  },
  {
    id: 'kitchen-elkgrove',
    title: 'Kitchen Remodeling Excellence',
    category: 'remodel',
    categoryLabel: 'Kitchen Remodel',
    location: 'Elk Grove, CA',
    image: '/projects/kitchen_remodel.png',
    description: 'A master chef-grade kitchen rebuild with high-end modern visual aesthetics. Includes custom walnut cabinets with soft-close joints, a stunning double-waterfall quartz island, premium commercial appliances, under-cabinet lighting system, and a custom built-in pantry.',
    specs: {
      duration: '6 Weeks',
      size: '320 sq ft',
      features: ['Waterfall Quartz Island', 'Custom Walnut Cabinets', 'Commercial Smart Range & Hood', 'Hidden Outlets & USB Ports']
    }
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'new-build', label: 'New Builds' },
  { id: 'remodel', label: 'Remodels' },
  { id: 'adu', label: 'ADUs' },
  { id: 'deck', label: 'Decks & Patios' }
];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Handle URL query parameters (e.g. from global search)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const projectId = urlParams.get('id');
      if (projectId) {
        const found = PROJECTS_DATA.find(p => p.id === projectId);
        if (found) {
          setTimeout(() => {
            setActiveProject(found);
          }, 0);
        }
      }
    }
  }, []);

  // Filter projects based on category and search query
  const filteredProjects = PROJECTS_DATA.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    
    if (searchQuery.trim() === '') {
      return matchesCategory;
    }
    
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      p.title.toLowerCase().includes(query) || 
      p.location.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query);
      
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={styles.projectsPage}>
      {/* Banner */}
      <section className={styles.banner}>
        <div className="container">
          <span className={styles.tagline}>Portfolio & Craftsmanship</span>
          <h1 className={styles.bannerTitle}>Our Recent Projects</h1>
          <p className={styles.bannerSubtitle}>
            Explore our real-world construction builds and home remodeling transformations across Sacramento County.
          </p>
        </div>
      </section>

      {/* Filter and Search Controls */}
      <section className={styles.gallerySection}>
        <div className="container">
          <div className={styles.controlsRow}>
            {/* Category Pills */}
            <div className={styles.categoryFilters}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`${styles.filterBtn} ${selectedCategory === cat.id ? styles.activeFilter : ''}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Inline Search */}
            <div className={styles.searchBox}>
              <Search size={18} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search projects by town or details..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className={styles.clearBtn}>
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Grid Gallery */}
          <motion.div layout className={styles.projectsGrid}>
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={project.id}
                  className={styles.projectCard}
                  onClick={() => setActiveProject(project)}
                >
                  <div className={styles.cardImgWrapper}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={styles.cardImg}
                    />
                    <div className={styles.cardOverlay}>
                      <span className={styles.viewBadge}>View Specs</span>
                    </div>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.cardMeta}>
                      <span className={styles.cardCategory}>{project.categoryLabel}</span>
                      <span className={styles.cardLoc}>
                        <MapPin size={12} className="text-orange" />
                        {project.location}
                      </span>
                    </div>
                    <h3 className={styles.cardTitle}>{project.title}</h3>
                    <p className={styles.cardDesc}>{project.description}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className={styles.noResults}>
              <p>No projects match your current filters or keyword.</p>
              <button 
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className="btn btn-outline"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {activeProject && (
          <div className={styles.modalOverlay} onClick={() => setActiveProject(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className={styles.modalCard}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <button onClick={() => setActiveProject(null)} className={styles.modalCloseBtn} aria-label="Close modal">
                <X size={24} />
              </button>

              <div className={styles.modalGrid}>
                {/* Visual */}
                <div className={styles.modalVisual}>
                  <Image
                    src={activeProject.image}
                    alt={activeProject.title}
                    fill
                    className={styles.modalImg}
                  />
                </div>

                {/* Details */}
                <div className={styles.modalDetails}>
                  <span className={styles.modalBadge}>{activeProject.categoryLabel}</span>
                  <h2 className={styles.modalTitle}>{activeProject.title}</h2>
                  <div className={styles.modalLoc}>
                    <MapPin size={16} className="text-orange" />
                    <span>{activeProject.location}</span>
                  </div>

                  <p className={styles.modalDesc}>{activeProject.description}</p>

                  <div className={styles.modalSpecs}>
                    <h3 className={styles.specsTitle}>Project Specifications</h3>
                    
                    <div className={styles.specsGrid}>
                      <div className={styles.specItem}>
                        <Calendar size={18} className="text-orange" />
                        <div>
                          <span className={styles.specLabel}>Duration</span>
                          <span className={styles.specVal}>{activeProject.specs.duration}</span>
                        </div>
                      </div>
                      <div className={styles.specItem}>
                        <Landmark size={18} className="text-orange" />
                        <div>
                          <span className={styles.specLabel}>Total Size</span>
                          <span className={styles.specVal}>{activeProject.specs.size}</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.featuresSection}>
                      <span className={styles.featuresTitle}>Highlights & Materials:</span>
                      <ul className={styles.featuresList}>
                        {activeProject.specs.features.map((feature, idx) => (
                          <li key={idx}>
                            <div className={styles.bullet} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className={styles.modalCta}>
                    <Link href="/contact" className="btn btn-primary" onClick={() => setActiveProject(null)}>
                      Discuss Similar Project
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
