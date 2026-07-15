'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Shield, ArrowUp } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} container`}>
        {/* Company Pitch */}
        <div className={styles.columnBrand}>
          <Link href="/" className={styles.logo}>
            <Image 
              src="/logo.png" 
              alt="Leleka Inc. Logo" 
              width={40} 
              height={40} 
              className={styles.logoImg}
            />
            <span className={styles.logoText}>
              LELEKA<span className="text-orange">INC</span>
            </span>
          </Link>
          <p className={styles.description}>
            Delivering high-performance, modern construction and remodeling solutions. 
            From premium home builds from scratch to custom ADUs and full renovations. 
            Serving Sacramento County and surrounding regions in California.
          </p>
          <div className={styles.license}>
            <Shield size={16} className="text-orange" />
            <span>Licensed & Insured • CSLB #XXXXXXXX</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.columnLinks}>
          <h3 className={styles.title}>Explore</h3>
          <ul className={styles.list}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/projects">Our Projects</Link></li>
            <li><Link href="/contact">Get Estimate</Link></li>
          </ul>
        </div>

        {/* Core Services Links */}
        <div className={styles.columnServices}>
          <h3 className={styles.title}>Services</h3>
          <ul className={styles.list}>
            <li><Link href="/services#new-construction">New Construction</Link></li>
            <li><Link href="/services#adu-additions">ADUs & Additions</Link></li>
            <li><Link href="/services#full-remodel">Full Home Remodels</Link></li>
            <li><Link href="/services#kitchen-bathroom">Kitchens & Bathrooms</Link></li>
            <li><Link href="/services#roofing-siding">Roofing & Siding</Link></li>
            <li><Link href="/services#landscaping-decks">Landscape & Decks</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className={styles.columnContact}>
          <h3 className={styles.title}>Contact Us</h3>
          <ul className={styles.contactList}>
            <li>
              <Phone size={18} className="text-orange" />
              <a href="tel:+19165550199">+1 (916) 555-0199</a>
            </li>
            <li>
              <Mail size={18} className="text-orange" />
              <a href="mailto:lelekainc.ca@gmail.com">lelekainc.ca@gmail.com</a>
            </li>
            <li>
              <MapPin size={18} className="text-orange" />
              <span>Sacramento & surrounding counties, California</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.bottom}>
        <div className={`${styles.bottomContainer} container`}>
          <p>© {currentYear} Leleka Inc. All rights reserved. Built for lelekainc.com</p>
          <button 
            onClick={handleScrollToTop} 
            className={styles.scrollBtn} 
            aria-label="Scroll to top"
          >
            Back to top
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
