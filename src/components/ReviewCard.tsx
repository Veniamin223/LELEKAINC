import { Star } from 'lucide-react';
import styles from './ReviewCard.module.css';

export type ReviewCardData = {
  id: string;
  name: string;
  location: string;
  project: string;
  rating: number;
  body: string;
  publishedAt?: string | null;
};

const AVATAR_COLORS = ['#FF5A1F', '#0B0F17', '#9A3412', '#374151'];

function initial(name: string) {
  return name.trim().charAt(0).toUpperCase() || 'L';
}

function avatarColor(name: string) {
  const sum = name.split('').reduce((total, char) => total + char.charCodeAt(0), 0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

function relativeTime(iso?: string | null) {
  if (!iso) return '';
  const days = Math.max(0, Math.round((Date.now() - Date.parse(iso)) / 86400000));
  if (days <= 0) return 'Today';
  if (days === 1) return '1 day ago';
  if (days < 30) return `${days} days ago`;
  const months = Math.round(days / 30);
  if (months < 12) return months === 1 ? '1 month ago' : `${months} months ago`;
  const years = Math.max(1, Math.round(months / 12));
  return years === 1 ? '1 year ago' : `${years} years ago`;
}

export default function ReviewCard({
  review,
  compact = false,
}: {
  review: ReviewCardData;
  compact?: boolean;
}) {
  const when = relativeTime(review.publishedAt);

  return (
    <article className={`${styles.card} ${compact ? styles.compact : ''}`}>
      <header className={styles.head}>
        <span className={styles.avatar} style={{ background: avatarColor(review.name) }} aria-hidden="true">
          {initial(review.name)}
        </span>
        <div className={styles.identity}>
          <strong>{review.name}</strong>
          <span>{review.location || 'Sacramento area'}</span>
        </div>
      </header>
      <div className={styles.meta}>
        <div className={styles.stars} aria-label={`${review.rating} out of 5`}>
          {[1, 2, 3, 4, 5].map((value) => (
            <Star
              key={value}
              size={15}
              fill={value <= review.rating ? 'var(--primary)' : 'none'}
              color={value <= review.rating ? 'var(--primary)' : '#D6D3D1'}
            />
          ))}
        </div>
        {when && <time dateTime={review.publishedAt || undefined}>{when}</time>}
      </div>
      <p className={styles.body}>{review.body}</p>
      {review.project && <span className={styles.project}>{review.project}</span>}
    </article>
  );
}
