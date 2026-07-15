'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Hammer, 
  Home as HomeIcon, 
  Layers, 
  ArrowRight, 
  CheckCircle, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  TrendingUp,
  Map,
  Award
} from 'lucide-react';
import styles from './page.module.css';

const STATS = [
  { id: 1, val: '10+', label: 'Years Experience', icon: Award },
  { id: 2, val: '150+', label: 'Projects Completed', icon: CheckCircle },
  { id: 3, val: '100%', label: 'Happy Clients', icon: Star },
  { id: 4, val: '10+', label: 'Sacramento Cities', icon: Map }
];

const SERVICES = [
  {
    title: 'New Construction',
    desc: 'Building custom residential homes from scratch. Complete design-build services with premium architectural finishes.',
    icon: HomeIcon,
    link: '/services#new-construction',
    img: '/projects/home_remodel.png'
  },
  {
    title: 'ADU & Additions',
    desc: 'Unlock extra rental income or multi-generational space with stunning accessory dwelling units and extensions.',
    icon: Layers,
    link: '/services#adu-additions',
    img: '/projects/adu_addition.png'
  },
  {
    title: 'Full Remodeling',
    desc: 'Breathe new life into your home. Comprehensive updates, wall-knockouts, load-bearing beams, and layout optimization.',
    icon: Hammer,
    link: '/services#full-remodel',
    img: '/projects/kitchen_remodel.png'
  }
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Vision & Estimate',
    desc: 'We start with an on-site consultation to define your goals, inspect the layout, and deliver a detailed upfront estimate.'
  },
  {
    step: '02',
    title: 'Design & Budgeting',
    desc: 'Our design specialists help select materials, draft layouts, and budget down to the dollar before any physical work starts.'
  },
  {
    step: '03',
    title: 'Permits & Approvals',
    desc: 'We manage the entire city/county planning submittal process, pulling all required electrical, plumbing, and structural permits.'
  },
  {
    step: '04',
    title: 'Precision Construction',
    desc: 'Our experienced craftsmen execute construction with daily updates, maintaining a safe, organized, and high-speed build site.'
  },
  {
    step: '05',
    title: 'Final Handover',
    desc: 'A complete walk-through to ensure every joint, outlet, paint stroke, and tile meets our rigorous quality standards.'
  }
];

const TESTIMONIALS = [
  {
    name: 'Mark & Sarah J.',
    location: 'Sacramento, CA',
    text: 'Leleka Inc. built our ADU from scratch. They navigated the permits, finished on schedule, and the framing quality was outstanding. We couldn\'t be happier with our new space!',
    stars: 5,
    project: 'Backyard ADU Build'
  },
  {
    name: 'David L.',
    location: 'Roseville, CA',
    text: 'We hired them for a complete kitchen and living room remodel. They removed three walls and installed a massive steel support beam. Super professional team, very clean site.',
    stars: 5,
    project: 'Full Living Remodel'
  },
  {
    name: 'Elena K.',
    location: 'Folsom, CA',
    text: 'The best contractor I\'ve ever worked with. They redid our roofing and built a custom backyard composite deck. Outstanding attention to detail, highly energetic crew!',
    stars: 5,
    project: 'Roofing & Composite Deck'
  }
];

const ROTATING_WORDS = ['VISION', 'DREAMS', 'SPACES', 'HOMES', 'FUTURE'];

