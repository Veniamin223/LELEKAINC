'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ReviewCard from '@/components/ReviewCard';
import styles from './page.module.css';

type PublicReview = {
  id: string;
  name: string;
  location: string;
  project: string;
  rating: number;
  body: string;
  publishedAt?: string | null;
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
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
