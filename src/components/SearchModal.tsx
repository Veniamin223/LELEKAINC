'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Briefcase, Wrench } from 'lucide-react';
import styles from './SearchModal.module.css';

interface SearchItem {
  id: string;
  title: string;
  category: 'service' | 'project';
  description: string;
  link: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SEARCH_DATABASE: SearchItem[] = [
  // Services
  {
    id: 's-1',
    title: 'New Construction (House building from scratch)',
    category: 'service',
    description: 'Custom home building from initial site preparation to final architectural finishing.',
    link: '/services#new-construction'
  },
  {
    id: 's-2',
    title: 'ADU (Accessory Dwelling Units) & Additions',
    category: 'service',
    description: 'Expand your living space with secondary dwellings, backyard cottages, or house extensions.',
    link: '/services#adu-additions'
  },
  {
    id: 's-3',
    title: 'Full Home Remodel',
    category: 'service',
    description: 'Transform your existing residence with custom design planning, wall removals, and modern rebuilds.',
    link: '/services#full-remodel'
  },
  {
    id: 's-4',
    title: 'Kitchen Remodeling',
    category: 'service',
    description: 'Luxury cabinet installations, stone countertops, custom islands, and plumbing fixtures.',
    link: '/services#kitchen-bathroom'
  },
  {
    id: 's-5',
    title: 'Bathroom Renovations',
    category: 'service',
    description: 'Premium tile work, walk-in steam showers, free-standing tubs, and modern vanity installs.',
    link: '/services#kitchen-bathroom'
  },
  {
    id: 's-6',
    title: 'Roofing Services',
    category: 'service',
    description: 'Full roof replacements, roof inspections, commercial shingle layovers, and storm repairs.',
    link: '/services#roofing-siding'
  },
  {
    id: 's-7',
    title: 'Facades & Siding',
    category: 'service',
    description: 'Boost curb appeal with vinyl, fiber cement stucco siding, and exterior paint jobs.',
    link: '/services#roofing-siding'
  },
  {
    id: 's-8',
    title: 'Landscape & Custom Decks',
    category: 'service',
    description: 'Custom wood/composite deck installations, stone patios, fire pits, and backyard hardscaping.',
    link: '/services#landscaping-decks'
  },
  {
    id: 's-9',
    title: 'Electrical & Plumbing',
    category: 'service',
    description: 'Certified electrical rewiring, lighting designs, main water line replacements, and water heaters.',
    link: '/services#electrical-plumbing'
  },
  {
    id: 's-10',
    title: 'Commercial & Custom Projects',
    category: 'service',
    description: 'Retail build-outs, tenant improvements, custom carpentry, and specialty structures.',
    link: '/services#other-services'
  },
  // Projects
  {
    id: 'p-1',
    title: 'Modern ADU Addition in Sacramento',
    category: 'project',
    description: 'A 750 sq ft independent backyard ADU with modern minimalist aesthetics and full kitchen.',
    link: '/projects?id=adu-sacramento'
  },
  {
    id: 'p-2',
    title: 'Contemporary Home Remodeling in Roseville',
    category: 'project',
    description: 'Open-concept layout upgrade including custom load-bearing beam installation and wide-plank flooring.',
    link: '/projects?id=remodel-roseville'
  },
  {
    id: 'p-3',
    title: 'Custom Backyard & Deck Project in Folsom',
    category: 'project',
    description: 'Multi-tiered redwood deck featuring built-in LED ambient lighting and custom concrete patio.',
    link: '/projects?id=deck-folsom'
  },
  {
    id: 'p-4',
    title: 'Kitchen Remodeling Excellence in Elk Grove',
    category: 'project',
    description: 'Gourmet chef kitchen remodel with waterfall quartz island, custom walnut cabinets, and smart appliances.',
    link: '/projects?id=kitchen-elkgrove'
  }
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Compute search results directly during render
  const results = query.trim() === ''
    ? []
    : SEARCH_DATABASE.filter((item) => {
        const matchText = `${item.title} ${item.description}`.toLowerCase();
        return matchText.includes(query.toLowerCase());
      });

  if (!isOpen) return null;

  const handleResultClick = (link: string) => {
    onClose();
    router.push(link);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <header className={styles.header}>
          <Search size={22} className={styles.searchIcon} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search projects, services (e.g. ADU, kitchen)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.input}
          />
          <button onClick={onClose} className={styles.closeBtn} aria-label="Close search">
            <X size={20} />
          </button>
        </header>

        <div className={styles.content}>
          {query.trim() === '' ? (
            <div className={styles.emptyState}>
              <p>Type to search our services and projects...</p>
              <div className={styles.shortcuts}>
                <span>Popular:</span>
                <button onClick={() => setQuery('ADU')} className={styles.tag}>ADU</button>
                <button onClick={() => setQuery('Kitchen')} className={styles.tag}>Kitchen</button>
                <button onClick={() => setQuery('Remodeling')} className={styles.tag}>Remodeling</button>
                <button onClick={() => setQuery('New Construction')} className={styles.tag}>New Construction</button>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No results found for &ldquo;<strong>{query}</strong>&rdquo;</p>
              <p className={styles.sub}>Check spelling or try a different keyword.</p>
            </div>
          ) : (
            <div className={styles.resultsList}>
              <p className={styles.resultsCount}>{results.length} results found</p>
              {results.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleResultClick(item.link)}
                  className={styles.resultItem}
                >
                  <div className={styles.resultIcon}>
                    {item.category === 'service' ? (
                      <Wrench size={18} className="text-orange" />
                    ) : (
                      <Briefcase size={18} className="text-orange" />
                    )}
                  </div>
                  <div className={styles.resultDetails}>
                    <div className={styles.resultHeader}>
                      <span className={styles.resultTitle}>{item.title}</span>
                      <span className={`${styles.resultBadge} ${item.category === 'service' ? styles.serviceBadge : styles.projectBadge}`}>
                        {item.category}
                      </span>
                    </div>
                    <p className={styles.resultDesc}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <footer className={styles.footer}>
          <span>ESC to close</span>
          <span>Leleka Inc. Sacramento</span>
        </footer>
      </div>
    </div>
  );
}
