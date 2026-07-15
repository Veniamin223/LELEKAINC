'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Building
} from 'lucide-react';
import styles from './page.module.css';

const PROJECT_TYPES = [
  'New Construction',
  'ADU / Guest House',
  'Full Home Remodel',
  'Kitchen Remodel',
  'Bathroom Remodel',
  'Roofing / Siding',
  'Backyard / Deck',
  'Other / Custom Build'
];

const BUDGET_RANGES = [
  'Under $10,000',
  '$10,000 - $30,000',
  '$30,000 - $80,000',
  '$80,000 - $150,000',
  '$150,000 - $300,000',
  '$300,000+'
];

export default function Contact() {
  const [step, setStep] = useState(1);
  
  // Form State
  const [projectType, setProjectType] = useState('');
  const [budget, setBudget] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    if (step === 1 && !projectType) return;
    if (step === 2 && !budget) return;
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    setSubmitting(true);
    
    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className={styles.contactPage}>
      {/* Banner */}
      <section className={styles.banner}>
        <div className="container">
          <span className={styles.tagline}>Start Your Project</span>
          <h1 className={styles.bannerTitle}>Let&apos;s Build Together</h1>
          <p className={styles.bannerSubtitle}>
            Request a comprehensive on-site estimate or get in touch for custom architectural consulting.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className={styles.contentSection}>
        <div className={`${styles.gridContainer} container`}>
          
          {/* Left: Contact Info & Service Area */}
          <div className={styles.infoCol}>
            <div className={styles.infoSection}>
              <h2 className={styles.infoTitle}>Contact Details</h2>
              
              <ul className={styles.infoList}>
                <li>
                  <div className={styles.iconWrapper}>
                    <Phone size={20} className="text-orange" />
                  </div>
                  <div>
                    <span className={styles.infoLabel}>Call or Text</span>
                    <a href="tel:+19165550199" className={styles.infoVal}>+1 (916) 555-0199</a>
                  </div>
                </li>
                <li>
                  <div className={styles.iconWrapper}>
                    <Mail size={20} className="text-orange" />
                  </div>
                  <div>
                    <span className={styles.infoLabel}>Email Support</span>
                    <a href="mailto:lelekainc.ca@gmail.com" className={styles.infoVal}>lelekainc.ca@gmail.com</a>
                  </div>
                </li>
                <li>
                  <div className={styles.iconWrapper}>
                    <MapPin size={20} className="text-orange" />
                  </div>
                  <div>
                    <span className={styles.infoLabel}>Service Area</span>
                    <span className={styles.infoVal}>Sacramento & Surrounding Counties, CA</span>
                  </div>
                </li>
                <li>
                  <div className={styles.iconWrapper}>
                    <Clock size={20} className="text-orange" />
                  </div>
                  <div>
                    <span className={styles.infoLabel}>Operating Hours</span>
                    <span className={styles.infoVal}>Mon - Fri: 8:00 AM - 6:00 PM</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Styled SVG Map of Sacramento Service Coverage Area */}
            <div className={`${styles.mapCard} glass`}>
              <h3 className={styles.mapTitle}>Sacramento Region Coverage</h3>
              <p className={styles.mapSubtitle}>Active build zones include:</p>
              
              <div className={styles.tagGrid}>
                <span className={styles.mapTag}>Sacramento</span>
                <span className={styles.mapTag}>Roseville</span>
                <span className={styles.mapTag}>Folsom</span>
                <span className={styles.mapTag}>Elk Grove</span>
                <span className={styles.mapTag}>Rancho Cordova</span>
                <span className={styles.mapTag}>Citrus Heights</span>
                <span className={styles.mapTag}>El Dorado Hills</span>
                <span className={styles.mapTag}>Rocklin</span>
              </div>

              {/* Architectural stylized graphic representing building blueprint & coordinates */}
              <div className={styles.vectorMap}>
                <svg viewBox="0 0 200 150" className={styles.mapSvg}>
                  {/* Grid lines */}
                  <line x1="0" y1="30" x2="200" y2="30" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="0" y1="60" x2="200" y2="60" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="0" y1="90" x2="200" y2="90" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="0" y1="120" x2="200" y2="120" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="40" y1="0" x2="40" y2="150" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="80" y1="0" x2="80" y2="150" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="120" y1="0" x2="120" y2="150" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="160" y1="0" x2="160" y2="150" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  
                  {/* Service zone boundary polygon */}
                  <polygon 
                    points="70,20 130,15 170,50 160,110 110,135 45,95 35,50" 
                    fill="rgba(255, 90, 31, 0.08)" 
                    stroke="var(--primary)" 
                    strokeWidth="2" 
                    strokeDasharray="4 2"
                  />
                  
                  {/* Sacramento Core Marker */}
                  <circle cx="100" cy="75" r="5" fill="var(--primary)" />
                  <circle cx="100" cy="75" r="10" fill="none" stroke="var(--primary)" strokeWidth="1.5" className={styles.pingAnim} />
                  <text x="112" y="79" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="var(--font-title)">SACRAMENTO CORE</text>
                  
                  {/* Surrounding City Dots */}
                  <circle cx="140" cy="40" r="3" fill="#FFFFFF" />
                  <text x="146" y="43" fill="var(--text-light-muted)" fontSize="7">Folsom</text>

                  <circle cx="125" cy="30" r="3" fill="#FFFFFF" />
                  <text x="110" y="24" fill="var(--text-light-muted)" fontSize="7">Roseville</text>

                  <circle cx="105" cy="115" r="3" fill="#FFFFFF" />
                  <text x="112" y="118" fill="var(--text-light-muted)" fontSize="7">Elk Grove</text>
                </svg>
              </div>
              <div className={styles.mapFoot}>
                <ShieldCheck size={16} className="text-orange" />
                <span>Fully Compliant with Local County Ordinances</span>
              </div>
            </div>
          </div>

          {/* Right: Step-By-Step Lead Form */}
          <div className={styles.formCol}>
            <div className={`${styles.formCard} glass`}>
              {submitted ? (
                /* Success Message */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={styles.successState}
                >
                  <div className={styles.successIcon}>
                    <Check size={40} />
                  </div>
                  <h2 className={styles.successTitle}>Proposal Request Received!</h2>
                  <p className={styles.successText}>
                    Thank you, <strong>{formData.name}</strong>. We have logged your request for a <strong>{projectType}</strong> project. Our Sacramento estimator will email you at <strong>{formData.email}</strong> or call <strong>{formData.phone}</strong> within 1 business day to coordinate an on-site consultation.
                  </p>
                  <button 
                    onClick={() => {
                      setStep(1);
                      setProjectType('');
                      setBudget('');
                      setFormData({ name: '', email: '', phone: '', city: '', message: '' });
                      setSubmitted(false);
                    }} 
                    className="btn btn-outline"
                  >
                    Submit Another Query
                  </button>
                </motion.div>
              ) : (
                /* Interactive Form */
                <form onSubmit={handleSubmit}>
                  {/* Step Indicators */}
                  <div className={styles.stepsHeader}>
                    <div className={`${styles.stepIndicator} ${step >= 1 ? styles.stepActive : ''}`}>
                      <span className={styles.stepNum}>1</span>
                      <span className={styles.stepLabel}>Project</span>
                    </div>
                    <div className={styles.stepLine} />
                    <div className={`${styles.stepIndicator} ${step >= 2 ? styles.stepActive : ''}`}>
                      <span className={styles.stepNum}>2</span>
                      <span className={styles.stepLabel}>Budget</span>
                    </div>
                    <div className={styles.stepLine} />
                    <div className={`${styles.stepIndicator} ${step >= 3 ? styles.stepActive : ''}`}>
                      <span className={styles.stepNum}>3</span>
                      <span className={styles.stepLabel}>Details</span>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {/* STEP 1: Project Type Selection */}
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className={styles.formStepContent}
                      >
                        <h3 className={styles.stepTitle}>What project are we building?</h3>
                        <p className={styles.stepSubtitle}>Select the primary service type that fits your needs.</p>
                        
                        <div className={styles.optionGrid}>
                          {PROJECT_TYPES.map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setProjectType(type)}
                              className={`${styles.optionBtn} ${projectType === type ? styles.optionSelected : ''}`}
                            >
                              <Building size={16} />
                              {type}
                            </button>
                          ))}
                        </div>

                        <div className={styles.formNav}>
                          <span className={styles.stepHelper}>Select a type to proceed</span>
                          <button
                            type="button"
                            onClick={handleNextStep}
                            disabled={!projectType}
                            className="btn btn-primary"
                          >
                            Next Step <ArrowRight size={16} />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2: Budget Selection */}
                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className={styles.formStepContent}
                      >
                        <h3 className={styles.stepTitle}>Estimated Budget Range</h3>
                        <p className={styles.stepSubtitle}>This helps us select correct material lines and draft the right specs.</p>
                        
                        <div className={styles.optionGrid}>
                          {BUDGET_RANGES.map((range) => (
                            <button
                              key={range}
                              type="button"
                              onClick={() => setBudget(range)}
                              className={`${styles.optionBtn} ${budget === range ? styles.optionSelected : ''}`}
                            >
                              {range}
                            </button>
                          ))}
                        </div>

                        <div className={styles.formNav}>
                          <button
                            type="button"
                            onClick={handlePrevStep}
                            className="btn btn-secondary"
                          >
                            <ArrowLeft size={16} /> Back
                          </button>
                          <button
                            type="button"
                            onClick={handleNextStep}
                            disabled={!budget}
                            className="btn btn-primary"
                          >
                            Next Step <ArrowRight size={16} />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: Contact & Description Details */}
                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className={styles.formStepContent}
                      >
                        <h3 className={styles.stepTitle}>Your Details</h3>
                        <p className={styles.stepSubtitle}>Provide contact information so we can coordinate your estimate.</p>
                        
                        <div className={styles.inputsGrid}>
                          <div className={styles.inputField}>
                            <label htmlFor="name">Full Name *</label>
                            <input
                              required
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="John Doe"
                            />
                          </div>

                          <div className={styles.inputField}>
                            <label htmlFor="email">Email Address *</label>
                            <input
                              required
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="john@example.com"
                            />
                          </div>

                          <div className={styles.inputField}>
                            <label htmlFor="phone">Phone Number *</label>
                            <input
                              required
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="(916) 555-0199"
                            />
                          </div>

                          <div className={styles.inputField}>
                            <label htmlFor="city">City / Location in CA *</label>
                            <input
                              required
                              type="text"
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              placeholder="e.g. Sacramento, Folsom"
                            />
                          </div>

                          <div className={`${styles.inputField} ${styles.fullWidth}`}>
                            <label htmlFor="message">Project Description (Optional)</label>
                            <textarea
                              id="message"
                              name="message"
                              rows={4}
                              value={formData.message}
                              onChange={handleInputChange}
                              placeholder="Please share any specific requirements, materials you prefer, or site conditions..."
                            />
                          </div>
                        </div>

                        <div className={styles.formNav}>
                          <button
                            type="button"
                            onClick={handlePrevStep}
                            disabled={submitting}
                            className="btn btn-secondary"
                          >
                            <ArrowLeft size={16} /> Back
                          </button>
                          <button
                            type="submit"
                            disabled={submitting || !formData.name || !formData.email || !formData.phone}
                            className="btn btn-primary"
                          >
                            {submitting ? 'Submitting...' : 'Request Consultation'}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
