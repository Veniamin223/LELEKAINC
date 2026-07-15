'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, Phone } from 'lucide-react';
import styles from './Navbar.module.css';

interface NavbarProps {
  onSearchOpen: () => void;
}

export default function Navbar({ onSearchOpen }: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Projects', path: '/projects' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`${styles.navContainer} container`}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <svg viewBox="0 0 100 100" className={styles.logoSvg}>
            {/* Geometric stylized stork/crane bird taking off, representing Leleka (Stork) & builder's crane */}
            <path d="M20 80 L50 20 L80 80 M50 20 L50 80" stroke="var(--primary)" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M35 50 L50 35 L65 50" stroke="#FFFFFF" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="50" cy="20" r="4" fill="var(--primary)" />
          </svg>
          <span className={styles.logoText}>
            LELEKA<span className="text-orange">INC</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`${styles.navLink} ${pathname === link.path ? styles.activeLink : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Controls */}
        <div className={styles.controls}>
          <button 
            onClick={onSearchOpen} 
            className={styles.iconBtn} 
            aria-label="Search services and projects"
            title="Search (Ctrl+K)"
          >
            <Search size={20} />
          </button>
          
          <a href="tel:+19165550199" className={`${styles.phoneBtn} btn btn-primary`}>
            <Phone size={16} />
            <span className={styles.phoneText}>+1 (916) 555-0199</span>
          </a>

          <button 
            className={styles.hamburger} 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`${styles.mobileDrawer} ${isOpen ? styles.drawerOpen : ''}`}>
        <nav className={styles.mobileNav}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`${styles.mobileNavLink} ${pathname === link.path ? styles.activeMobileLink : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a href="tel:+19165550199" className={`${styles.mobilePhoneBtn} btn btn-primary`}>
            <Phone size={18} />
            +1 (916) 555-0199
          </a>
          <div className={styles.mobileMeta}>
            <p>Sacramento & County, CA</p>
            <p>lelekainc.ca@gmail.com</p>
          </div>
        </nav>
      </div>
    </header>
  );
}
