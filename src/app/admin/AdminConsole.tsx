'use client';

import { useEffect, useState } from 'react';
import type { Review, ReviewStatus } from '@/lib/review-types';
import styles from './admin.module.css';

const FILTERS: ReviewStatus[] = ['pending', 'published', 'hidden'];

export default function AdminConsole() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [filter, setFilter] = useState<ReviewStatus>('pending');
  const [reviews, setReviews] = useState<Review[]>([]);

  const load = async () => {
    const response = await fetch('/api/admin/reviews');
    if (response.status === 401) {
      setAuthed(false);
      setReady(true);
      return;
    }
    const data = await response.json();
    setReviews(Array.isArray(data.reviews) ? data.reviews : []);
    setAuthed(true);
    setReady(true);
  };

  useEffect(() => {
    load().catch(() => setReady(true));
  }, []);

  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Could not sign in.');
        return;
      }
      setPassword('');
      await load();
    } catch {
      setError('Could not sign in.');
    } finally {
      setBusy(false);
    }
  };

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setAuthed(false);
    setReviews([]);
  };

  const setStatus = async (id: string, status: ReviewStatus) => {
    const response = await fetch(`/api/admin/reviews/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (response.ok) await load();
  };

  const remove = async (id: string) => {
    const response = await fetch(`/api/admin/reviews/${id}`, { method: 'DELETE' });
    if (response.ok) await load();
  };

  const visible = reviews.filter((review) => review.status === filter);

  return (
    <div className={styles.desk}>
      <div className={styles.inner}>
        <span className={styles.kicker}>Leleka Inc.</span>
        <div className={styles.top}>
          <h1>Review desk</h1>
          {authed && <button className={styles.ghost} onClick={logout}>Sign out</button>}
        </div>

        {!ready ? null : !authed ? (
          <form className={styles.login} onSubmit={login}>
            <label htmlFor="password">
              Password
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            <button className="btn btn-primary" type="submit" disabled={busy}>
              {busy ? 'Checking...' : 'Enter'}
            </button>
            {error && <p className={styles.error}>{error}</p>}
          </form>
        ) : (
          <>
            <div className={styles.filters}>
              {FILTERS.map((status) => (
                <button
                  key={status}
                  className={`${styles.filter} ${filter === status ? styles.filterOn : ''}`}
                  onClick={() => setFilter(status)}
                >
                  {status} ({reviews.filter((review) => review.status === status).length})
                </button>
              ))}
            </div>
            <div className={styles.list}>
              {visible.length === 0 && <p>Nothing in {filter}.</p>}
              {visible.map((review) => (
                <article key={review.id} className={styles.card}>
                  <div className={styles.meta}>
                    <span>{review.rating}/5{review.project ? ` · ${review.project}` : ''}</span>
                    <span>{new Date(review.createdAt).toLocaleString()}</span>
                  </div>
                  <h2>{review.name}{review.location ? `, ${review.location}` : ''}</h2>
                  {review.email && <p>{review.email}</p>}
                  <p>{review.body}</p>
                  <div className={styles.actions}>
                    {review.status !== 'published' && (
                      <button className="btn btn-primary" onClick={() => setStatus(review.id, 'published')}>Publish</button>
                    )}
                    {review.status !== 'hidden' && (
                      <button className={styles.ghost} onClick={() => setStatus(review.id, 'hidden')}>Hide</button>
                    )}
                    {review.status !== 'pending' && (
                      <button className={styles.ghost} onClick={() => setStatus(review.id, 'pending')}>Return to pending</button>
                    )}
                    <button className={styles.danger} onClick={() => remove(review.id)}>Delete</button>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
