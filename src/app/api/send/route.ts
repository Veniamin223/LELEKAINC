import { NextResponse } from 'next/server';
import { Resend } from 'resend';

type ProposalPayload = {
  name: string;
  email: string;
  phone: string;
  city: string;
  projectType: string;
  budget: string;
  message: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function singleLine(value: string) {
  return value.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function getMailer() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  const from = process.env.RESEND_FROM_EMAIL;
  const owner = process.env.RESEND_OWNER_EMAIL;
  if (!from || !owner) {
    throw new Error('RESEND_FROM_EMAIL and RESEND_OWNER_EMAIL must be configured');
  }

  return { resend: new Resend(apiKey), from, owner };
}

function ownerHtml(payload: ProposalPayload) {
  const message = payload.message
    ? escapeHtml(payload.message).replace(/\n/g, '<br>')
    : 'No additional details provided.';

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
      <h2 style="color: #FF5A1F; border-bottom: 2px solid #FF5A1F; padding-bottom: 10px; margin-top: 0;">New Project Proposal Request</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f3f4f6; width: 150px;">Client Name:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">${escapeHtml(payload.name)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f3f4f6;">Email:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;"><a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f3f4f6;">Phone Number:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;"><a href="tel:${escapeHtml(payload.phone)}">${escapeHtml(payload.phone)}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f3f4f6;">City/Location:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">${escapeHtml(payload.city || 'Not specified')}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f3f4f6;">Project Type:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">${escapeHtml(payload.projectType)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f3f4f6;">Budget Range:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">${escapeHtml(payload.budget)}</td>
        </tr>
      </table>
      <h3 style="margin-top: 25px; color: #111827;">Project Details & Message:</h3>
      <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; border: 1px solid #f3f4f6; font-size: 14px; line-height: 1.6;">
        ${message}
      </div>
      <p style="margin-top: 30px; font-size: 12px; color: #9ca3af; text-align: center;">
        This notification was generated from lelekainc.com contact form.
      </p>
    </div>
  `;
}

function clientHtml(payload: ProposalPayload) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 25px;">
        <h1 style="color: #FF5A1F; margin: 0; font-size: 28px; letter-spacing: 0.05em;">LELEKA<span style="color: #0B0F17;">INC</span></h1>
        <p style="font-size: 12px; text-transform: uppercase; color: #9ca3af; letter-spacing: 0.1em; margin-top: 5px; font-weight: bold;">
          Licensed & Insured • CSLB #1146118
        </p>
      </div>
      <p>Hello <strong>${escapeHtml(payload.name)}</strong>,</p>
      <p>Thank you for requesting a project proposal from <strong>Leleka Builder Inc.</strong> We have successfully received your details for a <strong>${escapeHtml(payload.projectType)}</strong> project in the Sacramento area.</p>
      <div style="background-color: #f9fafb; padding: 20px; border-radius: 6px; border: 1px solid #f3f4f6; margin: 25px 0;">
        <h3 style="margin-top: 0; color: #111827; font-size: 16px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Logged Request Details:</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; color: #6b7280; width: 120px;">Project Type:</td>
            <td style="padding: 6px 0; font-weight: bold; color: #111827;">${escapeHtml(payload.projectType)}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #6b7280;">Estimated Budget:</td>
            <td style="padding: 6px 0; font-weight: bold; color: #111827;">${escapeHtml(payload.budget)}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #6b7280;">Location:</td>
            <td style="padding: 6px 0; font-weight: bold; color: #111827;">${escapeHtml(payload.city || 'Sacramento Region')}</td>
          </tr>
        </table>
      </div>
      <p>One of our Sacramento estimators will contact you via email at <strong>${escapeHtml(payload.email)}</strong> or call you at <strong>${escapeHtml(payload.phone)}</strong> within 1 business day to coordinate a convenient time for an on-site consultation and layout inspection.</p>
      <p>If you have any questions or need to make immediate changes to your request, please feel free to reply directly to this email or call our team at <strong>+1 (916) 539-9005</strong>.</p>
      <p style="margin-top: 25px;">Best regards,</p>
      <p style="font-weight: bold; color: #111827; margin-top: 5px;">Leleka Builder Inc. Team</p>
      <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
      <p style="font-size: 11px; color: #9ca3af; text-align: center; line-height: 1.5;">
        Leleka Builder Inc. • CSLB License #1146118 • Sacramento County, CA<br>
        This email was sent to ${escapeHtml(payload.email)} as confirmation of your request.
      </p>
    </div>
  `;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const payload: ProposalPayload = {
      name: singleLine(String(body.name || '')),
      email: singleLine(String(body.email || '')),
      phone: singleLine(String(body.phone || '')),
      city: singleLine(String(body.city || '')),
      projectType: singleLine(String(body.projectType || '')),
      budget: singleLine(String(body.budget || '')),
      message: String(body.message || '').trim(),
    };

    if (!payload.name || !payload.email || !payload.phone || !payload.projectType || !payload.budget) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      return NextResponse.json({ error: 'Enter a valid email address' }, { status: 400 });
    }

    const { resend, from, owner } = getMailer();

    const ownerEmail = await resend.emails.send({
      from,
      to: [owner],
      replyTo: payload.email,
      subject: `New Proposal Request: ${payload.projectType} from ${payload.name}`,
      html: ownerHtml(payload),
    });

    if (ownerEmail.error || !ownerEmail.data) {
      return NextResponse.json(
        {
          success: false,
          ownerNotified: false,
          clientNotified: false,
          error: ownerEmail.error?.message || 'Failed to notify the business',
        },
        { status: 502 }
      );
    }

    const clientEmail = await resend.emails.send({
      from,
      to: [payload.email],
      replyTo: owner,
      subject: 'We Received Your Proposal Request! | Leleka Inc.',
      html: clientHtml(payload),
    });

    if (clientEmail.error || !clientEmail.data) {
      return NextResponse.json({
        success: true,
        ownerNotified: true,
        clientNotified: false,
        ownerEmailId: ownerEmail.data.id,
        clientEmailId: null,
        warning:
          clientEmail.error?.message ||
          'Your request was received, but the confirmation email could not be sent.',
      });
    }

    return NextResponse.json({
      success: true,
      ownerNotified: true,
      clientNotified: true,
      ownerEmailId: ownerEmail.data.id,
      clientEmailId: clientEmail.data.id,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Server error';
    console.error('Resend api route error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
