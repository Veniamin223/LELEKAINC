import { Resend } from 'resend';
import type { Review } from './reviews';

function oneLine(value: string) {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

export async function notifyReviewReceived(review: Review) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const owner = process.env.RESEND_OWNER_EMAIL;
  if (!key || !from || !owner) return;

  const resend = new Resend(key);
  const name = oneLine(review.name);

  await resend.emails.send({
    from,
    to: [owner],
    ...(review.email ? { replyTo: review.email } : {}),
    subject: `Review waiting for approval from ${name}`,
    text: [
      `${name} left a ${review.rating}/5 review.`,
      review.location ? `Location: ${review.location}` : '',
      review.project ? `Project: ${review.project}` : '',
      review.email ? `Email: ${review.email}` : 'Email: not provided',
      '',
      review.body,
      '',
      'Publish or hide it at https://lelekainc.com/admin',
    ].filter(Boolean).join('\n'),
  });

  if (!review.email) return;

  await resend.emails.send({
    from,
    to: [review.email],
    replyTo: owner,
    subject: 'We received your review | Leleka Inc.',
    text: [
      `Hello ${name},`,
      '',
      'Thank you for taking the time to review Leleka Inc. We read every note before it appears on the site.',
      '',
      'Leleka Inc.',
      '+1 (916) 539-9005',
    ].join('\n'),
  });
}
