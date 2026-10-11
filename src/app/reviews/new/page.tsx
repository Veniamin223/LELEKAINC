'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import styles from './page.module.css';

const PROJECTS = [
  'New Construction',
  'ADU / Guest House',
  'Full Home Remodel',
  'Kitchen Remodel',
  'Bathroom Remodel',
  'Roofing / Siding',
  'Backyard / Deck',
  'Other',
];

export default function LeaveReviewPage() {
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    location: '',
    project: '',
    body: '',
    website: '',
  });

  const update = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, rating }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        setError(data.error || 'Could not send the review.');
        return;
      }
      setDone(true);
    } catch {
      setError('Could not send the review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <section className={styles.banner}>
        <div className="container">
          <span className={styles.kicker}>Tell us how it went</span>
          <h1>Leave a Review</h1>
          <p>Your note is held for approval. It appears on the site only after we publish it.</p>
        </div>
      </section>
      <section>
        <div className="container">
          <div className={styles.formWrap}>
            {done ? (
              <div className={styles.success}>
                <h2>Thank you.</h2>
                <p>We received your review. If you left an email, a confirmation is on its way.</p>
                <Link href="/reviews" className="btn btn-outline">Back to reviews</Link>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div className={styles.grid}>
                  <div className={styles.field}>
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" required value={form.name} onChange={update} />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="email">Email, optional</label>
                    <input id="email" name="email" type="email" value={form.email} onChange={update} />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="location">City</label>
                    <input id="location" name="location" value={form.location} onChange={update} placeholder="Sacramento" />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="project">Project</label>
                    <select id="project" name="project" value={form.project} onChange={update}>
                      <option value="">Select</option>
                      {PROJECTS.map((project) => (
                        <option key={project} value={project}>{project}</option>
                      ))}
                    </select>
                  </div>
                  <div className={`${styles.field} ${styles.wide}`}>
                    <label>Rating</label>
                    <div className={styles.stars}>
                      {[1, 2, 3, 4, 5].map((value) => (
                        <button
                          key={value}
                          type="button"
                          className={`${styles.starBtn} ${value <= rating ? styles.starOn : ''}`}
                          onClick={() => setRating(value)}
                          aria-label={`${value} star${value > 1 ? 's' : ''}`}
                        >
                          <Star size={18} fill={value <= rating ? 'currentColor' : 'none'} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className={`${styles.field} ${styles.wide}`}>
                    <label htmlFor="body">Your review</label>
                    <textarea id="body" name="body" required rows={6} value={form.body} onChange={update} />
                  </div>
                  <div className={styles.honeypot} aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input id="website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update} />
                  </div>
                </div>
                {error && <p className={styles.error} role="alert">{error}</p>}
                <div className={styles.actions}>
                  <Link href="/reviews">Cancel</Link>
                  <button className="btn btn-primary" type="submit" disabled={submitting}>
                    {submitting ? 'Sending...' : 'Submit Review'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