export default function Home() {
  const [currentReview, setCurrentReview] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const showcaseVideoRef = useRef<HTMLVideoElement>(null);

  // Animate rotating word in Hero Title
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2200);
    return () => clearInterval(wordInterval);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const showcaseVideo = showcaseVideoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    if (showcaseVideo) {
      showcaseVideo.muted = true;
      showcaseVideo.playsInline = true;
    }

    const playVideos = () => {
      video.play().catch(() => {});
      if (showcaseVideo) {
        showcaseVideo.play().catch(() => {});
      }
    };

    playVideos();

    // Force play on first touch/click in case the mobile browser blocked it initially
    const handleInteraction = () => {
      playVideos();
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('click', handleInteraction);
    };

    window.addEventListener('touchstart', handleInteraction);
    window.addEventListener('click', handleInteraction);

    return () => {
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('click', handleInteraction);
    };
  }, []);

  const nextReview = () => {
    setCurrentReview((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  // Variants for Framer Motion animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.15 } }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className={styles.hero}>
        {/* Full-width cinematic background video */}
        <video 
          ref={videoRef}
          src="/Construction_remodeling_cinematic_4K_202607151125.mp4"
          poster="/projects/home_remodel.png"
          autoPlay 
          loop 
          muted 
          playsInline 
          className={styles.bgVideo}
        />
        
        {/* Cinematic dark overlay */}
        <div className={styles.overlay} />

        <div className={`${styles.heroContainer} container`}>
          <motion.div 
            className={styles.heroContent}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <span className={styles.tagline}>California Licensed Contractor</span>
            <h1 className={styles.title}>
              Building Your <br />
              <span className={styles.rotatingWordContainer}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={ROTATING_WORDS[wordIndex]}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="text-orange"
                    style={{ display: 'inline-block' }}
                  >
                    {ROTATING_WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span> <br />
              From The Ground Up
            </h1>
            <p className={styles.subtitle}>
              Premium custom home builds, Accessory Dwelling Units (ADUs), and full remodeling services. 
              We bring high-performance craftsmanship and bold engineering to Sacramento County.
            </p>
            <div className={styles.ctaGroup}>
              <Link href="/contact" className="btn btn-primary">
                Get Free Estimate <ArrowRight size={18} />
              </Link>
              <Link href="/projects" className="btn btn-secondary">
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className={styles.statsSection}>
        <div className="container">
          <motion.div 
            className={styles.statsGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
          >
            {STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div key={stat.id} className={styles.statCard} variants={fadeInUp}>
                  <div className={styles.statIconWrapper}>
                    <Icon size={24} className="text-orange" />
                  </div>
                  <h3 className={styles.statValue}>{stat.val}</h3>
                  <p className={styles.statLabel}>{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Panoramic Video Showcase Section */}
      <section className={styles.panoramicVideoSection}>
        <div className={styles.panoramicVideoWrapper}>
          <video 
            ref={showcaseVideoRef}
            src="/Construction_time-lapse_and_reveal_4K_202607151151.mp4"
            poster="/projects/adu_addition.png"
            autoPlay 
            loop 
            muted 
            playsInline 
            className={styles.panoramicVideo}
          />
          <div className={styles.panoramicOverlay}>
            <div className="container">
              <motion.div 
                className={styles.panoramicContent}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={fadeInUp}
              >
                <span className={styles.panoramicTagline}>Craftsmanship in Motion</span>
                <h2 className={styles.panoramicTitle}>Our Process In Action</h2>
                <p className={styles.panoramicSubtitle}>
                  Watch a time-lapse of our custom builds coming to life. From ground-breaking foundation to luxury finished handover.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services Preview Section */}
      <section className={styles.servicesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.preTitle}>Our Core Services</span>
            <h2 className={styles.sectionTitle}>What We Build</h2>
            <p className={styles.sectionSubtitle}>
              From residential framing to complex load-bearing remodels, we supply licensed expertise and high-energy dedication.
            </p>
          </div>

          <motion.div 
            className={styles.servicesGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
          >
            {SERVICES.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div key={index} className={styles.serviceCard} variants={fadeInUp}>
                  <div className={styles.serviceImgWrapper}>
                    <Image 
                      src={service.img} 
                      alt={service.title}
                      fill
                      className={styles.serviceImg}
                    />
                    <div className={styles.serviceOverlay} />
                  </div>
                  <div className={styles.serviceContent}>
                    <div className={styles.serviceHeader}>
                      <div className={styles.serviceIcon}>
                        <Icon size={22} />
                      </div>
                      <h3 className={styles.serviceTitle}>{service.title}</h3>
                    </div>
                    <p className={styles.serviceDesc}>{service.desc}</p>
                    <Link href={service.link} className={styles.serviceLink}>
                      Read Details <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <div className={styles.allServicesLink}>
            <Link href="/services" className="btn btn-outline">
              Explore All 10 Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Process / How We Work Section */}
      <section className={styles.processSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.preTitle}>Step-By-Step Workflow</span>
            <h2 className={styles.sectionTitle}>Our Build Process</h2>
            <p className={styles.sectionSubtitle}>
              We maintain transparency, high communication, and strict scheduling throughout every stage of your renovation.
            </p>
          </div>

          <div className={styles.processTimeline}>
            {PROCESS_STEPS.map((step, idx) => (
              <motion.div 
                key={idx} 
                className={styles.processStep}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div className={styles.stepNumWrapper}>
                  <span className={styles.stepNum}>{step.step}</span>
                  <div className={styles.stepDot} />
                </div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Review Slider Section */}
      <section className={styles.reviewsSection}>
        <div className="container">
          <div className={styles.reviewsWrapper}>
            <div className={styles.reviewsLeft}>
              <span className={styles.preTitle}>Client Testimonials</span>
              <h2 className={styles.reviewsTitle}>Word On The Street</h2>
              <p className={styles.reviewsSubtitle}>
                See how we exceed client expectations in Sacramento, Folsom, Roseville, and nearby cities.
              </p>
              <div className={styles.sliderControls}>
                <button onClick={prevReview} className={styles.sliderBtn} aria-label="Previous review">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={nextReview} className={styles.sliderBtn} aria-label="Next review">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className={styles.reviewsRight}>
              <motion.div 
                key={currentReview}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className={`${styles.reviewCard} glass`}
              >
                <div className={styles.reviewHeader}>
                  <div className={styles.stars}>
                    {[...Array(TESTIMONIALS[currentReview].stars)].map((_, i) => (
                      <Star key={i} size={18} fill="var(--primary)" color="var(--primary)" />
                    ))}
                  </div>
                  <span className={styles.reviewProject}>{TESTIMONIALS[currentReview].project}</span>
                </div>
                <p className={styles.reviewText}>
                  &ldquo;{TESTIMONIALS[currentReview].text}&rdquo;
                </p>
                <div className={styles.reviewerInfo}>
                  <h4 className={styles.reviewerName}>{TESTIMONIALS[currentReview].name}</h4>
                  <p className={styles.reviewerLoc}>{TESTIMONIALS[currentReview].location}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Contact Call-to-Action Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <motion.div 
            className={`${styles.ctaBox} bg-orange`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Ready to build or remodel?</h2>
              <p className={styles.ctaText}>
                Get in touch with Leleka Inc. today. Let&apos;s talk about your project scope, scheduling, and budget options.
              </p>
            </div>
            <div className={styles.ctaButtons}>
              <Link href="/contact" className={`${styles.ctaPrimaryBtn} btn btn-secondary`}>
                Contact Us Now
              </Link>
              <a href="tel:+19165399005" className={styles.ctaPhone}>
                +1 (916) 539-9005
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
