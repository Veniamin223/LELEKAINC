'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import styles from './page.module.css';

type PublicReview = {
  id: string;
  name: string;
  location: string;
  project: string;
  rating: number;
  body: string;
};

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetch('/api/reviews')
      .then((response) => response.json())
      .then((data) => setReviews(Array.isArray(data.reviews) ? data.reviews : []))
      .catch(() => setReviews([]))
      .finally(() => setReady(true));
  }, []);

  return (
    <div className={styles.page}>
      <section className={styles.banner}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className={styles.kicker}>Homeowner notes</span>
          <h1>Reviews</h1>
          <p>
            A public ribbon of work we have been trusted to finish. New notes stay private until we publish them.
          </p>
          <div className={styles.bannerActions}>
            <Link href="/reviews/new" className="btn btn-primary">Leave a Review</Link>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          {ready && reviews.length === 0 && (
            <p className={styles.empty}>No reviews have been published yet.</p>
          )}
          <div className={styles.ribbon}>
            {reviews.map((review) => (
              <article key={review.id} className={styles.card}>
                <div className={styles.stars} aria-label={`${review.rating} out of 5`}>
                  {[...Array(review.rating)].map((_, index) => (
                    <Star key={index} size={16} fill="var(--primary)" color="var(--primary)" />
                  ))}
                </div>
                {review.project && <span className={styles.project}>{review.project}</span>}
                <p className={styles.quote}>&ldquo;{review.body}&rdquo;</p>
                <div className={styles.person}>
                  <strong>{review.name}</strong>
                  {review.location && <span>{review.location}</span>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
